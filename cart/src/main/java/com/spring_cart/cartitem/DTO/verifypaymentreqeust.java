package com.spring_cart.cartitem.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class verifypaymentreqeust {
	
	@NotBlank(message = "please enter order id")
	@NotNull(message = "please enter order id")
	private String razorpayorderid;
	@NotBlank(message = "please enter payment id")
	@NotNull(message = "please enter payment id")
	private String razorpaypaymentid;
	@NotBlank(message = "please enter signature id")
	@NotNull(message = "please enter signature id")
	private String razorpaysignature;
	@NotBlank(message = "please enter number")
	@NotNull(message = "please enter number")
	private long number;
	@NotBlank(message = "please enter role")
	@NotNull(message = "please enter role")
	private String role;
	@NotBlank(message = "please enter order id")
	@NotNull(message = "please enter order id")
	private String payfor;
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getRazorpayorderid() {
		return razorpayorderid;
	}
	public void setRazorpayorderid(String razorpayorderid) {
		this.razorpayorderid = razorpayorderid;
	}
	public String getRazorpaypaymentid() {
		return razorpaypaymentid;
	}
	public void setRazorpaypaymentid(String razorpaypaymentid) {
		this.razorpaypaymentid = razorpaypaymentid;
	}
	public String getRazorpaysignature() {
		return razorpaysignature;
	}
	public void setRazorpaysignature(String razorpaysignature) {
		this.razorpaysignature = razorpaysignature;
	}
	public long getNumber() {
		return number;
	}
	public void setNumber(long number) {
		this.number = number;
	}
	public String getPayfor() {
		return payfor;
	}
	public void setPayfor(String payfor) {
		this.payfor = payfor;
	}
	
	

}
