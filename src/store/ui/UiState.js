import React, { useState } from "react";
import UIContext from "./UiContext";

function UiState({ children }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("CLICK", show);
  return <UIContext.Provider value={{show, setShow, handleClose, handleShow}}>{children}</UIContext.Provider>;
}

export default UiState;
