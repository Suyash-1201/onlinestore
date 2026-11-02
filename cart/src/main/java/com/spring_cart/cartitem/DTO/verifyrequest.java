package com.spring_cart.cartitem.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class verifyrequest {
	
	@NotNull(message = "otp is not be null")
	@NotBlank(message = "otp not be blank")
	private String otp;

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}
	
	
	
}
