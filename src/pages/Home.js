import Card from 'components/card/Card';
import Banner from 'components/ui/Banner';
import Breaker from 'components/ui/Breaker';
import MainButton from 'components/ui/buttons/MainButton';
import classes from './styles/Home.module.css';
import MapIcon from '../assets/icons/map.png';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from 'store/data/DataContext';
import UIContext from 'store/ui/UiContext';

function Home() {
  const { allAvailableLocations } = useContext(DataContext);
  const {handlePickUpClick} = useContext(UIContext);
  const availableLocations = allAvailableLocations?.map(location => location?.name).join(' ');
  return (
    <div className={classes['home-container']}>
      <div className={classes['headline-container']}>
        <p style={{ fontWeight: "600" }} className='fs-2'>
          <span className={classes['heading']}>Clean your space, Earn some</span> <br/>
        </p>
        <p style={{ fontWeight: "600" }} className='fs-2'>
          <span className={`${classes['heading-highlight']}`}>Cash</span>
        </p>
        <p style={{ fontWeight: "600" }} className='fs-2'>
          <span className={classes['heading']}>call your local </span>
        </p>
        <p style={{ fontWeight: "600" }} className='fs-2'>
          <span className={classes['heading-highlight']}>kabadisalekaro today!</span>
        </p>
      </div>
      <Breaker />
      <div onClick={() => handlePickUpClick()}>
        <MainButton name="Block Your PickUp" />
      </div>
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
