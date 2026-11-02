package com.spring_cart.cartitem.reposetory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring_cart.cartitem.entity.orders;

public interface orderreposetory extends JpaRepository<orders, Integer> {
	
	public List<orders> findByCartid(int cartid);

}
