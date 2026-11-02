import { useContext, useEffect, useEffectEvent, useState } from "react";
import axios from "axios";
import Mycontext from "../Mycontext";
import { useNavigate } from "react-router-dom";
import Api from "../Api";



const Premiumuser = () => {
    let num=Number(localStorage.getItem("number"));
  let total=localStorage.getItem("total");
  
  const [user,setuser]=useState({});
    const {redshow,setwrong,wrong,message,show,setcartcount,popuptext,setpopuptext,popup,setpopup,scrolltop}=useContext(Mycontext);

  
const nav=useNavigate();
  if(num == null){
message("User not logedin")
show(!popup)
    return nav("/signin")
  }

  useEffect(()=>{
    async function fetchdata() {
        try {
             const res=await Api.get(`/user/getwishitems/${num}`)
            setuser(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    fetchdata();
  },[])

  async function payNow() {
    try {
      // 1. Create order in Spring Boot
      const req = await axios.post(
        `${API}/createorder`,
        { amount: 1500 }
      );

      const order=req.data;

      // 2. Load Razorpay Checkout script
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src =
          "https://checkout.razorpay.com/v1/checkout.js";

        document.body.appendChild(script);

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }

      // 3. Configure Razorpay
      const options = {
        key: order.key,
        order_id: order.orderid,
        amount: order.amount,
        currency: order.currency,

        handler: async function (response) {
          // 4. Send payment details to Spring Boot
          try {
            const result = await Api.post(
              "/user/verify/payment",
              {
                number:num,
                razorpayorderid:
                  response.razorpay_order_id,

                razorpaypaymentid:
                  response.razorpay_payment_id,

                razorpaysignature:
                  response.razorpay_signature,
                  role:"premium",
                  payfor:"premiumuser"
              }
            );

            message("Payment verification successful!");
            show(!popup)
            nav("/")
          } catch (error) {
            message("Payment verification failed!");
            redshow(!wrong)
          }
        }
      };

      // 5. Open payment window
      const checkout = new window.Razorpay(options);
      checkout.open();

    } catch (error) {
      message("Unable to start payment.");
      redshow(!wrong)
    }
  }
  return (
    <div>
      <h2>Premium Suscription</h2>

      <input
        type="number"
        value={1500}
      />

      <button onClick={payNow}>
        Pay Now
      </button>

      
    </div>
  )
}

export default Premiumuser
