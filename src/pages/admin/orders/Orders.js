import { useContext } from "react";
import DataContext from "store/data/DataContext";
import Order from "./Order";
import classes from "./Orders.module.css";
function Orders() {
  const { allOrders } = useContext(DataContext);
  console.log({allOrders})
  return (
    <div className={classes['order-container']}>
      {
        [...allOrders].reverse()?.map((order, i) => (
          <Order key={order?._id} id={order?._id} count={i+1} name={order?.name} phone={order?.phone} date={order?.date} time={order?.time} address={order.address}  />
        ))
      }    
    </div>
  );
}

export default Orders;
