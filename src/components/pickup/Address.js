import React, { useContext } from "react";
import DataContext from "store/data/DataContext";
import CounterBtn from "./CounterBtn";
import classes from "./styles/common.module.css"

function Address() {
  const {orderDetails, setOrderDetails} = useContext(DataContext);
  const { address } = orderDetails;

  const handleOnChange = name => e => {
    setOrderDetails(prevState => {
     return {...prevState, [name]: e.target.value}
    })
  }

  return (
    <section className={classes["home-address"]}>
      <p className={classes["intro-text"]}>Please Give Your Home Address </p>
      <div className={classes["address-container"]}>
        <h6>Home Address</h6>
        <textarea onChange={handleOnChange("address")} placeholder="Write Your Address Here" name="" className={classes["address"]} id="address" cols="30" rows="5"></textarea>
      <CounterBtn check={address?.length} errMessage="Please Fill your Address"/>
      </div>
    </section>
  );
}

export default Address;
