
import './App.css';
import Header from "./components/layout/Header/Header.jsx"
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import WebFont from "webfontloader"
import React , {useEffect}from "react"
import Footer from "./components/layout/Footer/Footer.jsx"
import Home from "./components/Home/Home.jsx";



function App() {
  useEffect(()=>{
   
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
       }
    },[])
    
    
    },[])
  return (
    <>
    <Router>
    <Header/>
    <Routes>
    <Route exact path='/' Component={Home}/>
    </Routes>
    <Footer/>
    </Router>
    </>
  );
}

export default App;
