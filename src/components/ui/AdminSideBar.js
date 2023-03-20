import React, { useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "services/auth.services";
import UIContext from "store/ui/UiContext";
import classes from "./styles/SideBar.module.css";

const authService = new AuthService();

function AdminSideBar() {
  const { adminMenu, handleAdminMenuClose, setSpinner } = useContext(UIContext);
  const handleAdminLogout = async () => {
    try {
      setSpinner(true);
      const res = await authService.logOut();
      if (res?.data?.status === "success") {
        toast.success('You are Logged Out')
      }
    } catch (error) {
    } finally {
      handleAdminMenuClose();
      setSpinner(false);
    }
  };

  return (
    <>
      <Offcanvas show={adminMenu} onHide={handleAdminMenuClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={classes["sidebar-items"]}>
          <NavLink
            style={{
              textDecoration: "none",
              color: "#00d9a6",
              cursor: "pointer",
            }}
            to="/admin/dashboard"
          >
            <div onClick={() => handleAdminMenuClose()}>Dashboard</div>
          </NavLink>
          <NavLink
            style={{
              textDecoration: "none",
              color: "#00d9a6",
              cursor: "pointer",
            }}
            to="/admin/orders"
          >
            <div onClick={() => handleAdminMenuClose()}>Order</div>
          </NavLink>
          <NavLink
            style={{
              textDecoration: "none",
              color: "#00d9a6",
              cursor: "pointer",
            }}
            to="/admin/locations"
          >
            <div onClick={() => handleAdminMenuClose()}>Locations</div>
          </NavLink>
          <NavLink
            style={{
              textDecoration: "none",
              color: "#00d9a6",
              cursor: "pointer",
            }}
            to="/"
          >
            <div onClick={() => handleAdminLogout()}>Logout</div>
          </NavLink>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AdminSideBar;
