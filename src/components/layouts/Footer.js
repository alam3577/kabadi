import React from "react";
import classes from "./css/Footer.module.css";

function Footer() {
  return (
    <div className={classes["footer-container"]}>
     <div>&#169; 2023 Kabadisalekaro</div>
     <div className={`d-flex flex-direction-row align-items-start justify-content-center mb-1 ${classes["message-container"]}`} >
        Designed And Developed By -  <a href="https://api.whatsapp.com/send?phone=7002729745"> Sajjad Alam </a>
      </div>
    </div>
  );
}

export default Footer;
