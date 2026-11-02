import React, { useState } from 'react'
import '../css/contact.css'
import Pagewrapper from './Pagewrapper'
import Footer from './Footer'
import axios from 'axios'
import Api from '../Api'
const Contact = () => {

  const [user,setuser]=useState({});

  function handeledata(e){
    const { value, name } = e.target;

        setuser(prev => ({
            ...prev,
            [name]: value
        }));
  }

  async function postdata(e) {
    e.preventDefault();
    try {
      const res=await Api.post("/user/savecontact",user)
      console.log(res.data)
      setuser({
        mobile:"",
        name:"",
        message:""
      })
    } catch (error) {
      console.log(error.response?.data.message || error.message)
    }
  }
  return (
    <Pagewrapper>
     <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you. Our team is here to assist you with
          orders, products, and support.
        </p>
      </section>

      {/* Main Contact Section */}
      <section className="contact-container">
        
        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send a Message</h2>

          <form onSubmit={postdata}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name='name'  placeholder="John Doe" value={user.name || ""} onChange={handeledata} required />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input type="number" name='mobile'  placeholder="9922######" value={user.mobile || ""} onChange={handeledata} required />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea rows="7" name='message'  placeholder="Write your message..." value={user.message || ""} onChange={handeledata} required />
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>

          <div className="info-item">
            <h4>Email</h4>
            <p>support@onlinestore.com</p>
          </div>

          <div className="info-item">
            <h4>Phone</h4>
            <p>+1 (234) 567-890</p>
          </div>

          <div className="info-item">
            <h4>Address</h4>
            <p>
             Major KG Pawar Rd, Khilarewadi, Erandwane, Pune, Maharashtra 411004
            </p>
          </div>

          <div className="socials">
            <button>Instagram</button>
            <button>Facebook</button>
            <button>Twitter</button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242185.92905025865!2d73.80858419277662!3d18.47663056696343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfc05e057847%3A0xae42d229214e05b8!2sUV%20Technocrats!5e0!3m2!1sen!2sin!4v1772249500931!5m2!1sen!2sin"
         loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">

          </iframe>
      </section>

      {/* Footer */}
      <footer className="contact-footer">
        © 2026 OnlineStore. All rights reserved.
      </footer>
      <Footer/>
    </div>
    </Pagewrapper>
  )
}

export default Contact
