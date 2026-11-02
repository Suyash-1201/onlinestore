import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './comp/Nav'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './comp/Home'
import Fashion from './comp/Fashion'
import Furniture from './comp/Furniture'
import Product from './comp/product'
import Cart from './comp/Cart'
import { AnimatePresence } from 'framer-motion'
import Allproducts from './comp/Allproducts'
import Signup from './comp/Signup'
import Wishlist from './comp/Wishlist'
import Searchpage from './comp/Searchpage'
import Forgot from './comp/Forgot'
import Help from './comp/Help'
import Aboutus from './comp/Aboutus'
import Contact from './comp/Contact'
import Signin from './comp/Signin'
import Mycontext from './Mycontext'
import Sticky from './comp/Sticky'
import Otp from './comp/Otp'
import Checkout from './comp/Checkout'
import Premiumuser from './comp/Premiumuser'
import Premiumproducts from './comp/Premiumproducts'
import Protectedroute from './Protectedroute'
import Orderspage from './comp/Orderspage'
import Userroute from './Userroute'
import Adminpage from './comp/Adminpage'
import Adminotp from './comp/Adminotp'
import Adminsignup from './comp/Adminsignup'
import Adminroute from './Adminroute'

function App() {
  const [count, setCount] = useState(0)
  const location=useLocation();
  const {userclick,setuserclick,popup} =useContext(Mycontext);

  return (
    <div>
      <Nav/>
    <AnimatePresence mode='wait'>
    
      <Routes location={location} key={location.pathname}>
        
          <Route path='/' element={<Home/>}/>
        <Route path='/fashion' element={<Fashion/>}/>
        <Route path='/furniture' element={<Furniture/>}/>
        <Route path='/about' element={<Aboutus/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:id' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/allproducts' element={<Allproducts/>}/>
        <Route path='/search' element={<Searchpage/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/order' element={<Checkout/>}/>
        <Route path='/help' element={<Help/>}/>
        <Route path='/sticky' element={<Sticky/>}/>
         <Route path='/premium' element={<Premiumuser/>}/>
        <Route path='/orderpage' element={<Orderspage/>}/>
        <Route path='/premiumproducts' element={<Protectedroute><Premiumproducts/></Protectedroute>}/>
        

        <Route element={<Adminroute/>}>
        <Route path='/adminotp' element={<Adminotp/>}/>
         <Route path='/adminsignup' element={<Adminsignup/>}/>
        <Route path='/adminpage' element={<Adminpage/>}/>
        </Route>

         
        
         {/* public route */}
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
         <Route path='/forgot' element={<Forgot/>}/>
        <Route path='/otp' element={<Otp/>}/>
      </Routes>
      
    </AnimatePresence>

    {userclick && <div className='blur'>
      </div>}    
    </div>
  )
}

export default App
