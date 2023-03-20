import React from 'react';
import WhatsAppIcon from "../../assets/icons/whatsapp.png";
import CallIcon from "../../assets/icons/viber.png";
import classes from "./css/ContactMe.module.css";

function ContactMe() {
  return (
    <div className={classes['contact-container']}>
       <a style={{ textDecoration: 'none', color: '#000000' }} href="https://api.whatsapp.com/send?phone=9876543212"><img src={WhatsAppIcon} alt="whats app icon" srcset="" /></a>
       <a style={{ textDecoration: 'none', color: '#000000' }} href="tel:9876543212"><img className={classes['contact-container--call-icon']} src={CallIcon} alt="whats app icon" srcset="" /></a>
    </div>
  )
}

export default ContactMe