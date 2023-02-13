import classes from './styles/Common.module.css';

function Banner({ name }) {
  return <div className={classes.banner}>{name}</div>;
}

export default Banner;
