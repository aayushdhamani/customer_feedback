import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const ProductList = () => {
  const navigate = useNavigate(); 
  
  const products = [
    { "id": "f7a34412-0281-4c5e-ae0b-9d163e4fa66e", "name": "Chair" },
    { "id": "a2b91b44-dc53-4cf9-812d-3731b1c0be8d", "name": "Table" },
    { "id": "c6a1e2f4-8fa9-45e4-8ba9-bae64725a7b5", "name": "Bed" },
    { "id": "0ab4d47f-89b9-4b39-8fb4-90f846f58d50", "name": "Almira" },
    { "id": "acbf2d88-9621-4c82-a826-5a4b4f5f5c8a", "name": "Sofa" },
    { "id": "cd1e0f56-4a95-482d-b5d9-74ebae5bff62", "name": "Pillow" }
  ];

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); 
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Product List</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <li key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{product.name}</h3>
            <button
              className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md transition-colors"
              onClick={() => handleProductClick(product.id)}  
            >
              View feedback
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
