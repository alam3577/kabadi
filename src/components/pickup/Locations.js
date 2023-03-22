import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import LocationServices from "services/location.services";
import DataContext from "store/data/DataContext";
import UIContext from "store/ui/UiContext";
import CounterBtn from "./CounterBtn";
import classes from "./styles/common.module.css"

const locationServices = new LocationServices();

function Locations() {
  const [allLocations, setAllLocations] = useState([]);
  const {orderDetails, setOrderDetails} = useContext(DataContext);
  const { location } = orderDetails;
  const {setSpinner} = useContext(UIContext);

  const handleOnChange = name => e => {
    setOrderDetails(prevState => {
     return {...prevState, [name]: e.target.value}
    })
  }

  const loadAllLocations = async () => {
    try {
      setSpinner(true);
      const res = await locationServices.getAllLocation();
      if (res.status === 'success') {
        setAllLocations(res?.data?.locations)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);    
    }finally{
      setSpinner(false);
    }
  }

  useEffect(()=> {
    loadAllLocations();
  }, []);

  return (
    <section className={classes['locations']}>
      <p className={classes["intro-text"]}>
        Please Enter Your Area for <br /> Scrap{" "}
      </p>
      <select value={location} onChange={handleOnChange("location")} className={classes["selling-type"]}>
        <option selected value="">Please Select Your Area</option>
        {
          allLocations.length ?
          allLocations?.map(location => (
            <option key={location?._id} value={location?.name}>{location?.name}</option>
          )) : <option value="">No Location Found</option>
        }
      </select>
      <CounterBtn check={location?.length} errMessage="Please Fill your Location"/>
    </section>
  );
}

export default Locations;
