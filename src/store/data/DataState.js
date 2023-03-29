import DataContext from './DataContext';
import { useContext, useEffect, useState } from 'react';
import ProductServices from 'services/product.services';
import { toast } from 'react-toastify';
import UIContext from 'store/ui/UiContext';
import { useNavigate } from 'react-router-dom';
import LocationServices from 'services/location.services';
import OrderServices from 'services/order.services';
import SlotServices from 'services/slot.services';
import AuthService from 'services/auth.services';
import { isAuthenticated, isUser } from 'utils/helper';

const productServices = new ProductServices();
const locationServices = new LocationServices();
const orderServices = new OrderServices();
const slotServices = new SlotServices();
const authServices = new AuthService();

function DataState({ children }) {
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    phone: "",
    sellingType: "",
    location: "",
    address: "",
    dataDate: "",
    selectedSlot: "",
    selectedSlotId: "",
  });

  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [forgotPasswordDetails, setForgotPasswordDetails] = useState({
    phone: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOTP] = useState({
     signupOTP: false,
     resetPasswordOTP: false,
  });

  const [myOrders, setMyOrders] = useState([]);
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

  const getMyOrders = async () => {
    try {
      setSpinner(true);
      const res = await orderServices.getMyOrders();
      if (res?.status === "success") {
        setMyOrders(res?.data?.order);
      }
      setSpinner(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setSpinner(false);
    }
  };

  const getAllLocations = async() => {
    try {
     setSpinner(true);
     const location = await locationServices.getAllLocation();
     if (location?.status === 'success') {
        setAllAvailableLocation(location?.data?.locations)
     }
     setSpinner(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
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
    if(isUser() && isAuthenticated && isUser()?.role === 'admin'){
      getAllOrders();
    }
    if (isUser() && isAuthenticated && isUser()?.role === 'user') {
      getMyOrders();
    }
    getAllSlots();
  }, []);

   const handleEditProductClick = async (id) => {
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
      user: isUser()?._id,
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
        getMyOrders();
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
      if (res?.status === 'success') {
        setAllOrders(res?.data?.orders);
      } 
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }finally{
      setSpinner(false);
    }
  }

  const handleSIgnUpOTPSubmit = async (otp) => {
    try {
      setSpinner(true);
     const { phone } = userDetails;
     const res = await authServices.verifySignUpOTP({ phone, otp });
     if (res.status === 'success') {
      authServices.authenticate(res?.token, res?.data?.user);
      toast.success('You are logged In');
      if (res?.data?.user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (res?.data?.user?.role === 'user'){
        navigate('/');
      }
      getMyOrders();
      setUserDetails({
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",
    })
      setOTP(prevState => {
        return { ...prevState, signupOTP: false }
      });
      getProductData();
     }
    }catch(error){
      toast.error(error?.response?.data?.message);
    }finally{
      setSpinner(false);
    }
  }

  const handleResetPasswordOTP = async (otp) => {
    try {
     setSpinner(true);
     const { phone } = forgotPasswordDetails;
     const res = await authServices.verifyForgotPasswordOTP({ phone, otp });
     if (res.status === 'success') {
       setForgotPasswordDetails(prevState => {
         return { ...prevState, otp}
        });
        toast.success('OTP verified');
        navigate('/reset-password');
     }
    }catch(error){
      toast.error(error?.response?.data?.message);
    }finally{
      setSpinner(false);
    }
  }

  const handleOTPSubmit = async (submittedOTP) => {
    const { signupOTP, resetPasswordOTP } = otp;
    signupOTP && await handleSIgnUpOTPSubmit(submittedOTP);
    resetPasswordOTP && handleResetPasswordOTP(submittedOTP);
  }

  return (
    <DataContext.Provider value={{ myOrders, getMyOrders, forgotPasswordDetails, setForgotPasswordDetails, orderDetails, setOrderDetails, productData, getProductData, handleEditProductClick, singleProductData, allAvailableLocations, getAllLocations, setAllAvailableLocation, handleConfirmBookingClick, getAllOrders, allOrders, getAllSlots, allAvailableSlots, setAllAvailableSlots, singleSlotData, setSingleSlotData, userDetails, setUserDetails, otp, setOTP, handleOTPSubmit }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataState;
