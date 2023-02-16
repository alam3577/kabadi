import React, { useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-router-dom';
import UIContext from 'store/ui/UiContext';
import classes from "./styles/SideBar.module.css"

function SideBar() {
  const {show, handleClose} = useContext(UIContext);
  
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={classes['sidebar-items']}>
        <NavLink style={{ textDecoration: 'none', color:"#00d9a6", cursor:"pointer" }} to="/">
           <div onClick={() => handleClose()}>Home</div>
        </NavLink>
        <NavLink style={{ textDecoration: 'none', color:"#00d9a6", cursor:"pointer" }} to="/price">
           <div onClick={() => handleClose()}>Price</div>
        </NavLink>
        <NavLink style={{ textDecoration: 'none', color:"#00d9a6", cursor:"pointer" }} to="/book-pickup">
           <div onClick={() => handleClose()}>Pick Up</div>
        </NavLink>
           {/* <div>Order Summery</div> */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;