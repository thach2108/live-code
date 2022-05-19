import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import ProductLists from "./views/ProductLists";
import About from "./views/About";
import Navbar from "./components/Navbar";
import ProductDetail from "./views/ProductDetail";

import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "./styles/index.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/products" element={<ProductLists />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
