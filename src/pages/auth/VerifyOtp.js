import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import DataContext from "store/data/DataContext";
import classes from "./styles/common.module.css";

const OTP_EXPIRATION_TIME = 300
function VerifyOtp() {
  const [remainingTime, setRemainingTime] = useState(OTP_EXPIRATION_TIME);
  const [otp, setOtp] = useState('');

  const { handleOTPSubmit } = useContext(DataContext);
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
    }, 1000);
  
    return () => {
      clearInterval(interval);
    };
  }, []);

  const remainingTimeFormatted = useMemo(() => {
    const minutes = Math.floor(remainingTime / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (remainingTime % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [remainingTime]);

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleOTPSubmit(otp);
  };
  return (
    <Form className={classes["otp-form"]} onSubmit={handleSubmit}>
      <Form.Group controlId="formOtp" className="mb-2">
        <Form.Label>Enter OTP</Form.Label>
        <InputGroup>
          <FormControl type="text" value={otp} onChange={handleOtpChange} />
        </InputGroup>
      </Form.Group>
      <p className="text-end fs-6 text-danger fw-bold">{remainingTime  > 0 ? `OTP will be Expires In ${remainingTimeFormatted}` : "OtP Expired"}</p>
      <Button disabled={remainingTime < 1} type="submit">Submit</Button>
    </Form>
  );
}

export default VerifyOtp;
