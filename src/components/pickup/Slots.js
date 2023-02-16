import { useContext, useState } from 'react';
import DataContext from 'store/data/DataContext';
import CounterBtn from './CounterBtn';
import classes from "./styles/common.module.css";

function Slots() {
  const {selectedSlot, setSelectedSlot, dataDate, data} = useContext(DataContext);
  const [slotId, setSlotId] = useState("")

  const handleSlotClick = (slot, id) => {
    setSlotId(id);
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
                    <div onClick={() => handleSlotClick(`${slot?.startSlot} to ${slot?.endSlot}`, slot?.id)} key={slot?.id} className={`${classes['available-slots']} ${slotId === slot?.id && classes['available-slots-selected']}`} >{slot?.startSlot} to {slot?.endSlot}</div>
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