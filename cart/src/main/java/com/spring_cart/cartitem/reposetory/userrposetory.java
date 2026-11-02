package com.spring_cart.cartitem.reposetory;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring_cart.cartitem.entity.userinfo;

public interface userrposetory extends JpaRepository<userinfo, Integer>{

	boolean existsByNumber(long number);
	
	userinfo findByUid(long uid);
	
	userinfo findByNumber(long number);
	
	userinfo findByUname(String uname);
}
