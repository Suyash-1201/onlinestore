package com.spring_cart.cartitem.api;

import org.springframework.http.HttpStatus;

public class apiresponse <T> {
	
	private boolean success;
	private HttpStatus status;
	private T data;
	
	
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public HttpStatus getStatus() {
		return status;
	}
	public void setStatus(HttpStatus status) {
		this.status = status;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	public apiresponse(boolean success, HttpStatus status, T data) {
		super();
		this.success = success;
		this.status = status;
		this.data = data;
	}

	
	
	
}
