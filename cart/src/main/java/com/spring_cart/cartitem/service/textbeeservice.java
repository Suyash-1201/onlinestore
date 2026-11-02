package com.spring_cart.cartitem.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class textbeeservice {
	
	@Value("${textbee.api-key}")
	private  String apikey;
	
	@Value("${textbee.subscription-id}")
	private int simid;
	
	private final RestClient rest= RestClient.create("https://api.textbee.dev/api/v1");
	
	public void sendotp(String phone,String otp) {
		
		Map<String, Object> textmap = Map.of("recipients",List.of(phone),
				"message",otp ,"simSubscriptionId",simid); 
		rest.post().uri("/gateway/send-sms").
		header("x-api-key", apikey).contentType(MediaType.APPLICATION_JSON)
		.body(textmap)
				.retrieve().toBodilessEntity();
	}
	
	

}
