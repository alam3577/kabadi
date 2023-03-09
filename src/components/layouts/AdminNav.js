import { NavLink } from 'react-router-dom';
import TrashIcon from '../../assets/icons/trash-can.png';
import classes from './css/Nav.module.css';
export const AdminNav = () => {
  return (
  <div className={classes.container}>
    <nav className={classes['nav-container']}>
      <div className={classes['left-nav']}>
        <NavLink style={{ textDecoration: 'none' }} to="/">
          <img src={TrashIcon} alt="" srcSet="" />
        </NavLink>
        <span className={classes['logo-text']}>Kabadiwallaa</span>
      </div>
        <ul className={classes['right-nav-item']}>
            <NavLink className={classes['right-nav-item-list']} to="/admin/dashboard"> Dashboard </NavLink>
            <NavLink className={classes['right-nav-item-list']} to="/admin/orders"> Order </NavLink>
            <NavLink className={classes['right-nav-item-list']} to="/admin/locations"> Locations </NavLink>
        </ul>
    </nav>
  </div>
)};

export default AdminNav;
