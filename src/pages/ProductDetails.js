import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 

const ProductDetails = () => {
  const { productId } = useParams(); 
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchFeedback = async (productId, page = 1, limit = 5) => {
        try {
          const response = await fetch(`http://localhost:5000/api/feedback/${productId}?page=${page}&limit=${limit}`);
          const data = await response.json();
          setProductData(data?.feedbacks);
          console.log(data?.feedbacks);
      
          if (data.success) {
            console.log('Feedback data:', data.feedbacks);
          } else {
            console.log('No feedback found');
          }
        } catch (error) {
          console.error('Error fetching feedback:', error);
        }
      };
      fetchFeedback(productId, 1, 5);
  }, [productId]);

  if (!productData) {
    return <p>Loading product data...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Product Details</h2>
      {productData.map((product, i) => (
  <div key={i} className="bg-white shadow-md rounded-lg p-6 mb-6">
    <p className="text-gray-900">Product ID: <span className="text-gray-900">{product.productId}</span></p>
    <p className="text-gray-700">Description: <span className="text-gray-900">{product.comment}</span></p>
    <p className="text-gray-700">Rating: <span className="text-yellow-500 font-semibold">{product.rating}</span></p>
  </div>
))}

    </div>
  );
};

export default ProductDetails;
