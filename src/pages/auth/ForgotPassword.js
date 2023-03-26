import classes from "./styles/Login.module.css";
import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import AuthService from "services/auth.services";
import UIContext from "store/ui/UiContext";
import { useNavigate } from "react-router-dom";
import DataContext from "store/data/DataContext";

const authService = new AuthService();;

function ForgotPassword() {
  const navigate = useNavigate();
  const { setSpinner } = useContext(UIContext);
  const { forgotPasswordDetails, setForgotPasswordDetails, setOTP } = useContext(DataContext);

  const { phone } = forgotPasswordDetails;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) {
      return toast.warn('Please enter proper phone number')
    }
    try {
      setSpinner(true);
      const response = await authService.forgotPassword({ phone });
      if (response?.status === 'success') {
        setOTP(prevState => {
            return { ...prevState, resetPasswordOTP: true }
        });
        navigate('/verify-otp');
        toast.success('OTP Sent');
      }
      setSpinner(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setSpinner(false);
    }
  };

  const handleChange = name => e => {
    setForgotPasswordDetails(prevState => {
       return { ...prevState, [name]: e.target.value };
    })
  }

  return (
    <Form className={`${classes.container} mb-2`}>
      <Form.Group controlId="formBasicEmail" className="mb-2">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={handleChange("phone")}
        />
      </Form.Group>

      <Button onClick={handleSubmit} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ForgotPassword;
