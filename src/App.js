import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './component/Home';
import ViewItems from './component/items/ViewItems';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemHome from './component/items/ItemHome';
import AddItems from './component/items/AddItems';
import UpdateItems from './component/items/UpdateItems';
import AddProduct from './component/products/AddProduct';
import UpdateProduct from './component/products/UpdateProduct';
import ViewProducts from './component/products/ViewProducts';
import AddImage from './component/uploadImage/AddImage';
import ViewImage from './component/uploadImage/ViewImage';
import AddSIMCard from './component/simcard/AddSimCard';
import LoginForm from './component/LoginForm';
import RegisterForm from './component/RegisterForm';
import ShowImage from './component/uploadImage/ShowImage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/homes" element={<Home />} />
        <Route path="/home" element={<ItemHome />} />
        <Route path="/items" element={<ViewItems />} />
        <Route path="/add-items" element={<AddItems />} />
        <Route path="/update-items/:id" element={<UpdateItems />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/products" element={<ViewProducts />} />
        <Route path="/add-image" element={<AddImage />} />
        <Route path="/images" element={<ViewImage />} />
        <Route path="/add-simcard" element={<AddSIMCard />} />
        <Route path="/" element={<LoginForm />} /> 
        <Route path="/register" element={<RegisterForm />} /> 
        <Route path="/view" element={<ShowImage />} /> 

        

        
        </Routes>
        </BrowserRouter>
  );
}

export default App;
