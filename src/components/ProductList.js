// ProductList.jsx
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { db } from "../firebaseconfig";
 
const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
 
      // IMPORTANT: include Firestore doc id
      const productsList = productsSnapshot.docs.map((docSnap) => ({
        id: docSnap.id, // Firestore document ID
        ...docSnap.data(),
      }));
 
      setProducts(productsList);
    };
 
    fetchProducts();
  }, []);
 
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
 
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };
 
  const editProduct = (id) => {
    // route must match your Route path
    navigate(`/edit/${id}`);
  };
 
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1>Product List</h1>
        </div>
        <div className="card-body">
          <table className="table table-striped">
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
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.qty}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => editProduct(product.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
 
export default ProductList;
 
 