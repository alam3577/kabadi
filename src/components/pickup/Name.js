import { useContext } from "react";
import { toast } from "react-toastify";
import DataContext from "store/data/DataContext";
import UIContext from "store/ui/UiContext";
import classes from "./styles/common.module.css";

function Name() {
  const {incCount} = useContext(UIContext);
  const {orderDetails, setOrderDetails} = useContext(DataContext);
  const {name, phone} = orderDetails;

  function validateMobileNumber(number) {
    const regex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;
    return regex.test(number);
  }

  const handleNameContinueClick = () => {
    const checkNameLength = name?.length > 2;
    const checkPhone = validateMobileNumber(phone);
    if(!checkNameLength) return toast.warn("Please Fill name Properly")
    if(!checkPhone) return toast.warn("Please Enter proper Phone Number")
    checkNameLength && checkPhone && incCount();
  }

  const handleOnChange = name => e => {
     setOrderDetails(prevState => {
      return {...prevState, [name]: e.target.value}
     })
  }

  return (
    <section className={classes["name-section"]}>
      <p className={classes["intro-text"]}>
        Hi, Im Booking Assit <br /> Welcome to Scrapzon
      </p>
      <input value={name} onChange={handleOnChange("name")} type="text" placeholder="What Is Your Name" />
      <input value={phone} onChange={handleOnChange("phone")} type="text" placeholder="Enter your Phone Number" />
      <button onClick={() => handleNameContinueClick()} className={classes["btn-continue"]}>Continue</button>
    </section>
  );
}

export default Name;
