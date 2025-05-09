import React from "react";
import { Truck, DollarSign, Award, Phone } from "lucide-react";

const offerItems = [
  { icon: <Truck size={32} color="#FF6A00" />, title: "24/7 Support" },
  { icon: <DollarSign size={32} color="#FBB034" />, title: "24/7 Support" },
  { icon: <Award size={32} color="#FFD700" />, title: "24/7 Support" },
  { icon: <Phone size={32} color="#555" />, title: "24/7 Support" },
];

export default function ShopexOffer() {
  return (
    <section className="py-16 text-center bg-white">
      <h2 className="text-3xl font-bold text-blue-800 mb-12">What Shopex Offer!</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {offerItems.map((item, index) => (
          <div key={index} className="bg-white shadow-lg p-6 w-64 rounded-lg">
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="font-semibold text-md text-blue-900">{item.title}</h3>
            <p className="text-gray-500 text-sm mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
