import "./App.css";
import React, { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import UpdateProduct from "./components/UpdateProduct";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <>
                  <Navbar onSelectCategory={handleCategorySelect} />
                  <Routes>
                    <Route
                      path="/"
                      element={<Home selectedCategory={selectedCategory} />}
                    />
                    <Route path="/add_product" element={<AddProduct />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route
                      path="/product/update/:id"
                      element={<UpdateProduct />}
                    />
                  </Routes>
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
