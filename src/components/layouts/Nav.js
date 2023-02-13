import { NavLink } from 'react-router-dom';
import MenuIcon from '../../assets/icons/menu.png';
import TrashIcon from '../../assets/icons/trash-can.png';
import classes from './css/Nav.module.css';
export const Nav = () => (
  <div className={classes.container}>
    <nav className={classes['nav-container']}>
      <div className={classes['left-nav']}>
        <NavLink style={{ textDecoration: 'none' }} to="/">
          <img src={TrashIcon} alt="" srcSet="" />
        </NavLink>
        <span className={classes['logo-text']}>Scrapzon</span>
      </div>
      <div className={classes['menu-icon']}>
        <img src={MenuIcon} alt="" srcSet="" />
      </div>
    </nav>
  </div>
);

export default Nav;
