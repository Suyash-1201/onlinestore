package com.spring_cart.cartitem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.spring_cart.cartitem.api.apierror;
import com.spring_cart.cartitem.api.apiresponse;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class globalexceptionhandlingfornormalerrors {

	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleerror(Exception ex,HttpServletRequest http){
		
		apierror er=new apierror(true, http.getRequestURI(), ex.getMessage());
		
		return ResponseEntity.status(HttpStatus.CONFLICT).body(er);
		
	}
}
