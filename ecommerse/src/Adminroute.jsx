import axios from 'axios';
import { number } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Api from './Api';

const Adminroute = () => {
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
            const res= await  Api.get(`/user/getadmin/${num}`,
                {
                    withCredentials:true
                }
            )
            setuser(res.data)
            console.log(res.data.data)
            if(res.data.data.role==="admin"){
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
        return <p>Checking Admin Authorizarion</p>
    }

    if(!num || !auth){
        return <Navigate to="/signin" replace />
    }

    return <Outlet/>
}

export default Adminroute