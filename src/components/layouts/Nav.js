import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UIContext from 'store/ui/UiContext';
import MenuIcon from '../../assets/icons/menu.png';
import TrashIcon from '../../assets/icons/trash-can.png';
import classes from './css/Nav.module.css';
export const Nav = () => {
  const {handleShow} = useContext(UIContext)
  return (
  <div className={classes.container}>
    <nav className={classes['nav-container']}>
      <div className={classes['left-nav']}>
        <NavLink style={{ textDecoration: 'none' }} to="/">
          <img src={TrashIcon} alt="" srcSet="" />
        </NavLink>
        <span className={classes['logo-text']}>Kabadiwallaa</span>
      </div>
      <div className={classes['menu-icon']} onClick={() => handleShow()}>
        <img src={MenuIcon} alt="" srcSet="" />
      </div>
    </nav>
  </div>
)};

export default Nav;
