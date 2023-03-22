import moment from 'moment';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import OrderServices from 'services/order.services';
import DataContext from 'store/data/DataContext';
import UIContext from 'store/ui/UiContext';
import classes from "./Orders.module.css";

const orderServices = new OrderServices();

function Order({ id, count, name, phone, sellingType, location, time, date, address}) {
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
       console.log({delRes: res});
    } catch (error) {
      toast.warn(error?.response?.data?.message);
    }finally{
        setSpinner(false);
    }
  }
  return (
    <div class={classes["order-summary"]}>
        <h2>Order {count} </h2>
        <p>
          <strong>Name:</strong> <span className="px-2">{name}</span>
        </p>
        <p>
          <strong>Phone:</strong> <span className="px-2">{phone}</span>
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
        <Button onClick={() => handleOrderDeleteClick(id)} className="btn btn-danger">Delete</Button>
      </div>
  )
}

export default Order