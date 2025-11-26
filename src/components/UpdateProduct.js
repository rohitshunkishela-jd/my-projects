import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig';

const UpdateProduct = () => {
  const { id } = useParams();          // Firestore document ID
  const navigate = useNavigate();

  const [pid, setPid] = useState("");   // product id field from form
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const data = productSnap.data();
        setPid(data.id);
        setName(data.name);
        setQty(data.qty.toString());
        setPrice(data.price.toString());
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productRef = doc(db, "products", id);

    await updateDoc(productRef, {
      id: pid,       // update custom id
      name,
      qty: Number(qty),
      price: Number(price)
    });

    alert("Product Updated Successfully!");
    navigate("/products");
  };

  if (loading) return <h3 className="text-center mt-3">Loading...</h3>;

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-header">
          <h2>Update Product</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <label>Product Id</label>
            <input className="form-control" value={pid} onChange={(e)=>setPid(e.target.value)} />

            <label>Product Name</label>
            <input className="form-control" value={name} onChange={(e)=>setName(e.target.value)} />

            <label>Quantity</label>
            <input className="form-control" type="number" value={qty} onChange={(e)=>setQty(e.target.value)} />

            <label>Price</label>
            <input className="form-control" type="number" value={price} onChange={(e)=>setPrice(e.target.value)} />

            <button type="submit" className="btn btn-success mt-3">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
