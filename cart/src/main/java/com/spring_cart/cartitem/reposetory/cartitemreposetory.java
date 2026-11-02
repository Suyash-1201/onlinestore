package com.spring_cart.cartitem.reposetory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring_cart.cartitem.entity.cartitem;

public interface cartitemreposetory extends JpaRepository<cartitem, Integer> {
	
	List<cartitem> findByCartdata_Cartid(int cartid);
	
	public void deleteByCartdata_Cartid(int cartid);

}
