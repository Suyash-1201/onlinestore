package com.spring_cart.cartitem.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity
@SequenceGenerator(
		sequenceName = "seq_cartitem",
		name = "cartitem",
		initialValue = 1001,
		allocationSize = 1
		)

public class cartitem {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "cartitem")
	private int itemid;
	@ManyToOne
	@JsonIgnore
	private cart cartdata;
	private int prodid;
	private int stock;
	
	public int getItemid() {
		return itemid;
	}
	public void setItemid(int itemid) {
		this.itemid = itemid;
	}
	public cart getCartdata() {
		return cartdata;
	}
	public void setCartdata(cart cartdata) {
		this.cartdata = cartdata;
	}
	public int getProdid() {
		return prodid;
	}
	public void setProdid(int prodid) {
		this.prodid = prodid;
	}
	public int getStock() {
		return stock;
	}
	public void setStock(int stock) {
		this.stock = stock;
	}
	
	
}
