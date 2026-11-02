package com.spring_cart.cartitem.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;

@Entity

public class cart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cartid;
	@OneToOne
	@JsonIgnore
	private userinfo user;
	@OneToMany(mappedBy = "cartdata")
	private List<cartitem> items;
	
	public int getCartid() {
		return cartid;
	}
	public void setCartid(int cartid) {
		this.cartid = cartid;
	}
	public userinfo getUser() {
		return user;
	}
	public void setUser(userinfo user) {
		this.user = user;
	}
	public List<cartitem> getItems() {
		return items;
	}
	public void setItems(List<cartitem> items) {
		this.items = items;
	}
	
	
}
