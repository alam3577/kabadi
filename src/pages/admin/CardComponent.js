import { Button, Card } from "react-bootstrap";
import classes from './styles/common.module.css';
const CardComponent = ({ image, title, price }) => {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img className={`${classes['card-image']}`} variant="top" src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{price}</Card.Text>
          <Button variant="primary" className="me-1">Edit</Button>
          <Button variant="danger">Delete</Button>
        </Card.Body>
      </Card>
    );
  };

  export default CardComponent;