package com.spring_cart.cartitem.exception;

import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class globalexceptionhandling {
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleexception(MethodArgumentNotValidException ex){
		
		BindingResult bind=ex.getBindingResult();
		HashMap<String, String> hashlist=new HashMap<String, String>();
		
		bind.getFieldErrors().forEach(e-> {
		
			hashlist.put(e.getField(), e.getDefaultMessage());
			
		});
		
		return ResponseEntity.badRequest().body(hashlist);
		
		
	}

}
