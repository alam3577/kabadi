import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "services/auth.services";
import DataContext from "store/data/DataContext";
import UIContext from "store/ui/UiContext";
import classes from "./styles/common.module.css";

const authServices = new AuthService();

function ResetPassword() {
  const { forgotPasswordDetails, setForgotPasswordDetails, setOTP } = useContext(DataContext);
  const { password, confirmPassword } = forgotPasswordDetails;
  const navigate = useNavigate();
  const {setSpinner} = useContext(UIContext);
  const handleChange = name => e => {
    setForgotPasswordDetails( prevState => {
        return { ...prevState, [name]: e.target.value };
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password || !confirmPassword) {
        toast.warn('password and confirm Password Required');
    }
    setSpinner(true);
    try {
      const res = await authServices.resetPassword(forgotPasswordDetails);
      if (res.status === 'success') {
         setOTP(prevState => {
            return { ...prevState, resetPasswordOTP: false }
         })
         setForgotPasswordDetails({
           phone: "",
           otp: "",
           password: "",
           confirmPassword: "",
         });
         toast.success('Password Changed, Please Login In');
         navigate('/login');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }finally{
      setSpinner(false);
    }
  };
  return (
    <Form className={classes["reset-password-form"]} onSubmit={handleSubmit}>
     <Form.Group controlId="formBasicPassword" className="mb-2">
        <Form.Label>Enter Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange("password")}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword" className="mb-2">
        <Form.Label>Confirm Your Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={confirmPassword}
          onChange={handleChange("confirmPassword")}
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default ResetPassword;
