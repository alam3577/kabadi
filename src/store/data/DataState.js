import DataContext from './DataContext';
import { availableSlots, priceList } from 'utils/data';
import { useContext, useEffect, useState } from 'react';
import ProductServices from 'services/product.services';
import { toast } from 'react-toastify';
import UIContext from 'store/ui/UiContext';
import { useNavigate } from 'react-router-dom';
import LocationServices from 'services/location.services';
import OrderServices from 'services/order.services';

const date = new Date().toISOString()?.split('T')[0]?.split("-").reverse().join("/");
const time = String(new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})).split(' ')[1]?.split(':')

const exactTime = time[0]
const meridian = time[2]?.split("")?.slice(-2)?.join("");
const productServices = new ProductServices();
const locationServices = new LocationServices();
const orderServices = new OrderServices();

function DataState({ children }) {
  const [name, setName] = useState('');
  const [sellingType, setSellingType] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [dataDate, setDataDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [phone, setPhone] = useState('');
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [singleProductData, setSingleProductData] = useState({});
  const [allAvailableLocations, setAllAvailableLocation] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const {setSpinner, setCount} = useContext(UIContext);
  const navigate = useNavigate();

  const getProductData = async () => {
    try { 
      setSpinner(true);
      const res = await productServices.getProducts();
      setProductData(res?.data?.data?.products);
      setSpinner(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  const getAllLocations = async() => {
    try {
     setSpinner(true);
     const location = await locationServices.getAllLocation();
     if (location?.status === 'success') {
        setAllAvailableLocation(location?.data?.locations)
     }
     console.log("THIS IS CALLED");
     setSpinner(false);
    } catch (error) {
     console.log({error});
     setSpinner(false);
    }
  }

  useEffect(() => {
    getProductData()
    getAllLocations();
    getAllOrders();
  }, []);

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

   const handleEditProductClick = async (id) => {
     console.log({id});
     try {
       setSpinner(true);
       const {data} = await productServices.getProduct(id);
       setSingleProductData(data?.data?.products);
       navigate('/admin/update-product');
       setSpinner(false);
     } catch (error) {
       toast.error(error?.response?.data?.message);
     }
   }

   const handleConfirmBookingClick = async () => {
    const newOrder = {
      name,
      phone,
      date: dataDate,
      time: selectedSlot,
      address
    }
    try {  
      setSpinner(true);
      const res = await orderServices.addOrders(newOrder);
      if (res.status === 'success') {
        toast.success("your booking is confirmed, We will Connect soon"); 
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }finally{
      setName("");
      setPhone('');
      setDataDate(null);
      setSelectedSlot('');
      setAddress('');
      setSpinner(false);
      setCount(0);
    }
 };

  const getAllOrders = async () => {
    try {
      setSpinner(true);
      const res = await orderServices.getAllOrders(); 
      console.log({resOR: res});
      if (res?.status === 'success') {
        setAllOrders(res?.data?.orders)
      } 
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }finally{
      setSpinner(false);
    }
  }

  return (
    <DataContext.Provider value={{ priceList, name, setName, sellingType, setSellingType, location, setLocation, address, setAddress, dataDate, setDataDate, selectedSlot, setSelectedSlot, data, phone, setPhone, productData, getProductData, handleEditProductClick, singleProductData, allAvailableLocations, getAllLocations, setAllAvailableLocation, handleConfirmBookingClick, getAllOrders, allOrders }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataState;
