package com.spring_cart.cartitem.controller;



import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring_cart.cartitem.DTO.adminresponse;
import com.spring_cart.cartitem.DTO.contactrequest;
import com.spring_cart.cartitem.DTO.orderrequest;
import com.spring_cart.cartitem.DTO.otprequest;
import com.spring_cart.cartitem.DTO.requestmessage;
import com.spring_cart.cartitem.DTO.requestuser;
import com.spring_cart.cartitem.DTO.responseDTO;
import com.spring_cart.cartitem.DTO.tempusersave;
import com.spring_cart.cartitem.DTO.verifypaymentreqeust;
import com.spring_cart.cartitem.DTO.verifyrequest;
import com.spring_cart.cartitem.api.apiresponse;
import com.spring_cart.cartitem.entity.admin;
import com.spring_cart.cartitem.entity.cartitem;
import com.spring_cart.cartitem.entity.orders;
import com.spring_cart.cartitem.entity.payment;
import com.spring_cart.cartitem.entity.userinfo;
import com.spring_cart.cartitem.entity.useritemdto;
import com.spring_cart.cartitem.entity.wishitem;
import com.spring_cart.cartitem.reposetory.adminreposetory;
import com.spring_cart.cartitem.reposetory.contactreposetory;
import com.spring_cart.cartitem.reposetory.userrposetory;
import com.spring_cart.cartitem.service.jwtauthservice;
import com.spring_cart.cartitem.service.jwtgenrateservice;
import com.spring_cart.cartitem.service.paymentservice;
import com.spring_cart.cartitem.service.userservice;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/user")
public class usercontroller {

	@Autowired
	private userservice value;
	@Autowired
	private paymentservice pay;
	@Autowired
	private AuthenticationManager manager;
	@Autowired
	private jwtauthservice jwtauth;
	@Autowired
	private jwtgenrateservice jwtgenerate;
	@Autowired
	private userrposetory urepo;
	@Autowired
	private adminreposetory adminrepo;
	
//	save temper user
	@PostMapping("/tempsaveuser")
	public ResponseEntity<?> tempusersave(@Valid @RequestBody requestuser user) {
		if( value.tempsaveuser(user)) {
			apiresponse<String> api=new apiresponse<String>(true, HttpStatus.OK,"OTP SEND");
			 return ResponseEntity.ok().body(api);
		}
		return ResponseEntity.badRequest().body("OTP NOT GENERATE");
		
	}
	
//	add user
	@PostMapping("/saveuser")
	public responseDTO insertuser() {
	 	return value.adduser();
	}
	
//	fetch all user data
	@GetMapping("/allusers")
	public List<userinfo> fetchusers(){
		return value.alluser();
	}
	
//	update user password
	@PutMapping("/updatepass")
	public userinfo forgotpass(@RequestBody userinfo u) {
		return value.updatepass(u);
	}
	
//	get user by number
	@GetMapping("/getuser/{num}")
	public userinfo getusernum(@PathVariable long num) {
		return value.getuserbynum(num);
	}
	
//	add cart item
	@PostMapping("/saveitems")
	public cartitem insertcartitem(@RequestBody useritemdto dto) {
		return value.additem(dto);
	}
	
//	fetch items from cart items
	@GetMapping("/getitems/{number}")
	public List<cartitem> allitems(@PathVariable long number){
		return value.fetchitems(number);
	}
	
//	delete all cart item 
	@DeleteMapping("/deletecartitems/{number}")
	public void deleteallitems(@PathVariable long number) {
		value.deleteallcartitem(number);
	}
	
//	delete item by id
	@DeleteMapping("/deleteitem/{id}")
	public void deletecartitem(@PathVariable int id) {
		value.deleteitem(id);
	}
	
//	increse item stock by id
	@PutMapping("/instock/{id}")
	public cartitem instock(@PathVariable int id) {
		return value.incresestock(id);
	}
//	decrese cartitem stock by id
	@PutMapping("/decstock/{id}")
	public cartitem decstock(@PathVariable int id) {
		return value.decresestock(id);
	}
	
//	add items in wish items
	@PostMapping("/addwish")
	public wishitem addWishitems(@RequestBody useritemdto dto) {
		return value.addwishitem(dto);
	}
	
//	fetch all wish item data
	@GetMapping("/getwishitems/{num}")
	public List<wishitem> fetchwishitem(@PathVariable long num){
		return value.fetchwishitem(num);
	}
	
//	remove wish item
	@DeleteMapping("/removewish")
	public void deletewishitem(@RequestBody useritemdto dto) {
		value.removewishitem(dto);
	}
	
//	send otp to phone number
	@PostMapping("/sendotp")
	public ResponseEntity<?> otpreq(@Valid @RequestBody otprequest o){
		
		value.sendotps(o.getPhone());
		
		return ResponseEntity.status(HttpStatus.CREATED).body("Otp is send");
	}
	
//	verify otp for user 
	@PostMapping("/verify/otp")
	public ResponseEntity<?> verificationotp(@Valid @RequestBody verifyrequest v){
		
		responseDTO dto=value.verifyotp(v.getOtp());
		
		if( dto != null ) {
			apiresponse<responseDTO> api=new apiresponse<responseDTO>(true, HttpStatus.OK,dto);
			return ResponseEntity.ok().body(api);
		}
		
		return ResponseEntity.badRequest().body("INVALID OTP");
		
		
	}
	
//	send order confirm message to user
	@PostMapping("/sendmessage")
	public ResponseEntity<?> sendconfirmmessage(@RequestBody requestmessage mes){
		return ResponseEntity.ok().body(value.sendmessage(mes));
	}
	
//	create payment order
	@PostMapping("/createorder")
	public ResponseEntity<?> createorders(@RequestBody orderrequest req) throws Exception{
		return ResponseEntity.ok(pay.createorder(req.getAmount()));
	}
	
//	verify payment signature
	@PostMapping("/verify/payment")
	public ResponseEntity<?> verifypayments(@RequestBody verifypaymentreqeust req) throws Exception{
		return ResponseEntity.ok(pay.verifypayment(req));
	}
	
//	login user and create jwt 
	@PostMapping("/login")
	public ResponseEntity<?> loginuser(@RequestBody requestuser req,HttpServletResponse http){
		
		Authentication authentication=manager.authenticate
				(new UsernamePasswordAuthenticationToken(String.valueOf(req.getNumber()), req.getPass()));
		
		adminresponse res=new adminresponse();
		
		if(urepo.existsByNumber(req.getNumber())) {
			userinfo user=urepo.findByNumber(req.getNumber());
			res.setRole(user.getRole());
		}
		
		if(adminrepo.existsByNumber(req.getNumber())){
			admin ad=adminrepo.findByNumber(req.getNumber());
			res.setRole(ad.getRole());
		}
		
		String token=jwtgenerate.generatejwt(authentication.getName());
		
		Cookie cookie=new Cookie("accessToken", token);
		cookie.setHttpOnly(true);
		cookie.setSecure(false);
		cookie.setPath("/");
		cookie.setMaxAge(60*60);
		
		http.addCookie(cookie);
		
		return ResponseEntity.ok(Map.of("message","Login successfull","number",req.getNumber(),"role",res.getRole()));
		
		
	}
	

	
//	verify bearer jwt token
	@GetMapping("/verify/premium")
	public ResponseEntity<?> verifytoken(){
		Authentication auth=SecurityContextHolder.getContext().getAuthentication();
		if(auth.isAuthenticated()) {
			return ResponseEntity.ok().body(auth.getName());
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
				
	}
	
//	get payment details
	 @GetMapping("/getpremiumuser/{number}")
	public payment getpayments(@PathVariable long number){
		return value.getallpayments(number);
	}
	 
//	 get all users payment details for admin dashboard
	 @GetMapping("/getallpayments")
	 public List<payment> getalluserspaylist(){
		 return value.getallusersPayments();
	 }
	 
//	 get all users order details for admin dashboard
	 @GetMapping("/getallorders")
	 public List<orders> getallusersorders(){
		 return value.getalluserorder();
	 }
	 
//	 get orders details
	 @GetMapping("/getorders/{number}")
	 public List<orders> fetchorders(@PathVariable long number){
		 return value.getallorders(number);
	 }
	 
//	 save contact details
	 @PostMapping("/savecontact")
	 public ResponseEntity<?> insertcontact(@Valid @RequestBody contactrequest con){
		 
		 return ResponseEntity.ok().body(value.savecontact(con));
		 
	 }
	 
//	 update status of contact
	 @PutMapping("/updatestatus/{id}")
	 public ResponseEntity<?> updatestatus(@PathVariable int id){
		 
		 return ResponseEntity.ok().body(value.changestatus(id));	
				 
	 }
	 
//	 fetch all contact details
	 @GetMapping("/getallcontacts")
	 public ResponseEntity<?> getallcontacts(){
		 return ResponseEntity.ok().body(value.fetchallcontacts());
	 }
	 
//	 save admin in database with verify otp for admin
	 @PostMapping("/verify/otpadmin")
		public ResponseEntity<?> verificationotpforadmin(@Valid @RequestBody verifyrequest v){
			
			adminresponse dto=value.verifyotpforadmin(v.getOtp());
			
			if( dto != null ) {
				apiresponse<adminresponse> api=new apiresponse<adminresponse>(true, HttpStatus.OK,dto);
				return ResponseEntity.ok().body(api);
			}
			
			return ResponseEntity.badRequest().body("INVALID OTP");
			
			
		}
	 
//	 find admin by number
	 @GetMapping("/getadmin/{num}")
	 public ResponseEntity<?> getadminbynumber(@PathVariable long num){
		 adminresponse res=value.findadmin(num);
		 
		 apiresponse<adminresponse> api=new apiresponse<adminresponse>(true, HttpStatus.OK, res);
		 
		 return ResponseEntity.ok().body(api);
	 }
	 
//	 delete admin by id
	 @DeleteMapping("/delete/admin/{id}")
	 public ResponseEntity<?> deleteadminbyid(@PathVariable int id){
		 boolean deleted=value.deleteadmin(id);
		 if(deleted == false) {
			 apiresponse<String> api=new apiresponse<String>(false, HttpStatus.NOT_MODIFIED, "Admin not deleted");
			 return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(api);
		 }
		 apiresponse<String> api=new apiresponse<String>(true, HttpStatus.OK, "Admin deleted");
		 return ResponseEntity.ok().body(api);
	 }
	 
//	 find all admins 
	 @GetMapping("/getadmins")
	 public ResponseEntity<?> fetchalladmins(){
		 
		 List<admin> adminlist=value.findalladmin();
		 
		 if(adminlist.isEmpty()) {
			 apiresponse<String> api=new apiresponse<String>(false, HttpStatus.NOT_FOUND, "no admin");
			 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(api);
		 }
		 apiresponse<List<admin> > api=new apiresponse<List<admin> >(true, HttpStatus.OK,adminlist);
		 return ResponseEntity.ok().body(api);
		 
	 }
	
}
