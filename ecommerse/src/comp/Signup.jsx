import React, { useContext, useEffect, useState } from 'react'
import '../css/signup.css'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer';
import axios from 'axios';
import { p } from 'framer-motion/client';
import Mycontext from '../Mycontext';
import Api from '../Api';

const Signup = () => {
    
    const [data, setdata] = useState({});
    const[msg,setmsg]=useState({});
    const [focus,setfocus]=useState(false);
    const nav = useNavigate();
    const {message,show,popup}=useContext(Mycontext);

    function navi(value){
        setTimeout(() => {
       nav(value)
      }, 1000);
    }

     // Cleans up global margins on both html and body when OTP mounts
        useEffect(() => {
            document.documentElement.classList.add('signup-html-override');
            document.body.classList.add('signup-body-override');
            return () => {
                document.documentElement.classList.remove('signup-html-override');
                document.body.classList.remove('signup-body-override');
            };
        }, []);
    

    async function submitdata(e) {
        e.preventDefault(); // Prevents default form submission behavior
        
        try {
            const res = await Api.post("/user/tempsaveuser", data);

            message("Otp Send")
            show(!popup)
            setdata({
                uname: "",
                number: "",
                pass: "",
                role:""
            });
             navi("/otp")
             
        } catch (error) {
          if(error.response.status == 409){
            message(error.response.data.message)
            show(!popup)
          }
            setmsg(error.response.data)
        }
    }

    async function managedata(e) {
        const { value, name } = e.target;

        setdata(prev => ({
            ...prev,
            [name]: value,
            role:"user"
        }));
    }

    
    
    
  return (
    <div>
     <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={ { opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5}}
              transition={{ duration: 0.3, ease: "easeOut" }}
              
        
            >
              <div className='sign-box'>

      

      

      <div className='sign-up'>
        <h1>Create Account</h1>
        <input type="text" name='uname' placeholder='enter username' value={data.uname} onFocus={()=>setmsg({})} onChange={(e)=>managedata(e)} />
        {msg.uname != "" && <p className='res-err'>{msg.uname}</p>}
      <input type="number" name='number' placeholder='Enter number' value={data.number} onFocus={()=>setmsg({})}  onChange={(e)=>managedata(e)} />
      { msg.number != "" && <p className='res-err'>{msg.number}</p>}
      <input type="password" name='pass' placeholder='Enter password' value={data.pass} onFocus={()=>setmsg({})}  onChange={(e)=>managedata(e)} />
      { msg.pass != "" && <p className='res-err'>{msg.pass}</p>}
      <Link to={'/signin'} >You have already account?Sign in</Link>
      <button  onClick={(e)=>{submitdata(e)}} >sign up</button>
      </div>
    </div>
    
            </motion.div>
            </div>
    
  )
}

export default Signup
