import React from 'react'
import '../css/about.css'
import { useNavigate } from 'react-router-dom'
import Pagewrapper from './Pagewrapper';
import Footer from './Footer';
const Aboutus = () => {

    const navigate=useNavigate();
    function navi(value){
        navigate(value)
    }
  return (
    <Pagewrapper>
     <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay">
          <h1>About Onlinestore</h1>
          <p>Redefining Premium Online Shopping</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-section">
        <div className="container">
          <h2>Our Story</h2>
          <p>
            Onlinestore was built with a single vision — to create a seamless,
            premium shopping experience for modern customers. We focus on
            quality over quantity, delivering carefully curated products that
            combine style, reliability, and performance.
          </p>
          <p>
            Every product reflects our commitment to excellence. We don’t just
            sell items — we deliver confidence, convenience, and everyday
            luxury.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-dark-section">
        <div className="container">
          <h2 className="light-heading">Why Choose Us</h2>

          <div className="about-grid">
            <div className="about-card">
              <h3>Curated Excellence</h3>
              <p>Premium, hand-selected products with uncompromised quality.</p>
            </div>

            <div className="about-card">
              <h3>Customer First</h3>
              <p>Secure checkout, fast delivery, and dedicated support.</p>
            </div>

            <div className="about-card">
              <h3>Reliable Service</h3>
              <p>Hassle-free returns and a smooth shopping experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="about-section center">
        <div className="container small">
          <h2>Our Commitment</h2>
          <p>
            At Onlinestore, trust is everything. We are committed to
            transparency, secure transactions, and continuous improvement. Our
            mission is to build long-term relationships by consistently
            exceeding expectations.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Experience Premium Shopping Today</h2>
        <button className="about-btn" onClick={()=>navi('/allproducts')} >Shop Now</button>
      </section>
      <Footer/>
    </div>
    </Pagewrapper>
  )
}

export default Aboutus
