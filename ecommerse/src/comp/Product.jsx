import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../css/product.css';
import { addtocart } from './cartutils';
import { motion } from 'framer-motion';
import { div, i } from 'framer-motion/client';
import Footer from './Footer';
import Mycontext from '../Mycontext';
import axios from 'axios';
import Api from '../Api';
const Product = () => {
   const {message,show,setcartcount,popuptext,setpopuptext,popup,setpopup}=useContext(Mycontext);
   let num=Number(localStorage.getItem("number"));
  const { id } = useParams();
  const [productdetail, setproductdetail] = useState({});
  const [number, setnumber] = useState(0);
  const [index,setindex]=useState(0);
  const [load, setload] = useState(false);
  const [toggle,settoggle]=useState('cart');
  const [showmore,setshowmore]=useState(false);
  const [showwarr,setshowwarr]=useState(false);
  const [reviewshow,setreviewshow]=useState(false);
  const [review,setreview]=useState([]);
  const [wishclick, setwishclick] = useState([]);

  
  

  useEffect(() => {
    const getdata = async () => {

      try {
        const data = await fetch(`https://dummyjson.com/products/${id}`)
        const result = await data.json();
        setproductdetail(result)
         setreview(result.reviews)
      }
      catch (error) {
        console.log("not fetched", error)
      }
    }
    getdata();
  }, [id])

  // wishlist 
   // wishlist 
  async function wishlistlogo(obj) {
    if(num == null){
     message("Please Login")
     show(!popup)
      navi("/signin")
      return;
    }

    try {
      const res=await Api.post("/user/addwish",obj)
      console.log(typeof res.data.prodid)
      if(res.data == ""){
        fetchwishitem();
        message("product remove")
        show(!popup)
      }
      else{
        fetchwishitem();
         message("product added")
        show(!popup)
      }
     
    } catch (error) {
      console.log(error)
    }
  }

  // fetch all wish items
  async function fetchwishitem() {
    try {
      const res=await Api.get("/user/getwishitems")
      setwishclick(res.data)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchwishitem()
  }, []);
  
  async function addtocart(cartprod) {
    try {
      const res=await Api.post("/user/saveitems",cartprod)
       message("Product added");
       show(!popup);
    } catch (error) {
      console.log(error)
    }
  }
   

  console.log(review)
  console.log(productdetail)
  return (
   
    <div>
      <div className="container">

        
         
      <div className='product-head'>
        <h1>product</h1>
        <h3>{productdetail.category}</h3>
      </div>
      
       <div className='all-box'>
        <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={load ? { opacity: 1, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.5}}
      transition={{ duration: 0.3, ease: "easeOut" }}

    >
          <div className='img-btns'>
            <button onClick={() => {
            if (number > 0) {
              setnumber(number - 1)
            }
          }} className='btn2'>&lt;</button>
          <img src={productdetail.images?.[number]} alt="sofa image" className='img' onLoad={() => { setload(true) }} />
          <button onClick={() => {
            if (number < productdetail.images.length - 1) {
              setnumber(number + 1)
            }
          }} className='btn1'>&gt;</button>
          </div>
           </motion.div>

          <div className='detail' style={{visibility:load?"visible":"hidden"}}>
          <h1>{productdetail.brand}</h1>
          <h2>{productdetail.title}</h2>
          <div className='prices'>
            <h4 className='prices-h4-1'>&#8377;{Math.ceil(productdetail.price * 30) - ((Math.ceil(productdetail.price * 30) *Math.ceil(productdetail.discountPercentage)) / 100)}</h4>
            <h4 className='prices-h4-2'>&#8377;{Math.ceil(productdetail.price * 30)}</h4>
            <p>{Math.ceil(productdetail.discountPercentage)}%</p>
          </div>

          <div className='addbutn'>
     
          <button className='addtocart'  style={{visibility:load?"visible":"hidden",backgroundColor:toggle==="cart"? "black":'rgb(249, 236, 212)',color:toggle==="cart"? "white":"black",boxShadow:toggle==="cart"?"0 0 10px black":"",transform:toggle==="cart"?"scale(1.1)":"scale(1)"}}
           onClick={() => {
            let obj1={
              number:num,
              prodid:productdetail.id,
              stock:1
            }
            addtocart(obj1)
            settoggle("cart")
          }}>Add to cart</button>

          <button className='add-wishlist'  style={{visibility:load?"visible":"hidden",backgroundColor:toggle==="wishlist"? "black":'rgb(249, 236, 212)',color:toggle==="wishlist"? "white":"black",boxShadow:toggle==="wishlist"?"0 0 10px black":"",transform:toggle==="wishlist"?"scale(1.1)":"scale(1)"}}
           onClick={()=>{
            let obj={
              number:num,
              prodid:productdetail.id
            }
            wishlistlogo(obj)
            settoggle("wishlist")
          }}>wishlist</button>
        </div>
        </div>

             
        
        </div>

        <div className='detail-box' style={{visibility:load?"visible":"hidden"}}>
          <div className='discription'>
            <h1 onClick={()=>{setshowmore(!showmore)}}>more information</h1>
            <div className='discri-box' style={{maxHeight:showmore? "170px":"0",opacity:showmore? "1":"0"}}>
              <h4><span>discription:</span>{productdetail.description}</h4>
            <h4><span>SKU:</span>{productdetail.sku}</h4>
            <h4 className='made'>made in INDIA</h4>
            </div>
            
          </div>

          <div className='warranty'>
            <h1 onClick={()=>{setshowwarr(!showwarr)}}>warranty</h1>
            <div className='warr-box' style={{maxHeight:showwarr? "100px":"0",opacity:showwarr? "1":"0"}}>
              <h4><span>returnPolicy:</span>{productdetail.returnPolicy}</h4>
              <h4><span>warranty:</span>{productdetail.warrantyInformation}</h4>
            </div>
          </div>

           <div className='review'>
            <h1 onClick={()=>setreviewshow(!reviewshow)}>user-reviews({review.length})</h1>
            <div className='reviews-box'>
            
              {
                <div className='review-cards' style={{maxHeight:reviewshow? "500px":"0",opacity:reviewshow? "1":"0"}}>
                  <div className='review-img'>
                    <button  onClick={() => {
            if (index > 0) {
              setindex(index- 1)
            }
          }}>&lt;</button>
                     <img src="../img/profile.png" alt="" />
                     <button onClick={() => {
            if (index <review.length-1) {
              setindex(index + 1)
            }
          }}>&gt;</button>
                  </div >
                  <h2>{review[index]?.reviewerName}</h2>
                   <p>{review[index]?.comment}</p>
                   <h3>;;</h3>
                </div>
              }
          </div>
           </div>
          
        </div>
        
      </div>
      <Footer/>
      </div>
      

  )
}

export default Product
