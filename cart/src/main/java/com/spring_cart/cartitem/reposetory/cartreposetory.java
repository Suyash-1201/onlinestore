package com.spring_cart.cartitem.reposetory;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring_cart.cartitem.entity.cart;

public interface cartreposetory extends JpaRepository<cart, Integer> {

}
