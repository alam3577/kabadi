import Breaker from 'components/ui/Breaker'
import React from 'react'
import classes from "./css/Contact.module.css";

function Contact() {
  return (
    <div className={classes['contact-container']}>
      <div className={classes['contact']}>
         <h1>Contact</h1>
         <Breaker />
         <div className={`d-flex flex-column justify-content-start align-items-start fs-5`}>
             <p>kabadiwallaa@gmail.com</p>
                <p style={{ textDecoration: 'none' }}>Call us at 9876543212 <a href="tel:9876543212">Call</a> 
                <br />
                <a href="https://api.whatsapp.com/send?phone=9876543212">Send Message</a>
             </p>
              {/* <span>+91 9876543212</span> */}
              <p style={{ fontSize: 'medium' }}> kabadiwallaa <br/>
                  Gali no. 1 <br/> Susnilewa barwadda dhanbad,
                  <br/>
                  behind new DC office Dhanbad ,
                  <br/>
                   Dhanbad, Jharkhand 826004,
                  <br/>
                   India
               </p>
           </div>
      </div>
    </div>
  )
}

export default Contact