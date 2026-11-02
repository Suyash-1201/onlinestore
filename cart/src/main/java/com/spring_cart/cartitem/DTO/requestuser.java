package com.spring_cart.cartitem.DTO;


import com.spring_cart.cartitem.entity.wishlist;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class requestuser {
	
	@NotEmpty(message = "User name not be empty")
	@NotNull(message = "User name not be empty")
	private String uname;
	@Column(nullable = false)
	@Min(value = 1000000000L,message = "must be 10 digits")
	@Max(value = 9999999999L,message = "must be 10 digits")
	private long number;
	@Pattern(
			regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%&*?_-]).{8,}$",
			message = "Password must contains 8+ characgters ,uppercase ,lowercase ,digits ,symbols"
			)
	@NotEmpty(message = "Password can't be empty")
	private String pass;
	private String role;
	
	
	
	
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public long getNumber() {
		return number;
	}
	public void setNumber(long number) {
		this.number = number;
	}
	
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	
}
