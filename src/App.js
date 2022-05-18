import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import ProductLists from "./views/ProductLists";
import ProductDetail from "./views/ProductDetail";
import About from "./views/About";
import Navbar from "./components/Navbar";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/products" element={<ProductLists />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
