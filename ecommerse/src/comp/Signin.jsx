import React, { useContext, useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../css/signin.css'
import { motion } from 'framer-motion';
import axios from 'axios';
import Mycontext from '../Mycontext';
import Api from '../Api';
const Signin = () => {
        const [data, setdata] = useState({});
        const {redshow,setwrong,wrong,message,popup,show}=useContext(Mycontext);
    const nav = useNavigate();

    function navi(value){
        setTimeout(() => {
       nav(value)
      }, 1000);
    }

    // Cleans up global margins on both html and body when OTP mounts
        useEffect(() => {
            document.documentElement.classList.add('signin-html-override');
            document.body.classList.add('signin-body-override');
            return () => {
                document.documentElement.classList.remove('signin-html-override');
                document.body.classList.remove('signin-body-override');
            };
        }, []);

    async function postdata() {
        try {
            const res = await Api.post("/user/login",data,
                {
                    withCredentials:true
                }
            )
            message(res.data.message)
            show(!popup)
            console.log(res.data.token)
            console.log(res.data.number)
            localStorage.setItem("role",res.data.role);
            localStorage.setItem("number",res.data.number);
            if(res.data.role == "user" || res.data.role == "premium"){
                navi("/")
            }
            else{
                navi("/adminpage")
            }

        } catch (error) {
            console.log(error.response.data.message);
            message(error?.response.data.message)
            redshow(!wrong)
          
        }
    }

    

    // async function check(e) {
    //     e.preventDefault(); 
    //     const users = await fetchdata();

    //     console.log(users);

      
    //         const found = users.find(
    //             (u) => u.number == data.number && u.pass == data.pass
    //         );

    //         if (found) {
    //             localStorage.setItem("number",data.number);
    //             message("Login successful")
    //             show(!popup)
    //            navi("/")
    //         } else {
    //             message("User not found")
    //             show(!popup)
    //         }
        
    // }

    async function managedata(e) {
        const { value, name } = e.target;

        setdata(prev => ({
            ...prev,
            [name]: value
        }));
    }

  return (
     <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={ { opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5}}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  
            
                >
    <div className='sign-box'>
      <div className='sign-in'>
              <h1>sign in</h1>
              <input type="number" name='number' value={data.number} placeholder='enter number'  onChange={(e)=>managedata(e)} />
            <input type="password" name='pass' value={data.pass} placeholder='Enter password' onChange={(e)=>managedata(e)} />
            <Link className='link-forgot' to={'/forgot'}>forgot your password</Link>
            <Link className='link-singup' to={'/signup'}>Create account</Link>
            <button onClick={()=>postdata()}>sign in</button>
            </div>
    </div>
    
    </motion.div>
  )
}

export default Signin
