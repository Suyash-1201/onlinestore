package com.spring_cart.cartitem.reposetory;

import org.springframework.data.jpa.repository.JpaRepository;


import com.spring_cart.cartitem.entity.wishitem;

public interface wishitemreposetory extends JpaRepository<wishitem, Integer> {

	wishitem findByProdid(int prodid);
	
}
