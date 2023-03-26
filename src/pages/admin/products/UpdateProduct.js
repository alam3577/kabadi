import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./styles/common.module.css";
import { Badge, Image } from "react-bootstrap";
import ProductServices from "services/product.services";
import CloudenaryServices from "services/cloudenary.services";
import UIContext from "store/ui/UiContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DataContext from "store/data/DataContext";
const productServices = new ProductServices();
const cloudenaryServices = new CloudenaryServices();

function UpdateProduct() {
  const { singleProductData } = useContext(DataContext);

  const [name, setName] = useState(singleProductData?.name);
  const [price, setPrice] = useState(singleProductData?.price);
  const [img, setImg] = useState({
    url: singleProductData?.photo,
    public_id: singleProductData?.public_id,
  });
  const { setSpinner } = useContext(UIContext);
  const { getProductData } = useContext(DataContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProduct = {
      name,
      price,
      photo: img.url,
      public_id: img?.public_id,
    };
    if (!name || !price || !img.url || !img?.public_id) {
       return toast.warn('Fields are missing Fill the form properly')
    }
    try {
      setSpinner(true);
      const { data } = await productServices.updateProduct(
        singleProductData?._id,
        updatedProduct
      );
      data.status === "success" && toast.success("Product Updated");
      getProductData();
      navigate("/admin/dashboard");
      setSpinner(false);
    } catch (error) {
      await cloudenaryServices.removeImage({ public_id: img?.public_id });
      toast.error(error?.response?.data?.message);
    } finally {
      setName("");
      setPrice("");
      setImg("");
      setSpinner(false);
    }
  };

  const fileUploadAndResize = async (e) => {
    try {
      const file = e.target.files[0];
      const image = await cloudenaryServices.resizeImage(file);
      setSpinner(true);
      const res = await cloudenaryServices.uploadImage({ image });
      setSpinner(false);
      setImg(res);
    } catch (err) {
      toast.error(err.message);
      setSpinner(false);
    }
  };

  const handleCloseImageClick = async (public_id) => {
    try {
      setSpinner(true);
      const res = await cloudenaryServices.removeImage({ public_id });
      if (res.status === 200) {
        setImg({});
        setSpinner(false);
      }
    } catch (error) {
      setSpinner(false);
      toast.error(error.message);
    }
  };

  const handleBackToDashboardBtnClick = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className={`container ${classes.addProduct}`}>
      <Button
        variant="primary"
        type="submit"
        onClick={handleBackToDashboardBtnClick}
      >
        Back To Dashboard
      </Button>
      {Object.keys(singleProductData).length ? (
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

          {Object.keys(img).length ? (
            <div className={`${classes["selected-img"]}`}>
              <Image height="70px" src={img?.url} thumbnail />
              <Badge
                className={classes["img-badge"]}
                bg="danger"
                pill
                onClick={() => handleCloseImageClick(img?.public_id)}
              >
                Close
              </Badge>
            </div>
          ) : (
            ""
          )}
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
            Update Product
          </Button>
        </Form>
      ) : (
        <div>No Item found To Update </div>
      )}
    </div>
  );
}

export default UpdateProduct;
