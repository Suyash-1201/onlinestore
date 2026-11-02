import React, { useContext, useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import Mycontext from '../Mycontext'
import "../css/home.css"
import { useNavigate } from 'react-router-dom'
import Pagewrapper from './Pagewrapper'
import Footer from './Footer'

const Home = () => {
  const[product,setproduct]=useState([])
  const{userclick,setuserclick}=useContext(Mycontext);

  

  const arr=["../img/vegies.jpg","../img/groc.jpeg"];

  const [src,setsrc]=useState(0);
  const [found,setfound]=useState(false);
  const [found2,setfound2]=useState(false);
  const ref1=useRef();
  const ref2=useRef();
  const navigate=useNavigate();
  function navi(click) {
    navigate(click)
  }

  useEffect(()=>{
    fetch("https://dummyjson.com/products")
    .then((res)=>res.json())
    .then((data)=>setproduct(data.products))
    .catch((err)=>console.log(err))
  },[])



  useEffect(()=>{
      const inter= setInterval(()=>{
       setsrc((prev)=>
      prev===arr.length-1?0:prev+1
      );
      },2000)

      return()=>
        clearInterval(inter);
      

  },[arr]);



  useEffect(()=>{

    const onscroll=()=>{
      if(!ref1.current) return;

      const rect=ref1.current.getBoundingClientRect();
      const rect2=ref2.current.getBoundingClientRect();

      if(rect.top < window.innerHeight*0.7){
        setfound(true)
      }
      else{
        setfound(false)
      }

      if(rect2.top < window.innerHeight*0.7){
        setfound2(true)
      }
      else{
        setfound2(false)
      }
    };

    window.addEventListener("scroll",onscroll);

    return ()=> 
      window.removeEventListener("scroll",onscroll);
  },[]);
  
  return (
    <Pagewrapper>
       {/* first image */}
    <div className='home' style={{filter: userclick ? "blur(3px)" : "blur(0px)"}}>
      
      <div className='h1-home' style={{background:`url(${arr[src]})`}}>
        <div className='all-h1'>
          <h1>end the <span style={{display:"flex",flexDirection:"column"}}>year with</span></h1>
        <h2><span className='span3'>+extra</span>5<span className='span1'>%</span><span className='span2'>off</span></h2>
        </div>

        <div className='all-h2'>
        <h1>countdown begins</h1>
        <p>Auto-applied at checkout | Ends 31 Dec</p>
        <button onClick={()=>navi('/allproducts')}>Shop now</button>
      </div>
      </div>
      {/* second */}
      <div className='h1-3'>Best Experience With <span>The ONLINE STORE</span></div>

      
        <div className='first' >
          {/* <img src="../img/home-fur.avif" alt="" /> */}
        <div className='first-all'>
          <h1>furniture</h1>
          <p>strong | wood | handmade</p>
        <button onClick={()=>{
          navi(`/furniture?category=furniture`)
        }}>shop now</button>
        </div>
        </div >
        <div className='second1'>
         <div className='second-all'>
           <h1 >beauty</h1>
           <p>dark | shades | charm</p>
          <button onClick={()=>{
          navi(`/fashion?category=beauty`)
        }}>shop now</button>
         </div>
          {/* <img src="../img/home-beauty-2.webp" alt="" /> */}
           
        </div>
      

      {/* third */}
      <div className='third'>
        <div className='third-all'>
          <h1>fragrance</h1>
        <p>Vibe | fresh | party</p>
        <button onClick={()=>{
          navi(`/fashion?category=fragrances`)
        }}>shop now</button>
        </div>
      </div>

      {/* fourth */}
      <div  className='fourth'>
        <div className='fourth-all'>
          <h1 >groceries</h1>
        <p>healthy | fresh | green</p>
        <button onClick={()=>{
          navi(`/fashion?category=groceries`)
        }}>shop now</button>
        </div>
      </div>

     
    </div>
    <Footer/>
    </Pagewrapper>
   
  )
}

export default Home
