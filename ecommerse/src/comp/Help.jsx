import React, { useState } from 'react'
import '../css/help.css'
import Pagewrapper from './Pagewrapper';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
const Help = () => {

    const [show,setshow]=useState(false);
    const [show2,setshow2]=useState(false);
    const [show3,setshow3]=useState(false);
    const [show4,setshow4]=useState(false);
    const [show5,setshow5]=useState(false);

    const navigate=useNavigate();

    function navi(value){
        navigate(value)
    }
    return (
        <Pagewrapper>
          <div>
    <div className="help-container">
      <h1 className="help-title">Help Center</h1>

      {/* sign up*/}
      <section className="help-section">
        
        <div className="help-content">
          <h2 onClick={()=>setshow(!show)}>Sign up</h2>
          <div className={show?'help-p2':'help-p'}>
             <p><strong>Go to sign up page:</strong>Click on sign up section.</p>
          <p><strong>Details:</strong>Fill the all your personal details as per form.</p>
          <p><strong>Create account:</strong>Click on sign up button and your <strong>Online-store</strong> account is created.</p>
          </div>
         
        </div>
      </section>

      {/* wishlist help */}
      <section className="help-section">
        
        <div className="help-content">
          <h2 onClick={()=>setshow2(!show2)}>Wishlist</h2>
          <div className={show2?'help-wish':'help-p'}>
            <p><strong>Products:</strong>Click on product what you want.</p>
          <p><strong>Add:</strong>Click on the heart shape button.Product is add to wishlist.</p>
          <p>Check the product in wishlist section. <span onClick={()=>navi('/wishlist')} style={{fontStyle:'italic',color:'blue',cursor:'pointer'}}>click here</span></p>
          </div>
        </div>
      </section>

      {/* Payments & Billing */}
      <section className="help-section">
        
        <div className="help-content">
          <h2 onClick={()=>setshow3(!show3)}>💳 Payments & Billing</h2>
          <div className={show3?'help-pay':'help-p'}>
            <p><strong>Cart:</strong>Add product in cart then click on checkout</p>
          <p><strong>Information:</strong>Fill all your information as per form.</p>
          <p><strong>Payment & Billing:</strong>Pyment page is visible.we can accept Upi/Cards/Netbanking many more.</p>
          <p>select your payment method and click on pay now.</p>
          </div>
        </div>
      </section>

      {/* Account Support */}
      <section className="help-section">
        
        <div className="help-content">
          <h2 onClick={()=>setshow4(!show4)}>👤 Account Support</h2>
          <div className={show4?'help-acc':'help-p'}>
            <p>Create an account easily.</p>
          <p><strong>Log in:</strong>Check you have an account of onelinestore</p>
          <p>then go to login section and login with same username and password.</p>
          <p> <strong>Forgot password:</strong> <span onClick={()=>navi('/forgot')} style={{fontStyle:'italic',color:'blue',cursor:'pointer'}}>Forgot password?</span> Use the Reset Password link on login page.</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="help-section">
        
        <div className="help-content">
          <h2 onClick={()=>setshow5(!show5)}>📞 Contact Us</h2>
          <div className={show5?'help-cont':'help-p'}>
            <p>Email: support@onlinestore.com</p>
          <p>Live Chat: 9 AM – 6 PM (Mon–Fri)</p>
          <p>Phone: +91 (000) 123-4567</p>
          </div>
        </div>
      </section>
      
    </div>
    <Footer/>
    </div>
        </Pagewrapper>
       
    )
}

export default Help
