package com.spring_cart.cartitem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class orders {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int itemid;
	private int cartid;
	private int prodid;
	@Column(name = "`stock`")
	private int stock;
	private String stutus;
	private String payfor;
	
	public int getItemid() {
		return itemid;
	}
	public void setItemid(int itemid) {
		this.itemid = itemid;
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
	public String getStutus() {
		return stutus;
	}
	public void setStutus(String stutus) {
		this.stutus = stutus;
	}
	public String getPayfor() {
		return payfor;
	}
	public void setPayfor(String payfor) {
		this.payfor = payfor;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCartid() {
		return cartid;
	}
	public void setCartid(int cartid) {
		this.cartid = cartid;
	}
	
	
}
