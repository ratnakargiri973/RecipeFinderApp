import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';
import WishList from './components/WishList';
import Nav from './components/Nav';


function App() {
  const [wishListCount, setWishListCount] = useState("");
  return (
   <>
   <BrowserRouter>
   <Nav count={wishListCount}/>
       <Routes>
         <Route path='/' element={<Home handleCount={setWishListCount}/>}/>
         <Route path='/details/:id' element={<Details />}/>
         <Route path='/wishlist' element={<WishList handleCount={setWishListCount}/>}/>
       </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
