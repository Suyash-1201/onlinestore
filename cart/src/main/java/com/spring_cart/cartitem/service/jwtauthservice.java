package com.spring_cart.cartitem.service;

import java.io.IOException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class jwtauthservice extends OncePerRequestFilter {

    @Autowired
    private jwtgenrateservice jwt;
    
    @Autowired
    private userdetailsservice u;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        

        String token = null;
        Cookie[] cookies = request.getCookies();
        
        if (cookies != null) {
            for (Cookie c : cookies) {
                if ("accessToken".equals(c.getName())) {
                    token = c.getValue();
                    break;
                }
            }
        }       

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (token != null && !token.trim().isEmpty() && authentication == null) {
            try {
                // 1. Extract number/username
                String num = jwt.extractnumber(token);
                
                if (num != null) {
                    // 2. Load user details
                    UserDetails user = u.loadUserByUsername(num);
         
                    System.out.println( "this is username +++++++++++++++++++++++ "+ user.getAuthorities());
                    // 3. Validate token
                    if (jwt.validatetoken(token, num)) {
                        UsernamePasswordAuthenticationToken userpass = new UsernamePasswordAuthenticationToken(
                                user, null, user.getAuthorities()
                        );
                        
                        WebAuthenticationDetailsSource web = new WebAuthenticationDetailsSource();
                        userpass.setDetails(web.buildDetails(request));
                                   
                        SecurityContextHolder.getContext().setAuthentication(userpass);
                       
                    } 
                }
            } catch (Exception e) {
             
                logger.error("Cannot set user authentication: {}", e);
                SecurityContextHolder.clearContext();
            }
        
        }
        
        filterChain.doFilter(request, response);
    }
}