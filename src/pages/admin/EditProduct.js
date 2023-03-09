import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from './styles/common.module.css';

function EditProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = { name, price, image };
    console.log(newProduct);
  };

  return (
    <div className={`container ${classes.addProduct}`}>
    <Button variant="primary" type="submit">
        Back To Dashboard
    </Button>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formProductName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formProductPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formProductImage">
        <Form.Label>
          Add Image
          <Form.Control
            type="file"
            placeholder="Enter image URL"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </Form.Label>
      </Form.Group>
      <Button variant="success" type="submit">
        Add Product
      </Button>
    </Form>
    </div>
  );
}

export default EditProduct;
