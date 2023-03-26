import classes from "./styles/Login.module.css";
import React, { useContext } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { toast } from "react-toastify";
import AuthService from "services/auth.services";
import UIContext from "store/ui/UiContext";
import { useNavigate } from "react-router-dom";
import DataContext from "store/data/DataContext";

const authService = new AuthService();;

function Signup() {
    const navigate = useNavigate();
    const { setSpinner } = useContext(UIContext);
    const { userDetails, setUserDetails, setOTP } = useContext(DataContext);
    const { name, phone, password, confirmPassword } = userDetails;

  const handleChange = name => e => {
     setUserDetails( prevState => {
        return { ...prevState, [name]: e.target.value }
     });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !password || !name || !confirmPassword) {
      return toast.warn('Please fill form properly')
    }
    try {
      setSpinner(true);
      const response = await authService.signUp({ name, phone, password, confirmPassword });
      if (response?.status === 'success') {
        setOTP(prevState => {
            return { ...prevState, signupOTP: true }
        });
        navigate('/verify-otp');
        toast.success("OTP Sent");
      }
      setSpinner(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setSpinner(false);
    }
  };

  return (
    <Form className={classes.container}>
       <p className="fs-3 fw-bold text-center">Sign Up</p>
       <Form.Group controlId="formName">
        <Form.Label>Enter Name</Form.Label>
        <InputGroup>
          <FormControl type="text" placeholder="Enter Name" value={name} onChange={handleChange("name")} />
        </InputGroup>
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={handleChange("phone")}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword" className="mb-2">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange("password")}
        />
      </Form.Group>

      <Form.Group controlId="formBasicConfirmPassword" className="mb-2">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={confirmPassword}
          onChange={handleChange("confirmPassword")}
        />
      </Form.Group>

      <Button onClick={handleSubmit} variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
}

export default Signup;
