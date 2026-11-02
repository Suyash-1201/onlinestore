package com.spring_cart.cartitem.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class otprequest {
	
	@NotBlank( message =  "phone number must be enter")
	@NotNull(message = "phone number not be null")
	private String phone;

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	

}
