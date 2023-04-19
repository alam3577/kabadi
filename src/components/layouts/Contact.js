import Breaker from 'components/ui/Breaker'
import React from 'react'
import classes from "./css/Contact.module.css";
import LocationIcon from "../../assets/icons/location.png";
import MailIcon from "../../assets/icons/mail.png";
import MessageIcon from "../../assets/icons/conversation.png";
import callIcon from "../../assets/icons/call.png";

function Contact() {
  return (
    <div style={{ fontSize: 'medium' }} className={classes['contact-container']}>
      <div className={classes['contact']}>
         <p className={ `${classes['contact-title']} fs-1 mb-0`}>Contact</p>
         <Breaker />
         <div className={`d-flex flex-column gap-1 justify-content-start align-items-start fs-5`}>
                <div className={`d-flex flex-direction-row align-items-center justify-content-center gap-2 mb-1 ${classes['mail-container']}`}>
                  <img src={MailIcon} alt="Mail Icon" srcSet="" />
                  <p style={{ fontSize: 'medium' }} className="mb-0">kabadiwallaa@gmail.com</p> 
                </div>
                <a className='text-dark' style={{ textDecoration: 'none' }} href="tel:9876543212">
                  <div className={`d-flex flex-direction-row align-items-center justify-content-center gap-2 mb-1 ${classes['call-container']}`}>
                    <img src={callIcon} alt="Call Icon" srcSet="" />
                    <p style={{ fontSize: 'medium', textDecoration: 'none' }} className='mb-0'>Call us at 9876543212</p>
                  </div>
                </a>
                <a className='text-dark' style={{ textDecoration: 'none' }} href="https://api.whatsapp.com/send?phone=9876543212">
                  <div className={`d-flex flex-direction-row align-items-start justify-content-center gap-2 mb-1 ${classes['message-container']}`}>
                    <img src={MessageIcon} alt="Message Icon" srcSet="" />
                    <p style={{ fontSize: 'medium', marginTop: '-4px' }} className='mb-0'>Send WhatsApp Message <br /> 9876543212</p>
                  </div>
                </a>
              {/* <span>+91 9876543212</span> */}
              <div className={`${classes['address-container']} d-flex flex-direction-row gap-2`}>
                    <img src={LocationIcon} alt="location icon" srcSet="" />
                    <p style={{ fontSize: 'medium', marginTop: '-4px' }}> Kabadisalekaro <br/>
                        Gali no. 1, Susnilewa barwadda dhanbad,
                        <br/>
                        behind new DC office Dhanbad , Jharkhand 826004, Dhanbad,India
                        <br/>
                    </p>
              </div>
           </div>
      </div>
    </div>
  )
}

export default Contact