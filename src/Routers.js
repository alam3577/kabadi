import AddProduct from "pages/admin/AddProduct";
import Dashboard from "pages/admin/Dashboard";
import Locations from "pages/admin/Locations";
import Orders from "pages/admin/Orders";
import Home from "pages/Home";
import Login from "pages/Login";
import Pickup from "pages/Pickup";
import Price from "pages/Price";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

function Routers() {
  const [isAdmin, setIsAdmin] = useState(true);
  return (
    <div>
      <Routes>
        {!isAdmin && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/price" element={<Price />} />
            <Route path="/book-pickup" element={<Pickup />} />
          </>
        )}
        {isAdmin && (
          <>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/locations" element={<Locations />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default Routers;
