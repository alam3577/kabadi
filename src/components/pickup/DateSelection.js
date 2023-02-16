import React, { useContext, useState } from 'react'
import DatePicker from "react-datepicker";
import DataContext from 'store/data/DataContext';
import CounterBtn from './CounterBtn';
import classes from "./styles/common.module.css";

function DateSelection() {
  const {dataDate, setDataDate} = useContext(DataContext);
  return (
    <section className={classes['date-section']}>
      <p className={classes["intro-text"]}>Please Select Date To Collect Your Scrap </p>
      <div className={`${classes['date-container']} form-group`}>
         <h6>Please Select Pickup Date</h6>
         <DatePicker dateFormat="dd-MM-yyyy" selected={dataDate} onChange={(date) => setDataDate(date)} />
      </div>
      <CounterBtn check={true}/>
    </section>
  )
}

export default DateSelection;