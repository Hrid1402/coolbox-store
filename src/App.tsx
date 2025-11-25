
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { PurchasesPage } from './pages/PurchasesPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { CartSidebar } from './components/CartSidebar';
import { CheckoutPage } from './pages/CheckoutPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <BrowserRouter>
            <CartSidebar />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="product/:id" element={<ProductDetailPage />} />
                <Route path="purchases" element={<PurchasesPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
