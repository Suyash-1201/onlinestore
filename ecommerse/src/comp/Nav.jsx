import React, { useContext, useEffect, useRef, useState } from 'react'
import '../css/nav.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Mycontext from '../Mycontext'
import { getcart } from './cartutils'
import { motion, number } from 'framer-motion';
import axios from 'axios'
import { style, tr } from 'framer-motion/m'
import Api from '../Api'
const Nav = () => {
  const {redshow,setwrong,wrong, userclick, setuserclick,popuptext,isnum,setisnum,setpopuptext,popup,setpopup } = useContext(Mycontext);
  const [click, setclick] = useState(false);
  const [user, setuser] = useState(false);
  const [showscroll,setshowscroll]=useState(0);
  const [scroll,setscroll]=useState(true);
  const [item,setitem]=useState({});
  let num=Number(localStorage.getItem("number"));

  

  // checking thr number is present or not in localstorage
  function checknumber(){
     if(num){
    setisnum(!isnum)
  }
  }
  useEffect(()=>{
   checknumber()
  },[num])

  useEffect(()=>{
   num= Number(localStorage.getItem("number"))
  },[])

  // remove localstorage logged number
  function logout(){
    localStorage.removeItem("number")
    checknumber();
  }

  //when page navigate then go to top of page
  const location=useLocation();

  useEffect(()=>{
    window.scrollTo(0,0)
  },[location.pathname]);

  const navigate = useNavigate();
  function navi(click) {
    navigate(click)
  }

  // get user using user number
  async function fetchitems() {
            try {
                const res = await Api.get(`/user/getuser/${num}`)
                console.log(res.data)
                setitem(res.data)
            } catch (error) {
                console.log(error)
            }
        }
  useEffect(()=>{
        fetchitems();
  },[num])

  useEffect(()=>{
       fetchitems();
  },[])





  const items = ["wellcome to online store", "get extra 5% off on online payments", "1-day fastest delivery"]
  const usediv = useRef();
  useEffect(() => {
    const children = usediv.current.children;
    const visibletime = 2000;
    const gap = 200;
    for (let i = 0; i < children.length; i++) {
      const total = (visibletime + gap) * children.length;
      children[i].style.animation = `fade ${total}ms ease-in-out infinite`
      children[i].style.animationDelay = `${i * (visibletime + gap)}ms`
    }

  }, [])

  

  const scrollvalue=()=>{

    if(window.scrollY>showscroll){
      setscroll(false)
    }
    else{
      setscroll(true)
    }

    setshowscroll(window.scrollY)
  };

  useEffect(()=>{
    window.addEventListener("scroll",scrollvalue);

    return()=>{
      window.removeEventListener('scroll',scrollvalue);
    }
  },[showscroll])

  return (
    <div className='main'>
      <div ref={usediv} className='banners'>
        {items.map((para, i) => (
          <p key={i} className='p' style={{ filter: userclick ? "blur(3px)" : "blur(0px)" }}>{para}</p>
        ))}
      </div>
      <div className='online-store'>
         <h1 className='h1' style={{ filter: userclick ? "blur(3px)" : "blur(0px)" }}>online <span>store</span></h1>

         {/* user logo */}
        <div className='user-cart-logo'>
          <img className='user-logo' src="../img/user.png" style={{ filter: userclick ? "blur(3px)" : "blur(0px)" }} alt=""
            onClick={() => {
              setuser(true,)
              setuserclick(true)
            }} />

          <img src="../img/search.png" className='search-img' alt="" onClick={() => navi('/search')} />

          <img src="../img/shopping-cart.png" alt="" className='cart-img' onClick={() => { navi('/cart') }} />
        </div>
      </div>
      <div className='nav'>
        <div className='links' style={{ filter: userclick ? "blur(3px)" : "blur(0px)" }}>
          <button onClick={() => { navi('/') }}>home</button>
          <button onClick={() => { navi(`/fashion?category=beauty`) }}>Beauty</button>
          <button onClick={() => { navi(`/furniture?category=furniture`) }}>furniture</button>
          <button onClick={() => { navi('/about') }}>about us</button>
          <button onClick={()=>{navi('/contact')}}>contact</button>
        </div>

        

        <div className='acc' style={{ transform: user ? "translateY(0)" : "translateY(-950px)" }}>
          <button className='back-btnn' onClick={() => {
            setuser(false),
              setuserclick(false)
          }}>&times;</button>
          <h1 className='acc-h1'>hello, {item.uname}</h1>
          <button className='sign' style={{display: isnum ? 'none':'block'}} onClick={() => navi('/signup')(setuserclick(false), setuser(false))}>signin or register</button>
          <button className='sign' style={{display: isnum ? 'block':'none'}} onClick={() =>(setuserclick(false), setuser(false),logout())}>logout</button>
          <div className='btn-1' onClick={() => navi('/orderpage')(setuserclick(false), setuser(false))}>
            <div className='left'>
              <img src="../img/order.png" style={{ width: "clamp(10px,5vw,25px)", height: "clamp(10px,5vw,25px)" }} alt="h" />
              <button>Orders</button>
            </div>
            <span className='arrow'>&gt;</span>
          </div>
          <div className='btn-2' onClick={() => navi('/wishlist')(setuserclick(false), setuser(false))}>
            <div className='left'>
              <img src="../img/heart.png" style={{ width: "clamp(8px,4vw,20px)", height: "clamp(8px,4vw,20px)" }} alt="h" />
              <button>Wishlist</button>
            </div>
            <span className='arrow'>&gt;</span>
          </div>
          <div className='btn-3' onClick={()=> navi('/help')(setuserclick(false), setuser(false))}>
            <div className='left'>
              <img src="../img/support.png" style={{ width: "clamp(8px,4vw,20px)", height: "clamp(8px,4vw,20px)" }} alt="h" />
              <button>Help</button>
            </div>
            <span className='arrow'>&gt;</span>
          </div>
        </div>
      </div>

      <div className='popup-div' style={{position:"relative"}}>
        <div className='success-popup' style={{transform: popup ? "translateY(0)" : "translateY(-100px)"}}>
        <h1><img src="../img/right.png" alt="" /> {popuptext}</h1>
      </div>
      </div>
      <div className='popup-div' style={{position:"relative"}}>
        <div className='success-popup' style={{transform: wrong ? "translateY(0)" : "translateY(-100px)"}}>
        <h1><img src="../img/wrong-cross.png" alt="" /> {popuptext}</h1>
      </div>
      </div>
      
     

      <div className='menu-link' style={{position:'fixed', bottom:scroll?"0":"-220px"}}>
        <div>
          <img src="./img/home.png" alt="" onClick={() => { navi('/') }} />
          <button onClick={() => { navi('/') }}>home</button>
        </div>

        <div>
          <img src="./img/cosmetics.png" alt="" onClick={() => { navi(`/furniture?category=beauty`) }} />
          <button onClick={() => { navi(`/fashion?category=beauty`) }}>Beauty</button>
        </div>

        <div>
          <img src="./img/furnitures.png" alt="" onClick={() => { navi(`/furniture?category=furniture`) }} />
          <button onClick={() => { navi(`/furniture?category=furniture`) }}>furniture</button>
        </div>

        <div>
          <img src="./img/group.png" alt="" onClick={() => { navi('/about') }} />
          <button onClick={() => { navi('/about') }}>about us</button>
        </div>

        <div>
          <img src="./img/customer-service.png" alt="" onClick={()=>{navi('/contact')}} />
          <button onClick={()=>{navi('/contact')}}>contact</button>
        </div>
      </div>

    </div>
  )


}

export default Nav
