import React, { useEffect, useState } from 'react'
import '../css/forgot.css'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer';
import axios from 'axios';
import Api from '../Api';
const Forgot = () => {
    const [user,setuser]=useState({});
    
    const navigate=useNavigate();

    async function fetchdata() {
        try {
            const res = await Api.get("/user/allusers");
            return res.data;
            
        } catch (error) {
            console.log(error);
            return [];
        }
    }


    useEffect(()=>{
        fetchdata();
    },[])

    const handel=(e)=>{

         const {name,value}=e.target;

         setuser(prev=>({
            ...prev,
            [name]:value
         }));

         console.log(user);
    }

   async function check(){

        let data= await fetchdata();
        console.log(data);
        let found=data.some (v=>
        v.number == user.number
        );

        console.log(found)

        if(found){
            try {
                const res=await Api.put("/user/updatepass",user)
                alert("Password updated")

                setuser({
                    uname:"",
                    pass:""
                })
                navigate("/signin")
            } catch (error) {
                console.log(error)
            }
        }


    }
  return (
    <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={ { opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5}}
          transition={{ duration: 0.3, ease: "easeOut" }}
    
        >
            <div className='sign-box'>
        <div className='forgot'>
     <h1>reset password</h1>
      <p>Please Enter Your Username For Verification </p>
      <input type="number" name='number' value={user.uname} placeholder='enter your number' onChange={(e)=>handel(e)}/>
      <input type="password" name='pass' value={user.pass} placeholder='enter new password' onChange={(e)=>handel(e)} />
      <button onClick={check}>submit</button>
        </div>
     
    </div>
    <Footer/>
        </motion.div>
    
  )
}


export default Forgot
