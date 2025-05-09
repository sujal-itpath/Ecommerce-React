import React from "react";
import { useNavigate } from "react-router-dom";
import chairImage from "../../../assets/Images/chair2.png"; // Add the image manually to your assets folder

export default function ProductFeature() {
    const navigate = useNavigate();

    const handleShopNow = () => {
      navigate('/products');
    };
  return (
    <section className="flex flex-col md:flex-row items-center bg-[#f3f0fb] py-16 px-8 gap-12">
      <div className="flex justify-center w-full md:w-1/2">
        <img src={chairImage} alt="Chair" className="w-100 object-contain" />
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          Unique Features Of leatest & Trending Products
        </h2>
        <ul className="text-gray-500 mb-8 space-y-3">
          <li className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-pink-500"></span>
            All frames constructed with hardwood solids and laminates
          </li>
          <li className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            Reinforced with double wood dowels, glue, screw - nails corner blocks and machine nails
          </li>
          <li className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            Arms, backs and seats are structurally reinforced
          </li>
        </ul>
        <div className="flex gap-4 items-center">
          <button onClick={handleShopNow} className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md">Shop Now</button>
          <div>
            <p className="text-sm text-gray-600">B&B Italian Sofa</p>
            <p className="font-semibold text-blue-800">$32.00</p>
          </div>
        </div>
      </div>
    </section>
  );
}
