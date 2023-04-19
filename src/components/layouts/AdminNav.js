import { NavLink } from 'react-router-dom';
import TrashIcon from '../../assets/icons/trash-can.png';
import classes from './css/Nav.module.css';
import MenuIcon from '../../assets/icons/menu.png';
import { useContext } from 'react';
import UIContext from 'store/ui/UiContext';

export const AdminNav = () => {
  const { handleAdminMenuShow } = useContext(UIContext);

  return (
  <div className={classes.container}>
    <nav className={classes['nav-container']}>
      <div className={classes['left-nav']}>
        <NavLink style={{ textDecoration: 'none' }} to="/">
          <img src={TrashIcon} alt="" srcSet="" />
        </NavLink>
        <span className={classes['logo-text']}>Kabadisalekaro</span>
      </div>
      <div className={classes['menu-icon']} onClick={() => handleAdminMenuShow()}>
          <img src={MenuIcon} alt="" srcSet="" />
      </div>
    </nav>
  </div>
)};

export default AdminNav;
