import React, { useContext, useEffect, useState } from 'react'
import '../css/wishlist.css'
import { addtocart } from './cartutils';
import Footer from './Footer';
import { div } from 'framer-motion/client';
import Mycontext from '../Mycontext';
import axios from 'axios';
import Api from '../Api';

const Wishlist = () => {
  const {message,show,setcartcount,popuptext,setpopuptext,popup,setpopup}=useContext(Mycontext);
  const [wishclick, setwishclick] = useState([]);
  const [wishdata, setwishdata] = useState([]);
  const [filldata, setfilldata] = useState([]);
  let num=Number(localStorage.getItem("number"));

   // fetch all wish items
  async function fetchwishitem() {
    try {
      const res=await Api.get(`/user/getwishitems/${num}`)
      setwishclick(res.data)
      console.log(res.data)
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
        setwishdata(result.products);
      }
      catch (error) {
        console.log("not fetched", error)
      }
    }
    data2();
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



  useEffect(() => {

    let fill = wishdata.filter(p =>
      wishclick.some(i=> i.prodid == p.id)
    )
    setfilldata(fill);
    console.log(wishclick)

  }, [wishclick, wishdata]);

  // remove item from wishlist
   async function remove(obj) {
    try {
      const res=await Api.delete("/user/removewish",{data:obj})
      fetchwishitem();
      message("product Delete")
      show(!popup)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
    <div className='wish'>
      <h1 className='head'>Wishlist({wishclick.length})</h1>
      <div className='empty-wish'>
        {wishclick.length === 0 && <img src="./img/heart.png" alt="" className='empty-img' />}
        {wishclick.length === 0 && <p className='empty-p'>Your Wishlist Is Empty</p>}
      </div>

      {filldata.map((item,index) => (
        <div className='wish-box'>
          <div className='wishlist'>
            <img src={item.images[0]} className='product-img' alt="" />
            <div className='content-2'>
              <h1>{item.brand}</h1>
              <h3>{item.title}</h3>
              <h2 className='wish-price'>&#8377;{Math.ceil(item.price * 30) - ((Math.ceil(item.price * 30) * item.discountPercentage) / 100)} <span id='price-span1'>MRP</span> <span id='price-span2'>&#8377;{Math.ceil(item.price * 30)}</span> <span id='price-span3'>{item.discountPercentage}%</span> </h2>
              <div className='del-addcart'>
                <img src="./img/delete.png" className='delete-img' alt="" onClick={() =>{
                  let obj={
                    number:num,
                    prodid:item.id
                  }
                  remove(obj)
                }} />
                <button onClick={() => {
                  let obj={
                    number:num,
                    prodid:item.id,
                    stock:1
                  }
                  console.log(obj)
                  addtocart(obj)
                }}>Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
    </div>
    <Footer/>
    </div>
    
  )
}

export default Wishlist
