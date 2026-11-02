package com.spring_cart.cartitem.DTO;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class contactrequest {

	
	@NotNull(message = "plase enter mobile number")
	private long mobile;
	private String name;
	@NotBlank(message = "Plese enter message")
	@NotNull(message = "plase enter message")
	private String message;
	private boolean status;
	public long getMobile() {
		return mobile;
	}
	public void setMobile(long mobile) {
		this.mobile = mobile;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	
	
}
