import Banner from 'components/ui/Banner';
import Breaker from 'components/ui/Breaker';
import BookingImage from '../assets/images/booking.png';
import LeftArrowIcon from '../assets/icons/left-arrow.png';
import classes from './styles/Pickup.module.css';

function Pickup() {
  return (
    <div className={classes['pickup-container']}>
      <h3 className={classes.banner}>Book Your Pickup</h3>
      <h3 className={classes.banner}>Today</h3>
      <Breaker />
      <Banner name="Now Available in Hyderabad" />
      <div>
        <img
          className={classes['booking-image']}
          src={BookingImage}
          alt=""
          srcSet=""
        />
      </div>
      <section className={classes['name-section']}>
        <p className={classes['intro-text']}>
          Hi, Im Booking Assit <br /> Welcome to Scrapzon
        </p>
        <input type="text" placeholder="What Is Your Name" />
        <button>Continue</button>
      </section>
      <section>
        <p className={classes['intro-text']}>
          Pleased to meet you <br /> How can we help?
        </p>
        <select>
          <option disabled value="">
            Please Select
          </option>
          <option value="sell">SELL YOUR SCRAP</option>
          <option value="donate">DONATE YOUR SCRAP</option>
        </select>
        <div>
          <button className={classes['left-btn']}>
            <img
              className={classes['left-icon']}
              src={LeftArrowIcon}
              alt="LeftArrowIcon"
              srcSet=""
            />
          </button>
          <button>Continue</button>
        </div>
      </section>
      <section>
        <Banner name="Please Enter Your Area for" />
        <Banner name="Scrap" />
        <select>
          <option value="">Begumpet</option>
          <option value="">Amerpeet</option>
        </select>
      </section>
      <section>
        <Banner name="Please Give Your Home Address" />
      </section>
    </div>
  );
}

export default Pickup;
