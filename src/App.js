import './App.css';
import Footer from './component/Footer';
import Header from './component/Header';
import Nav from './component/Nav';
import Home1 from './component/Home1';
import Category from './component/Category';
import { Routes, Route } from 'react-router-dom';
import Cart from './component/Cart';
import Productdel from './component/Productdel';
import Checkout from './component/Checkout';
import ThankYou from './component/ThankYou';
import Login from './component/Login';
import Signup from './component/Signup';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Nav />
      
      {/* Routes control which page is visible */}
      <div className="page-wrapper animate-fadeIn">
        <Routes>
          <Route path="/" element={<Home1 />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/category/:category/:id" element={<Productdel />} />
         
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/thankyou' element={<ThankYou/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
