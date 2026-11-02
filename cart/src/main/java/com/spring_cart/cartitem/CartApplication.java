package com.spring_cart.cartitem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class CartApplication {

	public static void main(String[] args) {
		
		Dotenv dot=Dotenv.configure().ignoreIfMissing().load();
		dot.entries().forEach(e-> System.setProperty(e.getKey(), e.getValue()));
		
		SpringApplication.run(CartApplication.class, args);
	}

}
