import Card from 'components/card/Card';
import Banner from 'components/ui/Banner';
import Breaker from 'components/ui/Breaker';
import MainButton from 'components/ui/buttons/MainButton';
import classes from './styles/Home.module.css';
import MapIcon from '../assets/icons/map.png';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div className={classes['home-container']}>
      <div className={classes['headline-container']}>
        <h2>
          <span className={classes['heading']}>Sell Your</span>
        </h2>
        <h2>
          <span className={classes['heading']}>Scrape</span>
          <span className={classes['heading-highlight']}>Online</span>
        </h2>
        <h2>
          <span className={classes['heading']}>one window solution</span>
        </h2>
        <h2>
          <span className={classes['heading-highlight']}>Scrapzon</span>
        </h2>
      </div>
      <Breaker />
      <NavLink style={{ textDecoration: 'none' }} to="/book-pickup">
        <MainButton name="Block Your PickUp" />
      </NavLink>
      <Banner name="WE HAVE STANDARD PRICE" />
      <Breaker />
      <NavLink style={{ textDecoration: 'none' }} to="/price">
        <MainButton name="View price list" />
      </NavLink>
      <Card
        icon={MapIcon}
        heading="Service Areas"
        text="We are serving across twin cities and major areas includes Hyderabad,Secunderabad, Madhapur, Gachibowli, Jubilee Hills, Begumpet, Banjara Hills, Punjagutta, Manikonda,etc."
        btnName="Call us now"
      />
    </div>
  );
}

export default Home;
