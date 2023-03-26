import moment from "moment";
import React, { useContext } from "react";
import DataContext from "store/data/DataContext";
import classes from "./styles/MyOrder.module.css";

function MyOrder() {
  const { myOrders } = useContext(DataContext);

  return (
    <div className={classes["main-container"]}>
      <h1>My Bookings</h1>
      {
        myOrders?.length ? myOrders?.map((order) => (
        <div key={order?._id} className={classes.container}>
          <div className={classes["booking-details"]}>
            <h2>Booking Details</h2>
            <p>
              <strong>Name:</strong> {order?.name}
            </p>
            <p>
              <strong>Phone:</strong> {order?.phone}
            </p>
            <p>
              <strong>Selling Type:</strong> {order?.sellingType}
            </p>
            <p>
              <strong>Pick-up Date:</strong> {String(moment(order?.pickUpDate)?._d)?.split(' ')?.slice(0,4).join(' ')}
            </p>
            <p>
              <strong>Pick-up Time:</strong> {order?.time}
            </p>
            <p>
              <strong>Pick-up Location:</strong> {order?.location}
            </p>
            <p>
              <strong>Pick-up Address:</strong> {order?.address}
            </p>
          </div>
        </div>
      )) : <p className="fs-3">No Orders Found</p>
      }
    </div>
  );
}

export default MyOrder;
