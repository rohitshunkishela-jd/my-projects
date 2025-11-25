import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebaseconfig';
 
const ProductList = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      // fetch products from firestore
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => doc.data());
      setProducts(productsList);
    }
    fetchProducts();
  }, []);
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure want to delete this product?")) return;
 
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
 
      // update UI after deletion
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };
 
  return (
    <div className='container'>
      <div className='card'>
        <div className='card-header'>
          <h1>Product List</h1>
        </div>
        <div className='card-body'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map((product, index) => <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.qty}</td>
                  <td>{product.price}</td>
                  <td>
                    <button className='btn btn-primary btn-sm me-2'>Edit</button>
                    <button className='btn btn-danger btn-sm'>Delete</button>
 
                  </td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
 
export default ProductList
 