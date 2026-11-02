package com.spring_cart.cartitem.api;

public class apierror {
	
	private boolean success;
	private String path;
	private String message;
	
	public boolean getSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public apierror(boolean success,  String path, String message) {
		super();
		this.success = success;
		
		this.path = path;
		this.message = message;
	}
	
	
	

}
