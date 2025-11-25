import React, { useState } from 'react';

const CreateProduct = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(''); // use lower-case for consistency

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    // Basic validation (optional)
    if (!id || !name || !price || !quantity) {
      alert('Please fill all fields');
      return;
    }

    // Build payload
    const payload = {
      id,
      name,
      price: Number(price),      // convert to number if needed
      quantity: Number(quantity) // convert to number if needed
    };

    // TODO: call your API or state management action here
    console.log('Saving product:', payload);

    // Clear form (optional)
    setId('');
    setName('');
    setPrice('');
    setQuantity('');
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Create Product</h2>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">Product id</label>
              <input
                type="text"
                className="form-control"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Product name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">Product price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Product Quantity</label>
              <input
                type="number"
                id="quantity"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;