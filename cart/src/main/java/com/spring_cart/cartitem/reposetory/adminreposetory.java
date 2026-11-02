package com.spring_cart.cartitem.reposetory;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring_cart.cartitem.entity.admin;

public interface adminreposetory extends JpaRepository<admin, Integer> {

	public admin findByNumber(long number);
	public boolean existsByNumber(long number);
	
}
