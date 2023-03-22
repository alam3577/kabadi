import Banner from "components/ui/Banner";
import Breaker from "components/ui/Breaker";
import BookingImage from "../assets/images/booking.png";
import classes from "./styles/Pickup.module.css";
import "react-datepicker/dist/react-datepicker.css";
import Name from "components/pickup/Name";
import Selling from "components/pickup/Selling";
import Locations from "components/pickup/Locations";
import Address from "components/pickup/Address";
import DateSelection from "components/pickup/DateSelection";
import { useContext } from "react";
import UIContext from "store/ui/UiContext";
import Summery from "components/pickup/Summery";
import Home from "./Home";

function Pickup() {
  const { count } = useContext(UIContext);
  function getActiveComponent(count) {
    console.log({ count });
    switch (count) {
      case 0:
        return <Name />;
      case 1:
        return <Selling />;
      case 2:
        return <Locations />;
      case 3:
        return <Address />;
      case 4:
        return <DateSelection />;
      case 5:
        return <Summery />
      default:
       return <Home />;
    }
  }

  return (
    <div className={classes["pickup-container"]}>
      <h3 className={classes.banner}>Book Your Pickup</h3>
      <h3 className={classes.banner}>Today</h3>
      {count !== 4 && (
        <>
        <Breaker />
        <Banner name="Now Available in Hyderabad" />
        <div>
          <img
            className={classes["booking-image"]}
            src={BookingImage}
            alt=""
            srcSet=""
          />
        </div>
        </>
      )}
      {getActiveComponent(count)}
    </div>
  );
}

export default Pickup;
