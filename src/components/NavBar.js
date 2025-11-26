import React from 'react'
import CreateProduct from './CreateProduct'
import ProductList from './ProductList'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import UpdateProduct from './UpdateProduct'

const NavBar = () => {
  return (
    <div className='container'>
        <BrowserRouter>
        <ul>
            <li><Link to="/create">CreateProduct</Link></li>
            <li><Link to="/list">ProductList</Link></li>
        </ul>
         <Routes>
            <Route path="/create" element={<CreateProduct/>}/>
            <Route path="/list" element={<ProductList/>}/>
            <Route path='edit/:id'element={<UpdateProduct/>}/>
         </Routes>

        </BrowserRouter>
      
    </div>
  )
}

export default NavBar
