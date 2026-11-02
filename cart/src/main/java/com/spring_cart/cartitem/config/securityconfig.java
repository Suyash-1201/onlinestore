package com.spring_cart.cartitem.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.spring_cart.cartitem.service.jwtauthservice;

@Configuration
@Component
public class securityconfig {
	
	@Autowired
	private jwtauthservice authjwt;
	
	@Bean
    public AuthenticationManager authenticationManager( AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
	
	@Bean
	public PasswordEncoder PasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public SecurityFilterChain securitychain(HttpSecurity http) throws Exception {
		
		CsrfTokenRequestAttributeHandler handler=new CsrfTokenRequestAttributeHandler();
//		csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).csrfTokenRequestHandler(handler)
	    
	    http.cors(Customizer.withDefaults())	
	        .csrf(csrf ->csrf.disable()).
	        formLogin(form->form.disable()).
	        httpBasic(basic->basic.disable())
	        .authorizeHttpRequests(auth -> auth
	            .requestMatchers("/user/verify/premium").hasRole("premium").requestMatchers("/user/verify/otpadmin").hasRole("admin")
//	            requestMatchers("/user/verify/otpadmin").hasRole("admin")
	            .anyRequest().permitAll()
	        )
	        .addFilterBefore(authjwt, UsernamePasswordAuthenticationFilter.class);
	    
	    return http.build();
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration configuration = new CorsConfiguration();
	    // Use your exact frontend URL (do NOT use "*" when allowCredentials is true)
	    configuration.setAllowedOrigins( List.of( "http://localhost:5173","http://127.0.0.1:5173","https://onlinestore-three-kappa.vercel.app","http://localhost:3000")); 
	    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	    configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type","X-XSRF-TOKEN", "X-Requested-With"));
	    configuration.setAllowCredentials(true); // <--- Crucial for cookies!
	    
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", configuration);
	    return source;
	}

}
