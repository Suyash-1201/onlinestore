package com.spring_cart.cartitem.entity;

import jakarta.persistence.Column;

public class useritemdto {
	
	@Column(name = "`number`")
	private long number;
	private int prodid;
	private int stock;
	
	
	public long getNumber() {
		return number;
	}
	public void setNumber(long number) {
		this.number = number;
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
