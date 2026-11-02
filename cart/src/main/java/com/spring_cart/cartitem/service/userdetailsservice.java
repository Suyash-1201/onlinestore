package com.spring_cart.cartitem.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.spring_cart.cartitem.entity.admin;
import com.spring_cart.cartitem.entity.userinfo;
import com.spring_cart.cartitem.reposetory.adminreposetory;
import com.spring_cart.cartitem.reposetory.userrposetory;



@Service
public class userdetailsservice implements UserDetailsService {
    
    @Autowired
    private userrposetory userRepo;
    
    @Autowired
    private adminreposetory adminRepo;

    @Override
    public UserDetails loadUserByUsername(String number) throws UsernameNotFoundException {
        long parsedNumber = Long.parseLong(number);
        
        System.out.println("-----===========-----====----===-----------------/////////////////////////////////////////////////");
        
        // 1. Check regular users first
        userinfo userInfo = userRepo.findByNumber(parsedNumber);
        if (userInfo != null) {
            String role = userInfo.getRole(); 
            System.out.println(role);
            return User.withUsername(String.valueOf(userInfo.getNumber()))
                       .password(userInfo.getPass())
                       .roles(role) // Ensures it becomes ROLE_premium or ROLE_user
                       .build();
            
        }
        
        
       
        admin adminInfo = adminRepo.findByNumber(parsedNumber);
        if (adminInfo != null) {
            String role = adminInfo.getRole(); // should be "admin"
            System.out.println(role);
            
            return User.withUsername(String.valueOf(adminInfo.getNumber()))
                       .password(adminInfo.getPass())
                       .roles(role)
                       .build();
        }
        
        throw new UsernameNotFoundException("User not found with number: " + number);
    }
}