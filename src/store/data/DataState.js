import DataContext from './DataContext';
import { availableSlots, priceList } from 'utils/data';
import { useEffect, useState } from 'react';

const date = new Date().toISOString()?.split('T')[0]?.split("-").reverse().join("/");
const time = String(new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})).split(' ')[1]?.split(':')

const exactTime = time[0]
const meridian = time[2]?.split("")?.slice(-2)?.join("");

function DataState({ children }) {
  const [name, setName] = useState('');
  const [sellingType, setSellingType] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [dataDate, setDataDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");
  const [phone, setPhone] = useState('');
  const [data, setData] = useState([]) 

  function getHours(d) {
    let h = parseInt(d.split(':')[0]);
    if (d.split(':')[1].split(' ')[1] === "PM") {
        h = h + 12;
    }
    return h;
  }

   useEffect(() => {
    const getAvailableSlots =[...availableSlots]?.filter(slot => {
      let startTime =  new Date().setHours(getHours(`${exactTime}:00 ${meridian}`), 0, 0);
      let endTime = new Date(startTime)
      endTime = endTime.setHours(getHours(slot?.startSlot), 0, 0);
      if(startTime < endTime){
        return slot;
      }
    });

    setData(getAvailableSlots)

    if (!getAvailableSlots.length) {
      let day = new Date();
      let setDay = day.setDate(day.getDate() + 1);
      setDay = new Date(setDay)
      setDataDate(setDay);
      setData([...availableSlots]);
     }
   }, [])

  return (
    <DataContext.Provider value={{ priceList, name, setName, sellingType, setSellingType, location, setLocation, address, setAddress, dataDate, setDataDate, selectedSlot, setSelectedSlot, data, phone, setPhone }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataState;
