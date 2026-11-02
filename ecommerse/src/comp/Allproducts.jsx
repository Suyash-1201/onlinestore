import React, { useContext, useEffect, useRef, useState } from 'react'
import '../css/fashion.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { addtocart } from './cartutils';
import { motion } from 'framer-motion';
import Footer from './Footer';
import Mycontext from '../Mycontext';
import axios from 'axios';
import Api from '../Api';

const Allproducts = () => {
     let num = Number(localStorage.getItem("number"));
    const [prod, setprod] = useState([]);
    const [load, setload] = useState(false);
    const [backbtn, setbackbtn] = useState(false);
    const { message, show, setcartcount, popuptext, setpopuptext, popup, setpopup } = useContext(Mycontext);
    const loadref = useRef(0);
    const imageref = useRef(0);
    const [wishclick, setwishclick] = useState([]);


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
        fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((data) => {
                setprod(data.products);
            })
            .catch((e) => console.log("error", e))

    }, [])



    const handel = () => {
        if (loadref.current < prod.length) {
            loadref.current += 1;
        }


        if (loadref.current === prod.length) {
            setload(true);
            imageref.current.style.display = "none";
            loadref.current.style.visibility = "visible"
        }
    };

    // add product to cart
    async function addtocart(cartprod) {
        try {
            const res = await Api.post("/user/saveitems", cartprod)
            message("Product added");
            show(!popup);
        } catch (error) {
            console.log(error)
        }
    }

    function filterdata(s) {
        const value = s.target.value;

        if (value === "high") {
            const sorted = [...prod].sort((a, b) => b.price - a.price)
            setprod(sorted)
        }

        if (value === "low") {
            const sorted = [...prod].sort((a, b) => a.price - b.price)
            setprod(sorted)
        }
    }

    const location = useLocation();
    useEffect(() => {
        loadref.current = 0;
        setload(false);
        console.log(location.pathname)
    }, [location.pathname])

    useEffect(() => {
        document.body.style.overflow = load ? "auto" : "hidden"
        console.log(loadref.current)
    }, [loadref.current])

    return (
        <div>
            {loadref.current !== prod.length && (
                <div >
                    <h1 className='not-load' ref={imageref}>onlinestore</h1>

                </div>)}
            <motion.div
                initial={{ opacity: 0, x: -1530 }}
                animate={load ? { opacity: 1, x: 0 } : {}}
                exit={{ opacity: 0, x: 1530 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >



                <div>
                    <div className='fashion-page' ref={loadref}>
                        <div className='upper' >
                            <h1> ALL PRODUCTS</h1>

                        </div>

                        <img src="./img/left-arrow.png" alt="" className='fashion-back-btn' onClick={() => { setbackbtn(!backbtn), navi("/") }} />
                        <select name="" onChange={filterdata} className='filter-box'>
                            <option value="">Filter</option>
                            <option value="high">High To Low</option>
                            <option value="low">Low To High</option>
                        </select>
                        <div className='all-fashion'>

                            <div className="div">
                                {prod.map((p, index) => (
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
                                                    wishlistlogo(obj)
                                                }} src={wishclick.some(item=>item.prodid == p.id) ? "./img/heart-1.png" : "./img/heart.png"} alt="" /></span>
                                            </div>
                                            <img src={p.images[0]} alt={p.title} className="img" onClick={() => {
                                                navi(`/product/${p.id}`)
                                            }} onLoad={handel} onError={handel} />
                                        </div>

                                        <h1>{p.brand}</h1>
                                        <div className='content'>
                                            <h3>{p.title}</h3>
                                            <h1>&#8377;{Math.ceil(p.price * 30) - ((Math.ceil(p.price * 30) * Math.ceil(p.discountPercentage)) / 100)}</h1>
                                        </div>
                                        <div className='cart-btn'>

                                            <button className='addcart1' onClick={() => {
                                                let cartprod = {
                                                    number: num,
                                                    prodid: p.id,
                                                    stock: 1
                                                }

                                                addtocart(cartprod)
                                            }}>Add to cart</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {console.log(load)}
                    </div>
                </div>
                <Footer />
            </motion.div>
        </div>
    )
}

export default Allproducts
