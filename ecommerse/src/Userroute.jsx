import axios from 'axios';
import { number } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Api from './Api';

const Userroute = () => {
     const num=Number(localStorage.getItem("number"));
    const [user,setuser]=useState({});
    const [loading,setloading]=useState(true)
    const [auth,setauth]=useState(false)

    useEffect(()=>{

        if(!num){
            setloading(false)
            return;
        }

        async function fetchdata() {
            try {
            const res= await Api.get(`/user/getuser/${num}`,
                {
                    withCredentials:true
                }
            )
            setuser(res.data)
            console.log(res.data)
            if(res.data.role==="user" || res.data.role==="premium"){
                setauth(true)
                setloading(false)
            }

        } catch (error) {
            console.log(error)
            setauth(false)
            setloading(false)
        }


        }

        fetchdata();
        
    },[num])

    if(loading){
        return <p>Checking User Authorizarion Only User's can access this page</p>
    }

    if(!num || !auth){
        return <Navigate to="/signin" replace />
    }

    return <Outlet/>
}
export default Userroute
