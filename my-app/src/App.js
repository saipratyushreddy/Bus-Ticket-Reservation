import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Components/Header/header';
import Signup from './Components/Signup/signup';
import Login from './Components/Login/login';
import Homepage from './Components/Homepage/homepage';
import Footer from './Components/Footer/footer';
import BusSelector from './Components/busSelector/BusSelector'
import SeatSelector from './Components/SeatSelector/SeatSelector';
import Payment from './Components/Payment/Payment';
import Ticket from './Components/Ticket/Ticket';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Switch>
          <Route path="/" exact render={props=><Homepage {...props}/>}/>
          <Route path="/login" exact render={props=><Login {...props}/>}/>
          <Route path="/signup" exact render={props=><Signup {...props}/>}/>
          <Route path="/booking/bus" exact render={props=><BusSelector {...props}/>}/>
          <Route path="/booking/seat" exact render={props=><SeatSelector {...props}/>}/>
          <Route path="/booking/payment" exact render={props=><Payment {...props}/>}/>
          <Route path="/booking/ticket" exact render={props=><Ticket {...props}/>}/>
        </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;