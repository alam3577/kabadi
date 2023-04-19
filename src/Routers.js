import AddProduct from "pages/admin/products/AddProduct";
import Dashboard from "pages/admin/products/Dashboard";
import Locations from "pages/admin/locations/Locations";
import Orders from "pages/admin/orders/Orders";
import UpdateProduct from "pages/admin/products/UpdateProduct";
import Home from "pages/Home";
import Login from "pages/auth/Login";
import Pickup from "pages/Pickup";
import Price from "pages/Price";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "pages/NotFound";
import { isAuthenticated, isUser } from "utils/helper";
import AdminSlot from "pages/admin/slots/AddSlot";
import Slots from "pages/admin/slots/Slots";
import UpdateSlot from "pages/admin/slots/UpdateSlot";
import ForgotPassword from "pages/auth/ForgotPassword";
import VerifyOtp from "pages/auth/VerifyOtp";
import ResetPassword from "pages/auth/ResetPassword";
import Signup from "pages/auth/Signup";
import MyOrder from "pages/MyOrder";
import GetAllUsers from "pages/admin/users/GetAllUsers";

function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/price" element={<Price />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        { isAuthenticated() && isUser() && isUser()?.role === 'user' && (
          <>
            <Route path="/book-pickup" element={<Pickup />} />
            <Route path="/my-order" element={<MyOrder />} />
          </>
        )}
        {
          isAuthenticated() && isUser() && isUser()?.role === 'admin' && <>
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/locations" element={<Locations />} />
            <Route path="/admin/slot" element={<Slots />} />
            <Route path="/admin/add-slot" element={<AdminSlot />} />
            <Route path="/admin/update-slot" element={<UpdateSlot />} />
            <Route path="/admin/get-all-users" element={<GetAllUsers />} />
          </>
        }
         {
          isAuthenticated() && isUser() && isUser()?.role === 'super-admin' && <>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/locations" element={<Locations />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/update-product" element={<UpdateProduct />} />
            <Route path="/admin/slot" element={<Slots />} />
            <Route path="/admin/add-slot" element={<AdminSlot />} />
            <Route path="/admin/update-slot" element={<UpdateSlot />} />
            <Route path="/admin/get-all-users" element={<GetAllUsers />} />
          </>
        }
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}

export default Routers;
