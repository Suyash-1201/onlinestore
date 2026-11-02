import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Mycontext from "./Mycontext";
import Api from "./Api";

function Protectedroute({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const { message, show, popup } = useContext(Mycontext);

  useEffect(() => {
    async function verifyUser() {
      try {
        const res = await Api.get("/user/verify/premium", {
          withCredentials: true 
        });

        if (res.status === 200) {
          message("Authorized User");
          show(!popup);
          setAuthorized(true);
        }
      } catch (error) {
        message("Unauthorized User");
        show(!popup);
        setAuthorized(false);
      } finally {
        setLoading(false); 
      }
    }

    verifyUser();
  }, []);

  
  if (loading) {
    return <p>Checking user authorization...</p>;
  }

  
  if (!authorized) {
    return <Navigate to="/signin" replace />;
  }

 
  return children;
}

export default Protectedroute;