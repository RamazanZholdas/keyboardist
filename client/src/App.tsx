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
import { ProductPageDynamic } from './pages/ProductPageDynamic';
import { About } from './pages/About';
import { Service } from './pages/Service';
import { News } from './pages/News';
import ProtectedRoutes from './ProtectedRoutes';
import {Checkout} from "./pages/Checkout";
import {WikiDynamic} from "./pages/WikiDynamic";
import {NewsDynamic} from "./pages/NewsDynamic";
import {Profile} from "./pages/Profile";

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
              <Route path="wiki/:id" element={<WikiDynamic />} />
              <Route path="service" element={<Service />} />
              <Route path="news" element={<News />} />
              <Route path="news/:id" element={<NewsDynamic />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="cart" element={<Cart />} key={document.location.href} />
                <Route path="profile" element={<Profile />} key={document.location.href} />
              </Route>
            </Route>

            <Route path="checkout" element={<Checkout/>} />
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
