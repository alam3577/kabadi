import PriceCard from 'components/card/PriceCard';
import classes from './styles/Price.module.css';
import { useContext } from 'react';
import DataContext from 'store/data/DataContext';

function Price() {
  const { priceList } = useContext(DataContext);
  // eslint-disable-next-line no-console
  console.log({ priceList });
  return (
    <div className={classes['price-container']}>
      {priceList?.map((elem) => {
        const { _id, name, price, image } = elem || {};
        return <PriceCard key={_id} name={name} price={price} image={image} />;
      })}
    </div>
  );
}

export default Price;
