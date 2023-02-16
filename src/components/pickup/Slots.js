import { useContext } from 'react';
import DataContext from 'store/data/DataContext';
import CounterBtn from './CounterBtn';
import classes from "./styles/common.module.css";

function Slots() {
  const {selectedSlot, setSelectedSlot, dataDate, data} = useContext(DataContext);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  }

  return (
    <section>
      <p className={classes["intro-text"]}> Pleased Select a Slot On<br /> <strong>{String(dataDate)}</strong>  </p>
      <p className={classes["intro-text"]}> Available Slots</p>
      <div className={classes['slot-container']}>
        <>
        {
            data?.map(slot => {
                return (
                    <div onClick={() => handleSlotClick(slot?.startSlot + " to " + slot?.endSlot)} key={slot?.id} className={classes['available-slots']} >{slot?.startSlot} to {slot?.endSlot}</div>
                )
            })
        }
       <CounterBtn check={selectedSlot?.length} errMessage="Please Select a Slot" />
       </>
      </div>
    </section>
  )
}

export default Slots;