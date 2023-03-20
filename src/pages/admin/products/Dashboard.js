import PriceCard from "components/card/PriceCard";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "store/data/DataContext";
import classes from "./styles/common.module.css";

function Dashboard() {
  const navigate = useNavigate();
  const { productData } = useContext(DataContext);
  const handleAddProductBtnClick = () => {
    navigate('/admin/add-product');
  }
  return (
    <div className={classes.dashboard}>
        <div className="d-flex flex-row-reverse me-5">
           <button className="btn btn-primary" onClick={handleAddProductBtnClick}>Add Product</button>
        </div>
        <div className={`d-flex flex-row justify-content-center align-items-center gap-2`}>
           <div className={classes['price-container']}>
                {productData?.map((elem) => {
                   const { _id, name, price, photo } = elem || {};
                   return <PriceCard key={_id} _id={_id} name={name} price={price} image={photo} isAdmin={true} />;
                })}
           </div>
       </div>
    </div>
  );
}

export default Dashboard;
