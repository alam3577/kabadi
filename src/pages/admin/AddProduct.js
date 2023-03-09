import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./styles/common.module.css";
import { Badge, Image } from "react-bootstrap";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState({});

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        520,
        520,
        "png",
        100,
        0,
        (uri) => {
          resolve(
            axios
              .post(`${process.env.REACT_APP_API}/upload-image`, { image: uri })
              .then((res) => setImg(res?.data))
              .catch((err) => console.log({ err }))
          );
        },
        "base64"
      );
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = { name, price, img };
    console.log(newProduct);
  };

  const fileUploadAndResize = async (e) => {
    console.log(e.target.files[0]);
    console.log({ API: process.env.REACT_APP_API });
    try {
      const file = e.target.files[0];
      await resizeFile(file);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseImageClick = async (public_id) => {
    console.log({public_id});
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API}/remove-image`, {name: "sajjad"});
      console.log({res})
    } catch (error) {
      
    }
  }

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

        <div className={`${classes['selected-img']}`}>
          <Image height='70px' src={img?.url} thumbnail />
          <Badge className={classes['img-badge']} bg="danger" pill onClick={() => handleCloseImageClick(img?.public_id)}>Close</Badge>
        </div>
        <Form.Group controlId="formProductImage">
          <Form.Label className="btn btn-primary btn-raised">
            Add Image
            <Form.Control
              type="file"
              hidden
              accept="images/*"
              placeholder="Enter image URL"
              onChange={fileUploadAndResize}
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

export default AddProduct;
