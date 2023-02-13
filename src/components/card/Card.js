import classes from './styles/Card.module.css';

function Card({ icon, heading, text, btnName }) {
  return (
    <div className={classes['card-container']}>
      <div className={classes['card-content']}>
        <div className={classes.icon}>
          <img src={icon} alt={heading} srcSet="" />
        </div>
        <div className={classes.heading}>{heading}</div>
        <div className={classes.text}>{text}</div>
        <div className={classes.btn}>{btnName}</div>
      </div>
    </div>
  );
}

export default Card;
