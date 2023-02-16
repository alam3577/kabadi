import { useContext } from "react";
import { toast } from "react-toastify";
import DataContext from "store/data/DataContext";
import UIContext from "store/ui/UiContext";
import classes from "./styles/common.module.css";

function Name() {
  const {incCount} = useContext(UIContext);
  const {setName, name, phone, setPhone} = useContext(DataContext);

  const handleNameContinueClick = () => {
    const checkNameLength = name?.length > 2;
    const checkPhone = phone.length === 10;
    if(!checkNameLength) return toast.warn("Please Fill name Properly")
    if(!checkPhone) return toast.warn("Please Enter proper Phone Number")
    checkNameLength && checkPhone && incCount();
  }

  return (
    <section className={classes["name-section"]}>
      <p className={classes["intro-text"]}>
        Hi, Im Booking Assit <br /> Welcome to Scrapzon
      </p>
      <input value={name} onChange={(e) => setName(e.target.value.trim())} type="text" placeholder="What Is Your Name" />
      <input value={phone} onChange={(e) => setPhone(e.target.value.trim())} type="text" placeholder="Enter your Phone Number" />
      <button onClick={() => handleNameContinueClick()} className={classes["btn-continue"]}>Continue</button>
    </section>
  );
}

export default Name;
