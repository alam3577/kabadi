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
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("12345");
  const navigate = useNavigate();
  const { setSpinner } = useContext(UIContext);
  const { getProductData } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.warn('Please fill form properly')
    }
    try {
      setSpinner(true);
      const response = await authService.login({email, password});
      console.log({response});
      if (response?.data?.status === 'success') {
        authService.authenticate(response?.data?.token);
        toast.success('You are logged In');
        navigate('/admin/dashboard');
        getProductData();
      }
      setSpinner(false);
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  return (
    <Form className={classes.container}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
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
        Submit
      </Button>
    </Form>
  );
}

export default LoginPage;
