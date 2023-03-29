import React, { useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink, useNavigate } from 'react-router-dom';
import UIContext from 'store/ui/UiContext';
import { isAuthenticated, isUser } from 'utils/helper';
import classes from "./styles/SideBar.module.css"
import UserIcon from '../../assets/icons/user.png'
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AuthService from 'services/auth.services';

const authService = new AuthService();

function SideBar() {
  const {show, handleClose, setSpinner, handlePickUpClick} = useContext(UIContext);
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
     handleClose();
     setSpinner(false);
   }
 };

 const handleSignupClick = () => {
   navigate('/signup');
   handleClose();
 }
  
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={classes['sidebar-items']}>
         <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex gap-3 my-3 align-items-center justify-content-center'>
               <img style={{ width: '40px', height: '40px' }} src={UserIcon} alt="" srcSet="" />
               { (isAuthenticated() && isUser()) ? <p style={{ color:"#00d9a6", marginBottom: '0px' }}>Hi, {isUser()?.name?.split(' ')?.[0]}</p> : <p style={{ color:"#00d9a6", marginBottom: '0px' }}>Hi, User</p> }
            </div>
            {(!isAuthenticated() || !isUser()) && <Button onClick={handleSignupClick}>Signup</Button>}
         </div>
        <NavLink style={{ textDecoration: 'none', color:"#00d9a6", cursor:"pointer" }} to="/">
           <div style={{ marginBottom: "-12px" }} onClick={() => handleClose()}>Home</div>
           <hr />
        </NavLink>
        <NavLink style={{ textDecoration: 'none', color:"#00d9a6", cursor:"pointer" }} to="/price">
           <div style={{ marginBottom: "-12px" }} onClick={() => handleClose()}>Price</div>
           <hr />
        </NavLink>
        <div style={{ textDecoration: 'none', color:"#00d9a6", cursor:"pointer" }}>
           <div style={{ marginBottom: "-12px" }} onClick={() => handlePickUpClick()}>Pick Up</div>
           <hr />
        </div>
       {
        isAuthenticated() && isUser() &&  <>
        <NavLink style={{ textDecoration: 'none', color:"#00d9a6", cursor:"pointer" }} to="/my-order">
           <div style={{ marginBottom: "-12px" }} onClick={() => handleClose()}>My Orders</div>
           <hr />
        </NavLink>
        <NavLink style={{ textDecoration: 'none', color:"#00d9a6", cursor:"pointer" }} to="/">
                  <div style={{ marginBottom: "-12px" }} onClick={() => handleAdminLogout()}>Logout</div>
                  <hr />
         </NavLink>
        </>
       }
        {
         (!isAuthenticated() || !isUser) && <NavLink style={{ textDecoration: 'none', color:"#00d9a6", cursor:"pointer" }} to="/login">
          <div style={{ marginBottom: "-12px" }} onClick={() => handleClose()}>Login</div>
          <hr />
         </NavLink>
        }
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;