import React from 'react'
import {ReactNavbar} from "overlay-navbar"
//import logo from "../../../images/logo.png"


const Header = () => {
  return ( 
    <ReactNavbar
    burgerColor="#9400d3"
    burgerColorHover="black"
    navColor1="#ba55d3"
    navColor2="#ba55d3"
    navColor3="#ba55d3"
    navColor4="#ba55d3"
    link1Text="Home"
    link2Text="Products"
    link3Text="Contacts"
    link4Text="About"
    link1size=""
    link1Url="/"
    link2Url="/products"
    link3Url="/contacts"
    link4Url="/about"
    link1Size="1.3vmax"
    link1Color="#9400d3"
    nav1justifyContent="flex-end"
    nav2justifyContent="flex-end"
    nav3justifyContent="flex-start"
    nav4justifyContent="flex-start"
    link1ColorHover="black"
    link1Margin="1vmax"
    


    />
  )
}

export default Header;
