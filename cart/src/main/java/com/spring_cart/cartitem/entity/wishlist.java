package com.spring_cart.cartitem.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class wishlist {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int wid;
	@OneToOne
	@JsonIgnore
	private userinfo userlist;
	@OneToMany(mappedBy = "wishlist")
	private List<wishitem> item;
	
	
	public int getWid() {
		return wid;
	}
	public void setWid(int wid) {
		this.wid = wid;
	}
	public userinfo getUserlist() {
		return userlist;
	}
	public void setUserlist(userinfo userlist) {
		this.userlist = userlist;
	}
	public List<wishitem> getItem() {
		return item;
	}
	public void setItem(List<wishitem> item) {
		this.item = item;
	}
	
	
	
}
