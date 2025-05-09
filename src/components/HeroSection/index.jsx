import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

import sofaImage from "../../assets/Images/sofa.png";
import bgPattern from "../../assets/Images/promotionBg.png";
import chair from "../../assets/Images/chair.png";
import interior from "../../assets/Images/interior.png";

const slides = [
  {
    id: 1,
    tagline: "Best Furniture For Your Space",
    title: "New Furniture Collection Trends in 2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    buttonText: "Shop Now",
    sofaImage: sofaImage,
  },
  {
    id: 2,
    tagline: "Exclusive Offers",
    title: "Modern Interior Design Studio",
    description:
      "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    buttonText: "View Collection",
    sofaImage: interior, // using same key to stay consistent
  },
  {
    id: 3,
    tagline: "Limited Edition",
    title: "Handcrafted Luxury Furniture",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    buttonText: "Discover Now",
    sofaImage: chair,
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

    const handleShopNow = () => {
      navigate('/products');
    };
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = (index) => {
    if (index === currentSlide || isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) goToSlide((currentSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  const slide = slides[currentSlide];

  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPattern})` }}
    >
      <div className="relative h-full container mx-auto px-4 py-16">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-8 items-center">
          {/* Left Side */}
          <div
            className={`flex items-start gap-6 transition-all duration-500 ${
              isAnimating
                ? "opacity-0 -translate-x-12"
                : "opacity-100 translate-x-0"
            }`}
          >
            

            {/* Text Content */}
            <div>
              <p className="text-pink-500 font-medium mb-4">{slide.tagline}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight font-display">
                {slide.title}
              </h1>
              <p className="text-gray-600 mb-8 max-w-lg">{slide.description}</p>
              <button onClick={handleShopNow} className="bg-pink-500 text-white px-8 py-3 rounded-md font-medium hover:bg-pink-600 transition-transform transform hover:scale-105 duration-200">
                {slide.buttonText}
              </button>
            </div>
          </div>

          {/* Right Side */}
          {/* Right Side */}
          <div className="relative flex justify-center items-center">
            <div
              className={`relative transition-all duration-500 ${
                isAnimating
                  ? "opacity-0 translate-x-12"
                  : "opacity-100 translate-x-0"
              }`}
            >
              {slide.sofaImage && (
                <img
                  src={slide.sofaImage}
                  alt="Slide Visual"
                  className="w-72 h-72 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-6 left-0 right-0">
        <Pagination
          totalSlides={slides.length}
          currentIndex={currentSlide}
          onPageChange={goToSlide}
        />
      </div>
    </section>
  );
};

export default HeroSection;
