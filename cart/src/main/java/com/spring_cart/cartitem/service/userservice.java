package com.spring_cart.cartitem.service;

import java.awt.event.ItemEvent;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring_cart.cartitem.DTO.adminresponse;
import com.spring_cart.cartitem.DTO.contactrequest;
import com.spring_cart.cartitem.DTO.requestmessage;
import com.spring_cart.cartitem.DTO.requestuser;
import com.spring_cart.cartitem.DTO.responseDTO;
import com.spring_cart.cartitem.DTO.tempusersave;
import com.spring_cart.cartitem.entity.admin;
import com.spring_cart.cartitem.entity.cart;
import com.spring_cart.cartitem.entity.cartitem;
import com.spring_cart.cartitem.entity.contact;
import com.spring_cart.cartitem.entity.orders;
import com.spring_cart.cartitem.entity.payment;
import com.spring_cart.cartitem.entity.userinfo;
import com.spring_cart.cartitem.entity.useritemdto;
import com.spring_cart.cartitem.entity.wishitem;
import com.spring_cart.cartitem.entity.wishlist;
import com.spring_cart.cartitem.reposetory.adminreposetory;
import com.spring_cart.cartitem.reposetory.cartitemreposetory;
import com.spring_cart.cartitem.reposetory.cartreposetory;
import com.spring_cart.cartitem.reposetory.contactreposetory;
import com.spring_cart.cartitem.reposetory.orderreposetory;
import com.spring_cart.cartitem.reposetory.paymentreposetory;
import com.spring_cart.cartitem.reposetory.userrposetory;
import com.spring_cart.cartitem.reposetory.wishitemreposetory;
import com.spring_cart.cartitem.reposetory.wishlistreposetory;

@Service
public class userservice {

	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private orderreposetory order;
	@Autowired
	private userrposetory userrepo;
	@Autowired
	private cartreposetory cartrepo;
	@Autowired
	private cartitemreposetory cartitemrepo;
	@Autowired
	private wishlistreposetory wishrepo;
	@Autowired
	private wishitemreposetory wishitemrepo;
	@Autowired
	private textbeeservice serv;
	@Autowired
	private paymentreposetory pay;
	@Autowired
	private contactreposetory contrepo;
	@Autowired
	private adminreposetory adminrepo;
	
	private Map<String , String > otpstore= new HashMap<String, String>();
	
	tempusersave tempuser=new tempusersave();
	
//	temp user or admin register
	public boolean tempsaveuser(requestuser user) {
		
		boolean send=false;
		
		tempuser.setUname(user.getUname());
		tempuser.setNumber(user.getNumber());
		tempuser.setPass(user.getPass());
		
		if(sendotps(String.valueOf(user.getNumber()))) {
			send=true;
		}
		
		return send;
	}

	
//	insert user
	public responseDTO adduser() {
		
		
		
		if(userrepo.existsByNumber(tempuser.getNumber())) {
			
			throw new RuntimeException("student already register");
		}
		
			 userinfo uservalue= new userinfo();
			 uservalue.setUname(tempuser.getUname());
			 uservalue.setNumber(tempuser.getNumber());
			 uservalue.setPass(encoder.encode(tempuser.getPass()));
			 uservalue.setRole("user");

			 
			 userrepo.save(uservalue);
			 
			
				
				cart cartvalue=new cart();
				
				wishlist wish=new wishlist();
				
		        cartvalue.setUser(uservalue);
		        
		        wish.setUserlist(uservalue);
		        
		        wishrepo.save(wish);
				
				cartrepo.save(cartvalue);
				
				uservalue.setCart(cartvalue);
				
				uservalue.setWish(wish);
				
				 responseDTO dto =new responseDTO();
				 dto.setUid(uservalue.getUid());
				 dto.setNumber(uservalue.getNumber());
				 dto.setPass(uservalue.getPass());
				 dto.setUname(uservalue.getUname());
				 dto.setCart(uservalue.getCart());
				 dto.setWish(uservalue.getWish());
				
				return dto;
		
			
	}
	
//	fetch all user data
	
	public List<userinfo> alluser(){
		return userrepo.findAll();
	}
	
//	update user password
	public userinfo updatepass(userinfo u) {
		System.out.println(u.getNumber());
		userinfo user=userrepo.findByNumber(u.getNumber());
		if(user == null) {
			return null;
		}
		user.setPass(u.getPass());
		return userrepo.save(user);
	}
	
//	get user by number
	public userinfo getuserbynum(long num) {
		userinfo user= userrepo.findByNumber(num);
		if(user == null) {
			return null;
		}
		return user;
	}
//	add cartitem
	
	public cartitem additem(useritemdto dto) {
		
		userinfo info=userrepo.findByNumber(dto.getNumber());
		
		if(info == null) {
			throw new RuntimeException("User not found");
		}
		
		cart c=info.getCart();
		
		List<cartitem> list=c.getItems();
		
		if(list == null) {
			list=new ArrayList<cartitem>();
		}
		
		for (cartitem item : list) {
			if(item.getProdid() == dto.getProdid()) {
				item.setStock(item.getStock()+dto.getStock());
				return cartitemrepo.save(item);
			}
		}
		
		cartitem citem=new cartitem();
		
		citem.setProdid(dto.getProdid());
		citem.setStock(dto.getStock());
		citem.setCartdata(c);
		
		list.add(citem);
		c.setItems(list);
		
		return cartitemrepo.save(citem);
	}
	
//	fetch all from cart item
	public List<cartitem> fetchitems(long number){
		userinfo user=userrepo.findByNumber(number);
		return cartitemrepo.findByCartdata_Cartid(user.getCart().getCartid());
	}
	
//	delete cart item by id
	public void deleteitem(int id) {
		cartitem item=cartitemrepo.findById(id).orElse(null);
		cartitemrepo.delete(item);
		
	}
	
//	delete all cart items
	@Transactional
	public void deleteallcartitem(long number) {	
		userinfo user=userrepo.findByNumber(number);
		if(user == null) {
			throw new RuntimeException("user not found");
		}
		cart cart=user.getCart();
		List<cartitem> cartitem=cartitemrepo.findByCartdata_Cartid(cart.getCartid());
		for (cartitem c : cartitem) {
			orders o=new orders();
			
			o.setCartid(cart.getCartid());
			o.setItemid(c.getItemid());
			o.setPayfor("order");
			o.setProdid(c.getProdid());
			o.setStock(c.getStock());
			o.setStutus("paid");
			
			order.save(o);
		}
		
		
		
		cartitemrepo.deleteByCartdata_Cartid(cart.getCartid());
	}
	
	
//	increse cart item stock by id
	public cartitem incresestock(int id) {
		cartitem item=cartitemrepo.findById(id).orElse(null);
		item.setStock(item.getStock()+1);
		return cartitemrepo.save(item);
	}
	
//	decrease cart item stock by id
	public cartitem decresestock(int id) {
		cartitem item=cartitemrepo.findById(id).orElse(null);
		item.setStock(item.getStock()-1);
		if(item.getStock() == 0) {
			deleteitem(id);
			return item;
		}
		return cartitemrepo.save(item);
	}
	
//	add items in wish items
	public wishitem addwishitem(useritemdto dto) {
		
		userinfo user=userrepo.findByNumber(dto.getNumber());
		
		if(user == null) {
			throw new RuntimeException("User not found");
		}
		
		wishlist wish =user.getWish();
		
		List<wishitem> wishitemlist=wish.getItem();
		
		if(wishitemlist == null) {
			wishitemlist=new ArrayList<wishitem>();
		}
		
		for (wishitem item : wishitemlist) {
			if(item.getProdid() == dto.getProdid()) {
				wishitemrepo.delete(item);
				return null;
			}
		}
		
		wishitem wishitem=new wishitem();
		wishitem.setProdid(dto.getProdid());
		wishitem.setWishlist(wish);
		
		wishitemlist.add(wishitem);
		return wishitemrepo.save(wishitem);
	}
	
//	fetch wish item data
	public List<wishitem> fetchwishitem(long num){
		userinfo user=userrepo.findByNumber(num);
		
		if(user == null) {
			throw new RuntimeException("user not found");
		}
		
		wishlist wishlist=user.getWish();
		
		if(wishlist == null) {
			throw new RuntimeException("wishlist not found");
		}
		
		List<wishitem> item=wishlist.getItem();
		
		return item;
	}
	
//	remove wish item 
	public void removewishitem(useritemdto dto){
		userinfo user=userrepo.findByNumber(dto.getNumber());
		if(user == null) {
			 throw new RuntimeException("user not found");
		}
	
		wishlist wish=user.getWish();
		if(wish == null) {
			throw new RuntimeException("wishlist not found");
		}
		
		List<wishitem> items=wish.getItem();
		
		for (wishitem item : items) {
			if(item.getProdid() == dto.getProdid()) {
				wishitemrepo.delete(item);
			}

		}
		
	}
	
//	generate and send otp	
	public boolean sendotps(String phone) {
		
		String otp=String.valueOf(1000+new SecureRandom().nextInt(9000));
		
		otpstore.put("otp", otp);
		
		serv.sendotp(phone, otp);
		
		return true;
		
	}
	
	
//	otp verification for user
	public responseDTO verifyotp(String enteredotp) {
		
		String storedotp=otpstore.get("otp");
		
		if(storedotp == null) {
			throw new RuntimeException("NOT VALID");
			
		}
		
		if(!storedotp.equals(enteredotp)) {
			
			throw new RuntimeException("Opt is invalid");
		}
		otpstore.remove("otp");
		return adduser();
	}
	
//	send order confirmation message to user
	public String sendmessage(requestmessage m) {
		serv.sendotp(String.valueOf(m.getNumber()), m.getMessage());
		
		return "message send";
	}
	
//	get all payment details of one user
	public payment getallpayments(long number){
		List<payment> getpayments=pay.findByNumber(number);
		
		payment pay=getpayments.stream().filter(i->i.getPayfor().equals("premiumuser") || i.getPayfor().equals("order"))
				.findFirst().orElseThrow(()-> new RuntimeException("Payment not found"));
		
		if(pay == null) {
			throw new RuntimeException("payment details not found");
		}
		
		return pay;
	}
	
//	get all paymentn details of all user
	public List<payment> getallusersPayments(){
		return pay.findAll();
	}
	
//	get order details of one user
	public List<orders> getallorders(long number){
		userinfo user=userrepo.findByNumber(number);
		
		if(user==null) {
			throw new RuntimeException("user not found");
		}
		
		cart c=user.getCart();
		
		List<orders> o=order.findByCartid(c.getCartid());
		
		return o;
	}
	
//	get all users order details
	public List<orders> getalluserorder(){
		return order.findAll();
	}
	
//	save contact details
	public contact savecontact(contactrequest req) {
		contact c=new contact();
		c.setName(req.getName());
		c.setMobile(req.getMobile());
		c.setMessage(req.getMessage());
		c.setStatus(false);
		
		return contrepo.save(c);
	}
	
//	update status
	public contact changestatus(int id) {
		contact c=contrepo.findById(id).orElseThrow(()-> new RuntimeException("contact details not found"));
		
		c.setStatus(true);
		return contrepo.save(c);
	}
	
//	fetch all contact details
	public List<contact> fetchallcontacts(){
		return contrepo.findAll();				
	}
	
//	save admin in admin table
	public adminresponse saveadmin() {
		
		if(adminrepo.existsByNumber(tempuser.getNumber())) {
			
			throw new RuntimeException("admin already register");
		}
		
			 admin admivalue= new admin();
			 admivalue.setAdminname(tempuser.getUname());
			 admivalue.setNumber(tempuser.getNumber());
			 admivalue.setPass(encoder.encode(tempuser.getPass()));
			 admivalue.setRole("admin");

			 
			 adminrepo.save(admivalue);
				
				 adminresponse dto =new adminresponse();
				 dto.setAdminid(admivalue.getAdminid());
				 dto.setNumber(admivalue.getNumber());
				 dto.setAdminname(admivalue.getAdminname());
				 dto.setRole(admivalue.getRole());
				
				return dto;
	}
	
//	otp verification for admin
public adminresponse verifyotpforadmin(String enteredotp) {
		
		String storedotp=otpstore.get("otp");
		
		if(storedotp == null) {
			throw new RuntimeException("NOT VALID");
			
		}
		
		if(!storedotp.equals(enteredotp)) {
			
			throw new RuntimeException("Opt is invalid");
		}
		otpstore.remove("otp");
		return saveadmin();
	}

//find admin by number
public adminresponse findadmin(long number) {
	admin a=adminrepo.findByNumber(number);
	if(a == null) {
		throw new RuntimeException("admin not found");
	}
	
	adminresponse ad=new adminresponse();
	ad.setAdminid(a.getAdminid());
	ad.setAdminname(a.getAdminname());
	ad.setNumber(a.getNumber());
	ad.setRole(a.getRole());
	
	return ad;
}

//delete admin by id
public boolean deleteadmin(int id) {
	admin ad=adminrepo.findById(id).orElse(null);
	if(ad== null) {
		return false;
	}
	adminrepo.delete(ad);
	return true;
}

//  find all admins
public List<admin> findalladmin(){
	return adminrepo.findAll();
}
}
