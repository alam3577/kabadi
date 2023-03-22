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
        allOrders.length ?
        [...allOrders].reverse()?.map((order, i) => (
          <Order key={order?._id} id={order?._id} count={i+1} name={order?.name} phone={order?.phone} sellingType={order?.sellingType} location={order?.location} date={order?.date} time={order?.time} address={order.address}  />
        )) : <p className={classes['no-order-container']}>No Orders Found</p>
      }    
    </div>
  );
}

export default Orders;
