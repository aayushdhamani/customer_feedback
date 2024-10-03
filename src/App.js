import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-center text-2xl">Customer Feedback System</h1>
        </header>
        
        <main className="p-6">
          <Routes>
            <Route path="/" element={<FeedbackForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<ProductDetails />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
