import classes from './styles/Common.module.css';
function MainButton({ name }) {
  return (
    <div className={classes['btn-container']}>
      <button className={classes.btn}>{name}</button>
    </div>
  );
}

export default MainButton;
