import { Routes, Route } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { Notfound } from './pages/Notfound';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { ProductPage } from './pages/ProductPage';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import Typing from './pages/Typing';
import Layout from './components/Layout';
import { Wiki } from './pages/Wiki';
import { useEffect, useState } from 'react';
import { ProductPageDynamic } from './pages/ProductPageDynamic';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';
import { Service } from './pages/Service';
import { NewsPageDynamic } from './pages/NewsPageDynamic';
import ProtectedRoutes from './ProtectedRoutes';
import { isAuthenticated } from './auth';

function App() {
  return (
    <div className="w-full overflow-hidden bg-primary dark">
      <div className="flex justify-center items-center">
        <div className="w-full">
          {/*<Navbar/>*/}
          <Routes>
            {/*<Route path="/" element={<Layout state={{user: user}}/>}>*/}
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="shop" element={<Shop />} />
              <Route path="shop/:productName" element={<Shop />} />
              <Route path="product" element={<ProductPage />} />
              <Route path="product/:order" element={<ProductPageDynamic />} />
              <Route path="about" element={<About />} />
              {/*<Route path="cart" element={<Cart />}  />*/}
              <Route path="typing" element={<Typing />} />
              <Route path="wiki" element={<Wiki />} />
              <Route path="service" element={<Service />} />
              <Route path="news" element={<NewsPageDynamic />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="cart" element={<Cart />} key={document.location.href} />
              </Route>
            </Route>

            {/*<Route path="checkout" element={<Checkout/>} />*/}
            <Route path="*" element={<Notfound />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
