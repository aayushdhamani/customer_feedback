import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {toast} from 'react-hot-toast'

const FeedbackForm = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    productId: '',  
    rating: 0,
    comment: '',
    name:''
  });

  // Products with UUIDs as IDs
  const products = [
    
      { "id": "f7a34412-0281-4c5e-ae0b-9d163e4fa66e", "name": "Chair" },
      { "id": "a2b91b44-dc53-4cf9-812d-3731b1c0be8d", "name": "Table" },
      { "id": "c6a1e2f4-8fa9-45e4-8ba9-bae64725a7b5", "name": "Bed" },
      { "id": "0ab4d47f-89b9-4b39-8fb4-90f846f58d50", "name": "Almira" },
      { "id": "acbf2d88-9621-4c82-a826-5a4b4f5f5c8a", "name": "Sofa" },
      { "id": "cd1e0f56-4a95-482d-b5d9-74ebae5bff62", "name": "Pillow" }
    
    
  ];

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value; 
    
    setFormData({
      ...formData,
      productId: selectedProductId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  
      });

      if (response.ok) {
        toast.success('Feedback submitted successfully!');
        setFormData({
          productId: '', 
          rating: 0,
          comment: '',
          name:''
        })
      } else {
        toast.error('Error submitting feedback');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Product</label>
        <select
          value={formData.productId}
          onChange={handleProductChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Product</option>
          {products.map((product, i) => (
            <option key={i} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Rating</label>
        <input
          type="number"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          className="w-full p-2 border rounded"
          min="1"
          max="5"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Comments</label>
        <textarea
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
    </form>
   
   <button className="flex px-4 py-2 bg-gray-400 rounded-md mt-5 mx-auto " onClick={() => navigate('/products')}>
      See all products feedbacks
    </button>
    </>
  );
};

export default FeedbackForm;
