import React, { useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
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
           <div>Home</div>
           <div>Price</div>
           <div>Pick Up</div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;