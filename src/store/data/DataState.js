import DataContext from './DataContext';
import { priceList } from 'utils/data';
import { useContext, useEffect, useState } from 'react';
import ProductServices from 'services/product.services';
import { toast } from 'react-toastify';
import UIContext from 'store/ui/UiContext';
import { useNavigate } from 'react-router-dom';
import LocationServices from 'services/location.services';
import OrderServices from 'services/order.services';
import SlotServices from 'services/slot.services';

const productServices = new ProductServices();
const locationServices = new LocationServices();
const orderServices = new OrderServices();
const slotServices = new SlotServices();

function DataState({ children }) {
  const [orderDetails, setOrderDetails] = useState({
    name: "test",
    phone: "7002729745",
    sellingType: "sell",
    location: "Amerpet",
    address: "old custum busti begumpet",
    dataDate: "",
    selectedSlot: "",
    selectedSlotId: "",
  });
  const [productData, setProductData] = useState([]);
  const [singleProductData, setSingleProductData] = useState({});
  const [singleSlotData, setSingleSlotData] = useState({});
  const [allAvailableLocations, setAllAvailableLocation] = useState([]);
  const [allAvailableSlots, setAllAvailableSlots] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const {setSpinner, setCount} = useContext(UIContext);
  const navigate = useNavigate();
  
  const { name, phone, sellingType, location, address, dataDate, selectedSlot, selectedSlotId } = orderDetails;

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

  const getAllSlots = async () => {
    try {
      setSpinner(true);
      const slots = await slotServices.getSlots();
      if (slots?.status === 'success') {
        setAllAvailableSlots(slots?.data?.slots)
      }
      setSpinner(false);
     } catch (error) {
      toast.error(error?.response?.data?.message);
      setSpinner(false);
     }
  }

  useEffect(() => {
    getProductData()
    getAllLocations();
    getAllOrders();
    getAllSlots();
  }, []);

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
      sellingType,
      location,
      date: dataDate,
      time: selectedSlot,
      address,
      selectedSlot: selectedSlotId,
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
      setOrderDetails({
        name: "",
        phone: "",
        sellingType: "",
        location: "",
        address: "",
        dataDate: "",
        selectedSlot: "",
        selectedSlotId: "",
      })
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
    <DataContext.Provider value={{ orderDetails, setOrderDetails, priceList, productData, getProductData, handleEditProductClick, singleProductData, allAvailableLocations, getAllLocations, setAllAvailableLocation, handleConfirmBookingClick, getAllOrders, allOrders, getAllSlots, allAvailableSlots, setAllAvailableSlots, singleSlotData, setSingleSlotData, }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataState;
