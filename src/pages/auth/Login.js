import classes from "./styles/Login.module.css";
import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import AuthService from "services/auth.services";
import UIContext from "store/ui/UiContext";
import { useNavigate } from "react-router-dom";
import DataContext from "store/data/DataContext";

const authService = new AuthService();;

function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setSpinner } = useContext(UIContext);
  const { getProductData, getMyOrders, getAllOrders } = useContext(DataContext);

  const handleForgotPassword = async () => {
    navigate('/forgot-password');
  }

  const handleSignUp = () => {
    navigate('/signup');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !password) {
      return toast.warn('Please fill form properly')
    }
    try {
      setSpinner(true);
      const response = await authService.login({phone, password});
      if (response?.status === 'success') {
        authService.authenticate(response?.token, response?.data?.user);
        toast.success('You are logged In');
        if (response?.data?.user?.role === 'admin') {
          getAllOrders();
          navigate('/admin/dashboard');
        } else if (response?.data?.user?.role === 'user'){
          navigate('/');
          getMyOrders();
        }
        getProductData();
      }
      setSpinner(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setSpinner(false);
    }
  };

  return (
    <Form className={classes.container}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword" className="mb-2">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      <Button onClick={handleSubmit} variant="primary" type="submit">
        Log In
      </Button>
      <div className="d-flex justify-content-center align-items-center">
      <Button
        variant="link"
        onClick={handleForgotPassword}
        className="ml-1"
        style={{ fontSize: "17px" }}
      >
        Forgot Password?
      </Button>
      <Button
        variant="link"
        onClick={handleSignUp}
        style={{ fontSize: "17px" }}
        className="ml-1"
      >
        Sign Up
      </Button>
      </div>
    </Form>
  );
}

export default LoginPage;
