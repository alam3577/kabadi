import Card from 'components/card/Card';
import Banner from 'components/ui/Banner';
import Breaker from 'components/ui/Breaker';
import MainButton from 'components/ui/buttons/MainButton';
import classes from './styles/Home.module.css';
import MapIcon from '../assets/icons/map.png';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from 'store/data/DataContext';

function Home() {
  const { allAvailableLocations } = useContext(DataContext);
  const availableLocations = allAvailableLocations?.map(location => location?.name).join(' ');
  return (
    <div className={classes['home-container']}>
      <div className={classes['headline-container']}>
        <h2>
          <span className={classes['heading']}>Clean your space, Earn some</span> <br/>
        </h2>
        <h2>
          <span className={`${classes['heading-highlight']}`}>Cash</span>
        </h2>
        <h2>
          <span className={classes['heading']}>call your local </span>
        </h2>
        <h2>
          <span className={classes['heading-highlight']}>kabadiwallaa today!</span>
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
        text={`We are serving across twin cities and major areas includes ${ availableLocations }  ,etc.`}
        btnName="Call us now"
      />
    </div>
  );
}

export default Home;
