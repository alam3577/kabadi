import classes from './styles/PriceCard.module.css';

function PriceCard({ name, price, image }) {
  return (
    <div className={classes['price-container']}>
      <div className={classes['price-items']}>
        <div className={classes['image']}>
          <img src={image} alt="" srcSet="" />
        </div>
        <div className={classes.name}> {name}</div>
        <div className={classes.price}>&#x20b9;{price} per kg</div>
      </div>
    </div>
  );
}

export default PriceCard;
