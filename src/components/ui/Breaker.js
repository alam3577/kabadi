import classes from './styles/Common.module.css';
function Breaker() {
  return (
    <div className={classes['content-breaker']}>
      <hr className={classes['content-breaker-one']} />
      <hr className={classes['content-breaker-two']} />
    </div>
  );
}

export default Breaker;
