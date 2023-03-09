import React from "react";
import { useNavigate } from "react-router-dom";
import CardComponent from "./CardComponent";
import classes from "./styles/common.module.css";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className={classes.dashboard}>
      <div className="d-flex flex-row-reverse me-5">
        <button className="btn btn-primary">Add Product</button>
      </div>
      <div className={`d-flex flex-row justify-content-center align-items-center`}>
        <CardComponent
          image="https://picsum.photos/id/237/200/300"
          title="Card Title"
          price="20"
        />
      </div>
    </div>
  );
}

export default Dashboard;
