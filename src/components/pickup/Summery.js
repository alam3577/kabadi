import MainButton from "components/ui/buttons/MainButton";
import React, { useContext } from "react";
import DataContext from "store/data/DataContext";
import UIContext from "store/ui/UiContext";
import classes from "./styles/Summery.module.css";
import LeftArrowIcon from "../../assets/icons/left-arrow.png";

function Summery() {
  const { name, phone, dataDate, selectedSlot, address, handleConfirmBookingClick } =
    useContext(DataContext);

  const pickUpDate = String(dataDate).split(' ').slice(0, 4).join(' ');

  const {decCount} = useContext(UIContext);
   
  return (
    <div className={classes["main-container"]}>
      <div class={classes.container}>
        <h1>Pick-up Booking Summary</h1>
        <div class={classes["booking-summary"]}>
          <h2>Booking Details</h2>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Pick-up Date:</strong> {pickUpDate}
          </p>
          <p>
            <strong>Pick-up Time:</strong> {selectedSlot}
          </p>
          <p>
            <strong>Pick-up Location:</strong> {address}
          </p>
        </div>
        <div className={`d-flex justify-content-center align-items-center`}>
        <button onClick={() => decCount()} className={classes["selling-type-left-btn"]}>
          <img className={classes["left-icon"]} src={LeftArrowIcon} alt="LeftArrowIcon" srcSet=""/>
        </button>
        <MainButton btnClick={handleConfirmBookingClick} name="Confirm Booking" />
        </div>
      </div>
    </div>
  );
}

export default Summery;
