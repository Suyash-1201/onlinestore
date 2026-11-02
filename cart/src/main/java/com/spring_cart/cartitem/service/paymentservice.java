package com.spring_cart.cartitem.service;

import java.util.Map;
import java.util.UUID;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import com.spring_cart.cartitem.DTO.verifypaymentreqeust;
import com.spring_cart.cartitem.entity.payment;
import com.spring_cart.cartitem.entity.userinfo;
import com.spring_cart.cartitem.reposetory.paymentreposetory;
import com.spring_cart.cartitem.reposetory.userrposetory;

@Service
public class paymentservice {
	
	@Autowired
	private userrposetory userrepo;
	@Autowired
	private paymentreposetory repo;
	@Value("${razorpay.key.id}")
	private String keyid;
	@Value("${razorpay.key.secret}")
	private String secretkey;
	
	public Map<String , Object> createorder(double amount) throws Exception{
		
		if(amount < 1 ) {
			throw new RuntimeException("Please enter positive amount");
		}
		
		long paise=Math.round(amount*100);
		
		RazorpayClient client=new RazorpayClient(keyid,secretkey);
		
		JSONObject json=new JSONObject();
		
		json.put("amount", paise);
		json.put("currency", "INR");
		json.put("receipt", "receipt_"+UUID.randomUUID());
		
		Order order=client.orders.create(json);
		
		payment pay=new payment();
		pay.setAmount(paise/100);
		pay.setRazorpayorderid(order.get("id"));
		pay.setStatus("pending");
		
		repo.save(pay);
		
		
		
		return Map.of("success",true,"key",keyid
				,"orderid",order.get("id"),
				"amount",paise,
				"currency","INR"
				);
	}
	
	public Map<String , Object> verifypayment(verifypaymentreqeust req) throws Exception{
		
		payment pay=repo.findByRazorpayorderid(req.getRazorpayorderid())
				.orElseThrow(()-> new RuntimeException("payment details not found"));
		
		if(!"pending".equals(pay.getStatus())) {
			throw new RuntimeException("Payment is not in pending");
		}
		
		JSONObject json=new JSONObject();
		json.put("razorpay_order_id", pay.getRazorpayorderid());
		json.put("razorpay_payment_id", req.getRazorpaypaymentid());
		json.put("razorpay_signature", req.getRazorpaysignature());
		
		boolean valid=Utils.verifyPaymentSignature(json, secretkey);
		
		if(!valid) {
			throw new RuntimeException("Signature is not valid");
		}
		
		userinfo user= userrepo.findByNumber(req.getNumber());
		pay.setRazorpaypaymentid(req.getRazorpaypaymentid());
		pay.setStatus("paid");
		pay.setNumber(req.getNumber());
		pay.setPayfor(req.getPayfor());
		if( req.getRole().equals("premium")) {
			pay.setRole("premium");
		}
		else {
			pay.setRole("user");
		}
		repo.save(pay);
		
		if(user.getRole().equals("premium") || req.getRole().equals("premium")) {
			user.setRole("premium");
			userrepo.save(user);
			
		}
		else {
			user.setRole(req.getRole());
			userrepo.save(user);
		}
		
		
		return Map.of("success",true,
				"message","Payment Successfull",
				"paymentid",req.getRazorpaypaymentid(),
				"status",pay.getStatus()
				);
	}

}
