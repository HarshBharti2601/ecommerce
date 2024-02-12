import React from 'react'
import {IoLogoGooglePlaystore} from "react-icons/io5";
import {AiFillAppstore} from "react-icons/ai";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
     <div className="left-footer">
       <h4>DOWNLOAD OUR APP</h4>
       <p>Download App for Android and IOS mobile phone</p>
       <IoLogoGooglePlaystore/>
       <AiFillAppstore/>


     </div>
     <div className="middle-footer">
      <h1>ECOMMERCE</h1>
      <p>High Quality is our first priority</p>


      <p>Copyright 2024  &copy;  Me HarshBharti</p>
     </div>
     <div className="right-footer">
      <h4>Follow Us</h4>
      <a href="">Instagram</a>
      <a href="">YouTube</a>
      <a href="">Facebook</a>
     </div>
    </footer>

  )
}
export default Footer;
