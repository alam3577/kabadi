import AddProduct from "pages/admin/products/AddProduct";
import Dashboard from "pages/admin/products/Dashboard";
import Locations from "pages/admin/locations/Locations";
import Orders from "pages/admin/orders/Orders";
import UpdateProduct from "pages/admin/products/UpdateProduct";
import Home from "pages/Home";
import Login from "pages/Login";
import Pickup from "pages/Pickup";
import Price from "pages/Price";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "pages/NotFound";
import { isAuthenticated } from "utils/helper";
import AdminSlot from "pages/admin/slots/AddSlot";
import Slots from "pages/admin/slots/Slots";
import UpdateSlot from "pages/admin/slots/UpdateSlot";

function Routers() {
  console.log({ check: isAuthenticated() })
  return (
    <div>
      <Routes>
        {/* <Route path='*' element={<NotFound />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/price" element={<Price />} />
        <Route path="/book-pickup" element={<Pickup />} />
        { isAuthenticated() && (
          <>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/locations" element={<Locations />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/update-product" element={<UpdateProduct />} />
            <Route path="/admin/slot" element={<Slots />} />
            <Route path="/admin/add-slot" element={<AdminSlot />} />
            <Route path="/admin/update-slot" element={<UpdateSlot />} />
          </>
        )}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}

export default Routers;
