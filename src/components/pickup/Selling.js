import { useContext } from "react";
import DataContext from "store/data/DataContext";
import CounterBtn from "./CounterBtn";
import classes from "./styles/common.module.css";


function Selling() {
  const {orderDetails, setOrderDetails} = useContext(DataContext);
  const {name, sellingType} = orderDetails;

  const handleOnChange = name => e => {
    setOrderDetails(prevState => {
     return {...prevState, [name]: e.target.value}
    })
 }

  return (
    <section className={classes["selling"]}>
      <p className={classes["intro-text"]}> Pleased to meet you  <strong>{name}</strong> <br /> How can we help? </p>
      <select value={sellingType} onChange={handleOnChange("sellingType")} className={classes["selling-type"]}>
        <option selected value="">Please Select </option>
        <option value="sell">SELL YOUR SCRAP</option>
        <option value="donate">DONATE YOUR SCRAP</option>
      </select>
      <CounterBtn check= {sellingType?.length} errMessage="Please Select Your Selling Type"/>
    </section>
  );
}

export default Selling;
