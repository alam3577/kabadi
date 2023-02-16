import Breaker from 'components/ui/Breaker'
import React from 'react'
import classes from "./css/Contact.module.css";

function Contact() {
  return (
    <div className={classes['contact-container']}>
       <h1>Contact</h1>
       <Breaker />
       <p>Hyderabad</p>
       <div>
          <p>abc@gmail.com</p>
          <a href="tel:7002729745">Call</a>
          <span>+91 9876543212</span>
          <a href="https://api.whatsapp.com/send?phone=7002729745">Send Message</a>
       </div>
    </div>
  )
}

export default Contact