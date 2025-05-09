import React from 'react'
import HeroSection from '../../components/HeroSection'
import FeatureProducts from '../../components/HomeSection/FeatureProducts'
import LatestProducts from '../../components/HomeSection/LatestProducts'
import ShopexOffer from '../../components/HomeSection/ShopexOffer'
import ProductFeature from '../../components/HomeSection/ProductFeature.jsx'
import DiscountItem from '../../components/HomeSection/DiscountItem/index.jsx'
import Trending from '../../components/HomeSection/Trending'
import Newsletter from '../../components/HomeSection/Newsletter/index.jsx'
import Logos from '../../components/HomeSection/logos/index.jsx'

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeatureProducts />
      <LatestProducts />
      <ShopexOffer />
      <ProductFeature />
      <DiscountItem />
      <Newsletter/> 
      <Logos />
      <Trending />
    </div>
  )
}

export default HomePage
