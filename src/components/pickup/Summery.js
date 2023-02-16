import MainButton from "components/ui/buttons/MainButton";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DataContext from "store/data/DataContext";
import classes from "./styles/Summery.module.css";

function Summery() {
  const { name, phone, dataDate, selectedSlot, address } =
    useContext(DataContext);
  
  const navigate = useNavigate();

  const handleConfirmBookingClick = () => {
     console.log("COnfirm Booking is Clicked");
     toast.success("your booking is confirmed");
     setTimeout(()=>{
       navigate("/");
     }, 3000)
  };

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
            <strong>Pick-up Date:</strong> {String(dataDate)}
          </p>
          <p>
            <strong>Pick-up Time:</strong> {selectedSlot}
          </p>
          <p>
            <strong>Pick-up Location:</strong> {address}
          </p>
        </div>
        <MainButton btnClick={handleConfirmBookingClick} name="Confirm Booking" />
      </div>
    </div>
  );
}

export default Summery;
