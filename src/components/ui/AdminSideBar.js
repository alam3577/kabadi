import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "services/auth.services";
import UIContext from "store/ui/UiContext";
import { isAuthenticated, isUser } from "utils/helper";
import classes from "./styles/SideBar.module.css";
import UserIcon from "../../assets/icons/user.png"

const authService = new AuthService();

function AdminSideBar() {
  const { adminMenu, handleAdminMenuClose, setSpinner } = useContext(UIContext);
  const navigate = useNavigate();
  const handleAdminLogout = async () => {
    setSpinner(true);
    try {
      const res = await authService.logOut();
      if (res?.status === "success") {
        toast.success('You are Logged Out')
      }
    } catch (error) {
    } finally {
      handleAdminMenuClose();
      setSpinner(false);
    }
  };

  const adminSidebarItem = [
    { id: "553754775", url: "/admin/dashboard", name: "Dashboard" },
    { id: "553754776", url: "/admin/orders", name: "Order" },
    { id: "553754777", url: "/admin/locations", name: "Locations" },
    { id: "553754778", url: "/admin/slot", name: "Slots" },
  ]

  const handleSignupClick = () => {
    navigate('/signup');
    handleAdminMenuClose();
  }

  return (
    <>
      <Offcanvas show={adminMenu} onHide={handleAdminMenuClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={classes["sidebar-items"]}>
        <div className='d-flex justify-content-between align-items-center mb-3'>
            <div className='d-flex gap-3 my-3 align-items-center justify-content-center'>
               <img style={{ width: '40px', height: '40px' }} src={UserIcon} alt="" srcSet="" />
               { isAuthenticated() && isUser() ? <p style={{ color:"#00d9a6", marginBottom: '0px' }}>Hi, {isUser()?.name?.split(' ')?.[0]}</p> : <p style={{ color:"#00d9a6", marginBottom: '0px' }}>Hi, User</p> }
            </div>
            { !(isAuthenticated() || !isUser()) && <Button onClick={handleSignupClick}>Signup</Button>}
         </div>
          {
            adminSidebarItem?.map((item, i) => (
              <NavLink key={`${item?._id}` + i} style={{ textDecoration: 'none', color:"#00d9a6", cursor:"pointer" }} to={item?.url}>
                  <div style={{ marginBottom: "-12px" }} onClick={() => handleAdminMenuClose()}>{item?.name}</div>
                  <hr />
              </NavLink>
            ))
          }
            <NavLink style={{ textDecoration: 'none', color:"#00d9a6", cursor:"pointer" }} to="/admin/get-all-users">
                  <div style={{ marginBottom: "-12px" }} onClick={() => handleAdminMenuClose()}>Get All Users</div>
                  <hr />
              </NavLink>

              <NavLink style={{ textDecoration: 'none', color:"#00d9a6", cursor:"pointer" }} to="/">
                  <div style={{ marginBottom: "-12px" }} onClick={() => handleAdminLogout()}>Logout</div>
                  <hr />
              </NavLink>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AdminSideBar;
