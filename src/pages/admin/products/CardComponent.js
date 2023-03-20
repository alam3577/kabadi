import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CloudenaryServices from "services/cloudenary.services";
import ProductServices from "services/product.services";
import DataContext from "store/data/DataContext";
import UIContext from "store/ui/UiContext";
import classes from './styles/common.module.css';
const productServices = new ProductServices();
const cloudenaryServices = new CloudenaryServices();
const CardComponent = ({data}) => {
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
      <Card style={{ width: "18rem" }}>
        <Card.Img className={`${classes['card-image']}`} variant="top" src={data?.photo} />
        <Card.Body>
          <Card.Title>{data?.name}</Card.Title>
          <Card.Text>Rs {data?.price}</Card.Text>
          <Button variant="primary"className="me-1" onClick={() => handleEditProductClick(data?._id)}>Edit</Button>
          <Button onClick={() => handleDeleteProductClick(data?._id)} variant="danger">Delete</Button>
        </Card.Body>
      </Card>
    );
  };

  export default CardComponent;