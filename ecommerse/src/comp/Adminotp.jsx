import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Mycontext from '../Mycontext';
import '../css/otp.css';
import Api from '../Api';

const Adminotp = () => {
    const { message, show, popup } = useContext(Mycontext);
    const [otp, setotp] = useState({});
    const [apierr, setapierr] = useState("");
    
    const nav = useNavigate();

    // Cleans up global margins on both html and body when OTP mounts
    useEffect(() => {
        document.documentElement.classList.add('otp-html-override');
        document.body.classList.add('otp-body-override');
        return () => {
            document.documentElement.classList.remove('otp-html-override');
            document.body.classList.remove('otp-body-override');
        };
    }, []);

    function navi(value) {
        setTimeout(() => {
            nav(value);
        }, 1200);
    }

    async function verification() {
        try {
            const res = await Api.post("/user/verify/otpadmin", otp);
            console.log(res.data);
            if (res.status === 200) {
                message("OTP VERIFIED");
                show(!popup);
                navi("/signin");
            }
        } catch (error) {
            setapierr(error.response?.data?.message || "Verification failed");
        }
    }

    function manage(e) {
        const { name, value } = e.target;
        setotp({ [name]: value });
    }

  return (
    <div className="otp-container">
      <div className="otp-card">
        <div className="otp-header">
          <h2>Security Verification</h2>
          <p>Please enter the one-time password sent to your device.</p>
        </div>

        {apierr !== "" && (
          <div className="otp-error-banner">
            <p>{typeof apierr === 'string' ? apierr : apierr.data}</p>
          </div>
        )}

        <div className="otp-form-group">
          <input 
            type="text" 
            name="otp" 
            placeholder="Enter 4-Digit OTP" 
            maxLength="4"
            autoComplete="one-time-code"
            onChange={(e) => manage(e)}
            className="otp-input"
          />
          <button 
            onClick={() => verification()} 
            className="otp-submit-btn"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Adminotp;