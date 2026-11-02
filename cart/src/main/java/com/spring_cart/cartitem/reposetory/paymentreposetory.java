package com.spring_cart.cartitem.reposetory;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring_cart.cartitem.entity.payment;

public interface paymentreposetory extends JpaRepository<payment, Integer> {
	
	Optional<payment> findByRazorpayorderid(String razorpayorderid);
	
	public List<payment> findByNumber(long number);

}
