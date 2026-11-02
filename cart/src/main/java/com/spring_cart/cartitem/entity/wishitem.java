package com.spring_cart.cartitem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class wishitem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int wishid;
	@ManyToOne
	@JsonIgnore
	private wishlist wishlist;
	private int prodid;

	public int getWishid() {
		return wishid;
	}

	public void setWishid(int wishid) {
		this.wishid = wishid;
	}

	public wishlist getWishlist() {
		return wishlist;
	}

	public void setWishlist(wishlist wishlist) {
		this.wishlist = wishlist;
	}

	public int getProdid() {
		return prodid;
	}

	public void setProdid(int prodid) {
		this.prodid = prodid;
	}
	
	
}
