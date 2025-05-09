import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../../assets/Images/Newsletter.png'; // adjust the path as needed

const Newsletter = () => {
    const navigate = useNavigate();

    const handleShopNow = () => {
      navigate('/products');
    };
  return (
    <section
      className="py-16 bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-pink-200 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-200 rounded-full opacity-30 transform translate-x-1/4 translate-y-1/4 blur-2xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center  p-8 rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 px-4">
            Get Latest Updates By Subscribe Our Newsletter
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 px-4">
            
            
            <button onClick={handleShopNow}
              className="w-full sm:w-auto whitespace-nowrap px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
