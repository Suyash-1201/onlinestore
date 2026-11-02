import React, { useContext, useEffect, useRef, useState,useMemo } from 'react'
import '../css/fashion.css'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { addtocart, getcart } from './cartutils';
import { motion } from 'framer-motion';
import Footer from './Footer';
import Mycontext from '../Mycontext';
import axios from 'axios';
import { object } from 'framer-motion/m';
import Api from '../Api';

const Furniture = () => {
  let num = Number(localStorage.getItem("number"));
  const [prod, setprod] = useState("");
  const [og, setog] = useState([]);
  const [search] = useSearchParams();
  const [load, setload] = useState(false);
  const [backbtn, setbackbtn] = useState(false);
  const {wrong,redshow,setwrong,message,show,setcartcount,popuptext,setpopuptext,popup,setpopup,scrolltop}=useContext(Mycontext);
  const loadref=useRef(0);
  const imageref=useRef(0);
  const [imgnavi,setimgnavi]=useState(false);

    const location=useLocation();
 
  const [wishclick, setwishclick] = useState([]);
  let category = search.get("category")

  const nav = useNavigate();

  function navi(click) {
    nav(click)

  }



  // wishlist 
  async function wishlistlogo(obj) {
    if(num == null){
      alert("please login")
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
      message("login reqired")
      redshow(!wrong)
    }
  }

  // fetch all wish items
  async function fetchwishitem() {
    try {
      const res=await Api.get(`/user/getwishitems/${num}`)
      setwishclick(res.data)
      
    } catch (error) {
      console.log(error)
     
    }
  }

  

  useEffect(() => {
    fetchwishitem()
  }, []);



  
  useEffect(() => {
    const data2 = async () => {
            try {
                const data = await fetch(`https://dummyjson.com/products`)
                const result = await data.json();
                setog(result.products);
            }
            catch (error) {
                console.log("not fetched", error)
            }
        }
        data2();
  }, [])

  // useEffect(() => {
    
  // }, [category, og])

  let f =useMemo(()=>{
    
      let data= (og || []).filter(p =>
        p.category === category
      )
    

    if(prod==="high"){
      return [...data].sort((a,b)=>b.price-a.price)
      
    }

    if(prod==="low"){
       return [...data].sort((a,b)=>a.price-b.price)
      
    }

    return data;
  },[category, og,prod]);

  console.log(f);
  console.log(prod);
  


  function filterdata(s){
    const value=s.target.value;
    setprod(value)
    
  }


  useEffect(()=>{
    loadref.current=0;
    setload(false);
    
  },[location.pathname])
  
  const handel=()=>{
   if(loadref.current<f.length){
            loadref.current += 1;
        }

    if(loadref.current===f.length){
      setload(true);
      imageref.current.style.display ="none";
      loadref.current.style.visibility ="visible"
    }
    
  };

  // add product to cart
  async function addtocart(cartprod) {
    try {
      const res=await Api.post("/user/saveitems",cartprod)
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
      message("login reqired")
      redshow(!wrong)
    }
  }

  

  useEffect(()=>{
    document.body.style.overflow=load?"auto":"hidden"

  },[loadref.current])

 

  return (
    
    
        <div>
         {loadref.current!==f.length&&(
            <div >
            <h1 className='not-load' ref={imageref}>onlinestore</h1>
            
          </div>
        )}
          
          <motion.div
      initial={{ opacity: 0, x: -1530 }}
      animate={load ? { opacity: 1, x: 0 } : {}}
      exit={imgnavi?{ opacity:0,scale:0.5 }:{ opacity: 0, x: 1530 }}
      transition={{ duration: 0.4, ease: "easeOut" }}

    >
       <div className='upper' >
            <h1>PRODUCT</h1>
            <h3>{category}</h3>
            <button className='premium-btn'  onClick={()=>nav("/premiumproducts")} >PREMIUM</button>
          </div>
        <div className='fashion-page' ref={loadref}>
          

           <img src="./img/left-arrow.png" alt="" className='fashion-back-btn' onClick={() => { setbackbtn(!backbtn), navi("/") }} />
           
           <select name="" onChange={filterdata} className='filter-box'>
            <option value="">Filter</option>
            <option value="high">High To Low</option>
            <option value="low">Low To High</option>
           </select>
          <div className='all-fashion'>
            
            <div className="div">
              {f.map((p,index) => (
                <div className='box'>
                  <div className='img-wrapper'>
                    <div className='dis-cat'>
                      <p className='dis'>{Math.ceil(p.discountPercentage)}%<span>OFF</span></p>
                      <h2 className='cat'>{p.category}</h2>
                      <span><img key={p.id} className='box-heart' onClick={() => {
                        let obj={
                          number:num,
                          prodid:p.id
                        }
                        wishlistlogo(obj);
          
                       
                      }} src={wishclick.some(item=> item.prodid == p.id) ? "./img/heart-1.png" : "./img/heart.png"} alt="" /></span>
                    </div>
                    <img src={p.images[0]} alt={p.title} className="img" onClick={() => {
                      scrolltop,navi(`/product/${p.id}`, setimgnavi(!imgnavi))
                    }} onLoad={handel} onError={handel}/>
                  </div>

                  <h1>{p.brand}</h1>
                  <div className='content'>
                    <h3>{p.title}</h3>
                    <h1>&#8377;{Math.ceil(p.price*30)-((Math.ceil(p.price*30)*Math.ceil(p.discountPercentage))/100)}</h1>
                  </div>
                  <div className='cart-btn'>

                    <button className='addcart1' onClick={() => {
                      let cartprod={
                        number:num,
                        prodid:p.id,
                        stock:1
                      }

                      addtocart(cartprod)
                    }}>Add to cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        
        </div>
        <Footer/>
        </motion.div>

      </div>
    


  )
}

export default Furniture

