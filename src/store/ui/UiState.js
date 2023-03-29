import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated, isUser } from "utils/helper";
import UIContext from "./UiContext";

function UiState({ children }) {
  const [show, setShow] = useState(false);
  const [adminMenu, setAdminMenu] = useState(false);
  const [count, setCount] = useState(0);
  const [spinner, setSpinner] = useState(false);

  const navigate = useNavigate();

  const incCount = () => {
    setCount(count + 1)
  }

  const decCount = () => {
    setCount(count - 1)
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAdminMenuShow = () => setAdminMenu(true);
  const handleAdminMenuClose = () => setAdminMenu(false);

  const handlePickUpClick = () => {
    if (isAuthenticated() && isUser()) {
       navigate('/book-pickup')
    }else{
       toast.warn('Please Login to Book Appointment');
       navigate('/login')
    } 
    handleClose();
   }

  return <UIContext.Provider value={{ handlePickUpClick, show, setShow, handleClose, handleShow, count, setCount, incCount, decCount, spinner, setSpinner, handleAdminMenuClose, handleAdminMenuShow, adminMenu}}>{children}</UIContext.Provider>;
}

export default UiState;
