import React, { useContext } from "react";
import DataContext from "store/data/DataContext";
import CounterBtn from "./CounterBtn";
import classes from "./styles/common.module.css"

function Locations() {
  const {location, setLocation} = useContext(DataContext);
  return (
    <section className={classes['locations']}>
      <p className={classes["intro-text"]}>
        Please Enter Your Area for <br /> Scrap{" "}
      </p>
      <select value={location} onChange={(e) => setLocation(e.target.value)} className={classes["selling-type"]}>
        <option selected value="">Please Select Your Area</option>
        <option value="begumpet">Begumpet</option>
        <option value="amerpeet">Amerpeet</option>
      </select>
      <CounterBtn check={location?.length} errMessage="Please Fill your Location"/>
    </section>
  );
}

export default Locations;
