import React, { useState } from "react";
import UIContext from "./UiContext";

function UiState({ children }) {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  const incCount = () => {
    setCount(count + 1)
  }

  const decCount = () => {
    setCount(count - 1)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return <UIContext.Provider value={{show, setShow, handleClose, handleShow, count, setCount, incCount, decCount}}>{children}</UIContext.Provider>;
}

export default UiState;
