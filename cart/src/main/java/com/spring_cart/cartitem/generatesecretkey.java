package com.spring_cart.cartitem;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Encoders;

public class generatesecretkey {
	public static void main(String[] args) {
		SecretKey key=Jwts.SIG.HS256.key().build();
		
		String secretkey=Encoders.BASE64.encode(key.getEncoded());
		
		System.out.println(secretkey);
	}

}
