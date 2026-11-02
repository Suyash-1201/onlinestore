import React, { useEffect, useRef, useState } from 'react'
import '../css/footer.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Api from '../Api';
const Footer = () => {

  const [user,setuser]=useState({});
  const num=Number(localStorage.getItem("number"));
  const nav=useNavigate();
    const ref=useRef();
    const [show,setshow]=useState(false)

    const navigate=useNavigate();

    useEffect(()=>{
        async function finduser() {
          try {
            const res=await Api.get(`/user/getuser/${num}`)
            setuser(res.data)
            console.log(res.data)
          } catch (error) {
            console.log(error)
          }
        }
        finduser()
      },[])

    function navi(value){
      navigate(value)
    }

    const goup=()=>{
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
    }
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h1 className="logo">Onlinestore</h1>
          <p>
            Your one-stop destination for premium products.  
            Quality, style, and convenience delivered in one place.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to={'/'} className='footer-nav'>Home</Link>
           <Link to={'/about'} className='footer-nav'>About Us</Link>
          <Link to={'/help'} className='footer-nav'>Help</Link>
          <Link to={'/contact'} className='footer-nav'>Contact</Link>

        </div>

        <div className="footer-newsletter">
          <h3>Premium Package </h3>
          <p>Subscribe for exclusive deals.</p>

          <div className="newsletter-box">
            <input type="number" value={num} placeholder="Enter your number" />
            <button disabled={user.role === "premium"} onClick={()=>nav("/premium")}>Subscribe</button>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Onlinestore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer
