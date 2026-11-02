package com.spring_cart.cartitem.reposetory;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring_cart.cartitem.entity.wishlist;

public interface wishlistreposetory extends JpaRepository<wishlist, Integer> {

}
