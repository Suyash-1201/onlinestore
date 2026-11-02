import React, { useContext, useEffect, useState } from 'react'
import { getcart, gettotal, removeitem, updateqty } from './cartutils';
import '../css/cart.css'
import Pagewrapper from './Pagewrapper';
import Mycontext from '../Mycontext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import Api from '../Api';

const Cart = () => {
  const [items, setitems] = useState([]);
    const [prod, setprod] = useState([]);
    const [load,setload]=useState(false);
    const [user,setuser]=useState({})
    const navi=useNavigate();

    let num = Number(localStorage.getItem("number"));



    // get premium user
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

     async function fetchitems() {
            try {
                const res = await Api.get(`/user/getitems/${num}`)
                console.log(res.data)
                setitems(res.data)
                total()
            } catch (error) {
                console.log(error)
            }
        }

    useEffect(() => {
       
        fetchitems();

    }, [num])

    useEffect(() => {
        async function fetchprod() {
            try {
                const res = await axios.get('https://dummyjson.com/products')
                console.log(res.data)
                setprod(res.data.products);
            } catch (error) {
                console.log(error)
            }
        }

        fetchprod();
    }, [])

   

    

    // Delete item from cart
      async function handleDelete(itemid) {
        try {
            const res=await Api.delete(`/user/deleteitem/${itemid}`)
            console.log(res.data);
             fetchitems();

        } catch (error) {
            console.log(error)
        }
      }

       let filterprod = prod.filter(p =>
        items.some(i =>
            i.prodid == p.id
        )
    );

    // total ammount
    function total(){
      let gettotal=0;
      filterprod.forEach((p,index) => {
        gettotal= user.role === "premium" ? (gettotal+Math.ceil(p.price*30)-((Math.ceil(p.price*30)*Math.ceil(p.discountPercentage+40))/100))*items[index].stock :
        (gettotal+Math.ceil(p.price*30)-((Math.ceil(p.price*30)*Math.ceil(p.discountPercentage))/100))*items[index].stock
      });
      console.log(user.payfor)
      // if(user.payfor == "premiumuser"){
      //   gettotal=gettotal-(gettotal*40)/100
      // }
      localStorage.setItem("total",gettotal);
      return gettotal;
    }

    // increase stock
    async function increse(id) {
      try {
        const res=await Api.put(`/user/instock/${id}`)
         fetchitems();
      } catch (error) {
        console.log(error)
      }
    }

    // decrese stock
    async function decrease(id) {
       try {
        const res=await Api.put(`/user/decstock/${id}`)
         fetchitems();
      } catch (error) {
        console.log(error)
      }
    }
  

  return (
    <Pagewrapper>
      <div className='cart'>
        <div className='cart-h2'>
          <h2>My shopping cart({filterprod.length})</h2>
        </div>
        {/* empty cart */}
        <div className='empty'>
          {filterprod.length === 0 && <img src="./img/shopping-cart.png" alt="" className='empty-img' />}
          {filterprod.length === 0 && <p className='empty-p'>Your Shopping Cart Is Empty</p>}
        </div>

        {filterprod.map((item,index) => (
          <div key={item.id} className='cart-item' onLoad={()=>setload(true)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={load ? { opacity: 1, scale: 1 } : {}}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
               <img src={item.images[0]} alt="" />
            </motion.div>
            <div className='cart-name'>
              <h1 className='brand'>{item.brand}</h1>
              <p>{item.title}</p>
              <div className='cart-btn'>
                <button onClick={()=>decrease(items[index].itemid)} >-</button>

                <span>{items[index].stock}</span>

                <button onClick={()=>increse(items[index].itemid)} >+</button>
              </div>
              <div className='cart-price'>
                <p className='price'>&#8377;{ user.role === "premium" ? Math.ceil(Math.ceil(item.price*30)-((Math.ceil(item.price*30)*Math.ceil(item.discountPercentage+40))/100))*items[index].stock : Math.ceil(Math.ceil(item.price*30)-((Math.ceil(item.price*30)*Math.ceil(item.discountPercentage))/100))*items[index].stock}</p>
              </div>
              <div className='cart-remove'>
                <img src="./img/delete.png" alt="" onClick={() => handleDelete(items[index].itemid)} className='remove' />
              </div>
            </div>


          </div>
        ))}
        {/* free sentance */}
        <div className='free'>
          <h1 style={{ visibility: filterprod.length === 0 ? "hidden" : "visible" }}><img src="./img/delivery-truck.png" alt="" />you've earned free shipping</h1>
        </div>
        {/* return sentance */}
        <h1 className='return' style={{ visibility: filterprod.length === 0 ? "hidden" : "visible" }}>free returns on all qualifying orders.</h1>



        <div>
          <div className='total' style={{ visibility: filterprod.length === 0 ? "hidden" : "visible" }}>
            <h1>subtotal <span>&#8377;{total()}</span></h1>
            <h1>shipping costs <span>free</span></h1>
          </div>

          <div className='grand' style={{ visibility: filterprod.length === 0 ? "hidden" : "visible" }}>
            <h1>grand total <span>prices include gst</span></h1>
            <p>&#8377;{total()}</p>
          </div>
        </div>
        <div className='check-btn' style={{ visibility: filterprod.length === 0 ? "hidden" : "visible" }}>
          <button className='checkout' onClick={()=>navi('/order')}>checkout</button>
        </div>
      </div>
      <Footer/>
    </Pagewrapper>

  )
}

export default Cart
