import PriceCard from 'components/card/PriceCard';
import classes from './styles/Price.module.css';
import { useContext } from 'react';
import DataContext from 'store/data/DataContext';

function Price() {
  const { productData } = useContext(DataContext);
  return (
    <div className={classes['price-container']}>
      {productData?.map((elem) => {
        const { _id, name, price, photo } = elem || {};
        return <PriceCard key={_id} name={name} price={price} image={photo} />;
      })}
    </div>
  );
}

export default Price;
