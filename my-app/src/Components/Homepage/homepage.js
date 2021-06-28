import React from 'react';
import './homepage.css';
 export default function Homepage({history}){
    const enterSite = e =>{
        e.preventDefault();
        history.push('/login');
        localStorage.setItem("login",false);
    }
    
    return(
        <div className="container mt-5">
            <div id="slogan">
                YOUR SAFETY IS OUR PRIORITY
            </div>
            <div id="slogan">
                HAVE A SAFE JOURNEY USING MYTRAVEL
            </div>
            <div className="mt-5">
                <a href="/#" onClick={e=>enterSite(e)}><button id="bigbutton">BOOK YOUR TICKETS NOW</button></a>
            </div>
        </div>
    );
}