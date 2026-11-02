package com.spring_cart.cartitem.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class payment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(name = "`number`")
	private long number;
	private String razorpayorderid;
	private String razorpaypaymentid;
	private long amount;
	private String status;
	private String role;
	private String payfor;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public long getAmount() {
		return amount;
	}
	public void setAmount(long amount) {
		this.amount = amount;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public long getNumber() {
		return number;
	}
	public void setNumber(long number) {
		this.number = number;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getPayfor() {
		return payfor;
	}
	public void setPayfor(String payfor) {
		this.payfor = payfor;
	}
	
	
	
}
