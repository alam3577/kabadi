import React from 'react';
import classes from "./styles/common.module.css";
import LeftArrowIcon from "../../assets/icons/left-arrow.png";
import { useContext } from "react";
import UIContext from "store/ui/UiContext";
import { toast } from 'react-toastify';

function CounterBtn({check, errMessage}) {
  console.log({check, errMessage});
  const {incCount, decCount} = useContext(UIContext);
  const handleContinueClick = () => {
   check && incCount()
   if (check) {
    incCount()
   }else{
    return toast.warn(errMessage);
   }
  };
  return (
    <div className={classes["selling-type-btn"]}>
        <button onClick={() => decCount()} className={classes["selling-type-left-btn"]}>
          <img className={classes["left-icon"]} src={LeftArrowIcon} alt="LeftArrowIcon" srcSet=""/>
        </button>
        <button onClick={() => handleContinueClick()} className={classes["selling-type-right-btn"]}>Continue</button>
    </div>
  )
}

export default CounterBtn