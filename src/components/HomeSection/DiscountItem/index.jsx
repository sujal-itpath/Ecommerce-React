import React from "react";
import chairImage from "../../../assets/Images/chair.png"; // Replace with your image path
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
    "Material expose like metals",
    "Clear lines and geometric figures",
    "Simple neutral colours.",
    "Material expose like metals",
  ];
  
  export default function DiscountItem() {
    const navigate = useNavigate();

    const handleShopNow = () => {
      navigate('/products');
    };

    return (
      <section className="bg-white py-24 px-6">
        {/* Title Centered */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-900">
            Discount Item
          </h3>
        </div>
  
        {/* Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto px-4">
          {/* Left Side */}
          <div className="max-w-xl w-full">
            
  
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-3">
              20% Discount Of All Products
            </h2>
            <p className="text-pink-500 font-semibold mb-2">Eams Sofa Compact</p>
            <p className="text-gray-500 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget
              feugiat habitasse nec, bibendum condimentum.
            </p>
  
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="text-blue-600 mt-1" size={18} />
                  <p className="text-sm text-gray-600">{feature}</p>
                </div>
              ))}
            </div>
  
            <button 
              onClick={handleShopNow} 
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
            >
              Shop Now
            </button>
          </div>
  
          {/* Right Side */}
          <div className="relative w-full md:w-[400px] flex justify-center items-center">
            <div className="absolute bg-pink-100 rounded-full w-120 h-120 md:w-[350px] md:h-[350px] z-0"></div>
            <img
              src={chairImage}
              alt="Discount Chair"
              className="relative z-10 w-[350px] md:w-[350px] object-contain"
            />
          </div>
        </div>
      </section>
    );
  }