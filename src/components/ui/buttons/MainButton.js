import classes from './styles/Common.module.css';
function MainButton({ name, btnClick }) {
  return (
    <div onClick={() => btnClick && btnClick()} className={classes['btn-container']}>
      <button className={classes.btn}>{name}</button>
    </div>
  );
}

export default MainButton;
