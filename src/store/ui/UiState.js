import React, { useState } from "react";
import UIContext from "./UiContext";

function UiState({ children }) {
  const [show, setShow] = useState(false);
  const [adminMenu, setAdminMenu] = useState(false);
  const [count, setCount] = useState(0);
  const [spinner, setSpinner] = useState(false);

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

  return <UIContext.Provider value={{show, setShow, handleClose, handleShow, count, setCount, incCount, decCount, spinner, setSpinner, handleAdminMenuClose, handleAdminMenuShow, adminMenu}}>{children}</UIContext.Provider>;
}

export default UiState;
