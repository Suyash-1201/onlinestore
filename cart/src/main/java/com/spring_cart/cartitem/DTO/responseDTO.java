package com.spring_cart.cartitem.DTO;

import com.spring_cart.cartitem.entity.cart;
import com.spring_cart.cartitem.entity.wishlist;

public class responseDTO {
	
	private long uid;
	private String uname;
	private long number;
	private String pass;
	private cart cart;
	private wishlist wish;
	
	public long getUid() {
		return uid;
	}
	public void setUid(long uid) {
		this.uid = uid;
	}
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
	public cart getCart() {
		return cart;
	}
	public void setCart(cart cart) {
		this.cart = cart;
	}
	public wishlist getWish() {
		return wish;
	}
	public void setWish(wishlist wish) {
		this.wish = wish;
	}
	
	
	

}
