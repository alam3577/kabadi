import Banner from "components/ui/Banner";
import Breaker from "components/ui/Breaker";
import BookingImage from "../assets/images/booking.png";
import LeftArrowIcon from "../assets/icons/left-arrow.png";
import classes from "./styles/Pickup.module.css";

function Pickup() {
  return (
    <div className={classes["pickup-container"]}>
      <h3 className={classes.banner}>Book Your Pickup</h3>
      <h3 className={classes.banner}>Today</h3>
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
      <section className={classes["name-section"]}>
        <p className={classes["intro-text"]}>
          Hi, Im Booking Assit <br /> Welcome to Scrapzon
        </p>
        <input type="text" placeholder="What Is Your Name" />
        <button className={classes["btn-continue"]}>Continue</button>
      </section>
      <section className={classes["selling"]}>
        <p className={classes["intro-text"]}>
          Pleased to meet you <br /> How can we help?
        </p>
        <select className={classes["selling-type"]}>
          <option selected value="">
            {" "}
            Please Select{" "}
          </option>
          <option value="sell">SELL YOUR SCRAP</option>
          <option value="donate">DONATE YOUR SCRAP</option>
        </select>
        <div className={classes["selling-type-btn"]}>
          <button className={classes["selling-type-left-btn"]}>
            <img
              className={classes["left-icon"]}
              src={LeftArrowIcon}
              alt="LeftArrowIcon"
              srcSet=""
            />
          </button>
          <button className={classes["selling-type-right-btn"]}>
            Continue
          </button>
        </div>
      </section>
      <section>
        <p className={classes["intro-text"]}>Please Enter Your Area for <br /> Scrap </p>
        <select className={classes["selling-type"]}>
          <option value="">Begumpet</option>
          <option value="">Amerpeet</option>
        </select>
      </section>
      <section className={classes['home-address']}>
      <p className={classes["intro-text"]}>Please Give Your Home Address </p>
      <div className="address-container">
      <h6>Home Address</h6>
      <textarea placeholder="Write Your Address Here" name="" className={classes['address']} id="address" cols="30" rows="5"></textarea>
      </div>
      </section>
      <section className={classes['date-section']}>
      <p className={classes["intro-text"]}>Please Select Date To Collect Your Scrap </p>
      <div className="address-container">
      <h6>Date</h6>
      <input className={classes['date']} type="date" name="" id="" />
      </div>
      </section>
    </div>
  );
}

export default Pickup;
