import React, { useEffect, useState } from 'react'
import Mycontext from './Mycontext';
import { useLocation } from 'react-router-dom';

const Myprovider = ({children}) => {
    const [userclick,setuserclick]=useState(false);
    const [cartcount,setcartcount]=useState(0);
    const [popuptext,setpopuptext]=useState("");
    const [popup,setpopup]=useState(false)
    const [wrong,setwrong]=useState(false)
    const [isnum,setisnum]=useState(false)
    const {pathname}=useLocation();

    function scrolltop(){
      window.scrollTo(0,0);
    }

    function message(value){
      setpopuptext(value)
    }

    function redshow(value){
      setwrong(value)
      setTimeout(() => {
        setwrong(false)
      }, 1000);
    }

    function show(value){
      setpopup(value)
      setTimeout(() => {
        setpopup(false)
      }, 1000);

    
    }
    const value={ redshow,setwrong,wrong, userclick,setuserclick,cartcount,isnum,setisnum,message,show,setcartcount,popuptext,setpopuptext,popup,setpopup,scrolltop};

  return (
    <div>
      <Mycontext.Provider value={value}>
        {children}
      </Mycontext.Provider>
    </div>
  )

}
export default Myprovider
