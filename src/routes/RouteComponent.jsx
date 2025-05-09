import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, memo } from 'react';
import PageContainer from '../components/Layout/PageContainer';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
import LoadingSpinner from '../components/LoadingSpinner';

// Lazy load components with prefetching
const lazyLoad = (importFunc) => {
  const Component = lazy(importFunc);
  // Prefetch the component
  importFunc();
  return Component;
};

// Memoized components to prevent unnecessary re-renders
const HomePage = memo(lazyLoad(() => import('../pages/HomePage')));
const ProductPage = memo(lazyLoad(() => import('../pages/ProductPages')));
const ProductDetailPage = memo(lazyLoad(() => import('../pages/ProductDetailPage')));
const CartPage = memo(lazyLoad(() => import('../pages/CartPage')));
const CheckoutPage = memo(lazyLoad(() => import('../pages/CheckoutPage')));
const Wishlist = memo(lazyLoad(() => import('../components/Wishlist')));
const AboutUs = memo(lazyLoad(() => import('../pages/AboutUs')));
const Login = memo(lazyLoad(() => import('../forms/Login')));
const OrderConfirm = memo(lazyLoad(() => import('../components/OrderConfirm')));
const NotFound = memo(lazyLoad(() => import('../components/NotFound')));
const OrderPage = memo(lazyLoad(() => import('../pages/OrderPage')));
const FaqPage = memo(lazyLoad(() => import('../pages/FaqPage')));

// Memoized loading component
const RouteLoading = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white">
    <LoadingSpinner />
  </div>
));

// Memoized route wrapper to prevent unnecessary re-renders
const RouteWrapper = memo(({ children }) => (
  <PageContainer>
    <Suspense fallback={<RouteLoading />}>
      {children}
    </Suspense>
  </PageContainer>
));

const RouteComponent = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route
          path="/"
          element={
            <RouteWrapper>
              <HomePage />
            </RouteWrapper>
          }
        />
        <Route
          path="/products"
          element={
            <RouteWrapper>
              <ProductPage />
            </RouteWrapper>
          }
        />
        <Route
          path="/products/:id"
          element={
            <RouteWrapper>
              <ProductDetailPage />
            </RouteWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <RouteWrapper>
              <AboutUs />
            </RouteWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <RouteWrapper>
              <Login />
            </RouteWrapper>
          }
        />
        <Route
          path="/faq"
          element={
            <RouteWrapper>
              <FaqPage />
            </RouteWrapper>
          }
        />
        <Route
          path="*"
          element={
            <RouteWrapper>
              <NotFound />
            </RouteWrapper>
          }
        />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/cart"
          element={
            <RouteWrapper>
              <CartPage />
            </RouteWrapper>
          }
        />
        <Route
          path="/cart/checkout"
          element={
            <RouteWrapper>
              <CheckoutPage />
            </RouteWrapper>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RouteWrapper>
              <Wishlist />
            </RouteWrapper>
          }
        />
        <Route
          path="/orderconfirm"
          element={
            <RouteWrapper>
              <OrderConfirm />
            </RouteWrapper>
          }
        />
        <Route
          path="/orders"
          element={
            <RouteWrapper>
              <OrderPage />
            </RouteWrapper>
          }
        />
      </Route>
    </Routes>
  );
};

export default memo(RouteComponent);
