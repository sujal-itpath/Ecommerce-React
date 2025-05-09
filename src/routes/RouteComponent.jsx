import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPages';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import PageContainer from '../components/Layout/PageContainer'; // Adjust the path as needed
import Wishlist from '../components/Wishlist';
import AboutUs from '../pages/AboutUs';
import Login from '../forms/Login';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
import OrderConfirm from '../components/OrderConfirm';
import NotFound from '../components/NotFound';
import OrderPage from '../pages/OrderPage';
import FaqPage from '../pages/FaqPage';

const RouteComponent = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route
          path="/"
          element={
            <PageContainer>
              <HomePage />
            </PageContainer>
          }
        />
        <Route
          path="/products"
          element={
            <PageContainer>
              <ProductPage />
            </PageContainer>
          }
        />
        <Route
          path="/products/:id"
          element={
            <PageContainer>
              <ProductDetailPage />
            </PageContainer>
          }
        />
        <Route
          path="/about"
          element={
            <PageContainer>
              <AboutUs />
            </PageContainer>
          }
        />
        <Route
          path="/login"
          element={
            <PageContainer>
              <Login />
            </PageContainer>
          }
        />
        <Route
          path="/faq"
          element={
            <PageContainer>
              <FaqPage />
            </PageContainer>
          }
        />

        <Route
          path="*"
          element={
            <PageContainer>
              <NotFound />
            </PageContainer>
          }
        />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/cart"
          element={
            <PageContainer>
              <CartPage />
            </PageContainer>
          }
        />
        <Route
          path="/cart/checkout"
          element={
            <PageContainer>
              <CheckoutPage />
            </PageContainer>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PageContainer>
              <Wishlist />
            </PageContainer>
          }
        />
        <Route
          path="/orderconfirm"
          element={
            <PageContainer>
              <OrderConfirm />
            </PageContainer>
          }
        />
        <Route
          path="/orders"
          element={
            <PageContainer>
              <OrderPage />
            </PageContainer>
          }
        />
        
      </Route>
    </Routes>
  );
};

export default RouteComponent;
