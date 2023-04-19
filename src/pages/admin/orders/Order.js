import moment from 'moment';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import OrderServices from 'services/order.services';
import DataContext from 'store/data/DataContext';
import UIContext from 'store/ui/UiContext';
import classes from "./Orders.module.css";
import { isAuthenticated, isUser } from 'utils/helper';

const orderServices = new OrderServices();

function Order({ id, count, registeredName, name, registeredPhone, phone, sellingType, location, time, date, address}) {
  const { getAllOrders } = useContext(DataContext);
  const { setSpinner } = useContext(UIContext);
  const ISTDateFormat = moment(date)?._d
  const pickUpDate = String(ISTDateFormat)?.split(' ').slice(0, 4).join(' ');
  const handleOrderDeleteClick = async (id) => {
    try {
       setSpinner(true);
       const res = await orderServices.deleteOrders(id);
       if (res.status === 'success') {
         toast.success('Oder is Deleted');
         getAllOrders();
       }
    } catch (error) {
      toast.warn(error?.response?.data?.message);
    }finally{
        setSpinner(false);
    }
  }
  return (
    <div className={classes["order-summary"]}>
        <p className='fs-2'>Order {count} </p>
        <p>
          <strong>Given Name:</strong> <span className="px-2">{name}</span> <br />
        </p>
        <p>
          <strong>Registered Name:</strong> <span className="px-2">{registeredName}</span>
        </p>
        <p>
          <strong>Given Phone:</strong> <span className="px-2">{phone}</span> <br />
        </p>
        <p>
        <strong>Registered Phone:</strong> <span className="px-2">{registeredPhone}</span>
        </p>
        <p>
          <strong>Selling Type:</strong> <span className="px-2">{sellingType}</span>
        </p>
        <p>
          <strong>Pick-up Time:</strong> <span className="px-2">{time}</span> 
        </p>
        <p>
          <strong>Pick-up Date:</strong> <span className="px-2">{pickUpDate}</span>
        </p>
        <p>
          <strong>Pick-up Location:</strong> <span className="px-2">{location}</span>
        </p>
        <p>
          <strong>Pick-up Address:</strong> <span className="px-2">{address}</span> 
        </p>
        { isAuthenticated() && isUser()?.role === 'super-admin' && <Button onClick={() => handleOrderDeleteClick(id)} className="btn btn-danger">Delete</Button>}
      </div>
  )
}

export default Order
