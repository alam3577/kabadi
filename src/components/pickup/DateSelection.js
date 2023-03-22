import React, { useContext, useState } from 'react'
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import SlotServices from 'services/slot.services';
import DataContext from 'store/data/DataContext';
import UIContext from 'store/ui/UiContext';
import CounterBtn from './CounterBtn';
import classes from "./styles/common.module.css";

const slotServices = new SlotServices();

function DateSelection() {

  const {orderDetails, setOrderDetails} = useContext(DataContext);
  const { dataDate, selectedSlot } = orderDetails;

 console.log({orderDetails})

  const {setSpinner} = useContext(UIContext);
  const [slotId, setSlotId] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const pickUpDate = String(dataDate)?.split(' ')?.slice(0, 4)?.join(' ');

  const handleSlotClick = (id, slot) => {
    setSlotId(id);
    setOrderDetails(prevState => {
      return {...prevState, selectedSlotId: id, selectedSlot: slot }
    })
  }

  const handleDateChange = async (date) => {
  // const pickUpDate = new Date(dataDate?.toDateString())
    try {
     setSpinner(true);
     const res = await slotServices.getUSerSlots(date);
     console.log({res, date});
     if (res.status === 'success') {
       setAvailableSlots(res?.data?.slots);
     }
     setSlotId(null);
     setOrderDetails(prevState => {
      return {...prevState, dataDate: date, selectedSlotId: null, selectedSlot: ""}
     });
     setSpinner(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);;
    }
  }

  return (
    <section className={classes['date-section']}>
      <p className={classes["intro-text"]}>Please Select Date To Collect Your Scrap </p>
      <div className={`${classes['date-container']} form-group`}>
         <h6>Please Select Pickup Date</h6>
         <DatePicker placeholderText={'Please select a date'}  minDate={new Date()} dateFormat="dd-MM-yyyy" selected={dataDate} onChange={(date) => handleDateChange(date)} />
      </div>
      <section>
      { dataDate && <p className={classes["intro-text"]}> Available Slots On <br /> <strong>{String(pickUpDate)}</strong> </p>}
      <div className={classes['slot-container']}>
        <>
        {
            availableSlots?.map(slot => {
                const slotFormat = `${slot?.startTime} ${slot?.startTimeMeridiem} to ${slot?.endTime} ${slot?.endTimeMeridiem}`;
                return (
                    <button disabled={!slot?.isValid} onClick={() => handleSlotClick(slot?._id, slotFormat)} key={slot?._id} className={`${ !slot?.isValid ? classes['slot-not-available'] : classes['available-slots']} ${slotId === slot?._id && classes['available-slots-selected']} ${slot?.isValid}` } >{slotFormat}</button>
                )
            })
        }
       </>
      </div>
    </section>
      <CounterBtn check={dataDate && selectedSlot} errMessage="Please Select a Date and slot"/>
    </section>
  )
}

export default DateSelection;