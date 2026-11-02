package com.spring_cart.cartitem.service;

import java.util.Date;


import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class jwtgenrateservice {
	
	@Value("${jwt.secret}")
	private String secretkey;
	@Value("${jwt.expiration}")
	private long expiration;
	
//	create crypto  secret key
	
	public SecretKey createcrypto() {
		
		byte [] arr=Decoders.BASE64.decode(secretkey);
		
		return Keys.hmacShaKeyFor(arr);
		
	}
	
//	generate jwt
	public String generatejwt(String number) {
		
		Date now=new Date();
		
		return Jwts.builder().
				subject(number).
				issuedAt(now).
				expiration(new Date(now.getTime()+expiration))
				.signWith(createcrypto()).compact();		
	}
	
//	extract number
	public String extractnumber(String token) {
		
		return extractallclaims(token).getSubject();
	}
	
//	extract all claims means payload from token
	public Claims extractallclaims(String token) {
		
		return Jwts.parser().
				verifyWith(createcrypto()).
				build().
				parseSignedClaims(token).
				getPayload();
		
	}
	
//	check token expiraton
	public boolean istokenexpire(String token) {
		return extractallclaims(token).getExpiration().before(new Date());
	}
	
//	validate token
	public boolean validatetoken(String token,String number) {
		
		return extractnumber(token).equals(number) && !istokenexpire(token);
	}

}
