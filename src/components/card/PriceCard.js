import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CloudenaryServices from 'services/cloudenary.services';
import ProductServices from 'services/product.services';
import DataContext from 'store/data/DataContext';
import UIContext from 'store/ui/UiContext';
import classes from './styles/PriceCard.module.css';

const cloudenaryServices = new CloudenaryServices();
const productServices = new ProductServices();

function PriceCard({ _id, name, price, image, isAdmin }) {
  const { handleEditProductClick, getProductData } = useContext(DataContext);
   const { setSpinner } = useContext(UIContext);
   const navigate = useNavigate();

   const handleDeleteProductClick = async (id, public_id) => {
     try {
      setSpinner(true)
      const res = await productServices.deleteProduct(id);
      if (res?.data?.status === 'success') { 
       const cloudRes = await cloudenaryServices.removeImage({public_id});
       cloudRes.status === 200 ? toast.success('Product Deleted') : toast.error('Error In Deleting Product');
       getProductData();
      }
      setSpinner(false);
      navigate('/admin/dashboard');
     } catch (error) {
      toast.error(error?.response?.data?.message);
      setSpinner(false)
     }
   }
  return (
    <div className={classes['price-container']}>
      <div className={classes['price-items']}>
        <div className={classes['image']}>
          <img src={image} alt="" srcSet="" />
        </div>
        <div className={classes.name}> {name}</div>
        <div className={classes.price}>&#x20b9;{price} per kg</div>
          {
            isAdmin ? 
            <div>
              <button className="me-1 mt-1 btn btn-primary" onClick={() => handleEditProductClick(_id)}>Edit</button>
              <button className='btn btn-danger mt-1' onClick={() => handleDeleteProductClick(_id)}>Delete</button>
            </div> : null
          }
      </div>
    </div>
  );
}

export default PriceCard;
