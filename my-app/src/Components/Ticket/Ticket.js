import React from 'react';
import './ticket.css'
export default class Ticket extends React.Component{
    passengerDetails=()=>{
        let seats = localStorage.getItem("reservedSeats");
        let name = localStorage.getItem("nameData");
        let age=localStorage.getItem("ageList");
        let gender=localStorage.getItem("genderList");
        if(seats){
            let seatsArr=JSON.parse(seats);
            let nameArr=JSON.parse(name);
            let ageArr=JSON.parse(age);
            let genderArr=JSON.parse(gender);
            return seatsArr.map((seat,idx)=>{
                return(
                        <tr>
                            <td className="ticket_table">{idx+1}</td>
                            <td className="ticket_table">{nameArr[idx]}</td>
                            <td className="ticket_table">{seat}</td>
                            <td className="ticket_table">{genderArr[idx]}</td>
                            <td className="ticket_table">{ageArr[idx]}</td>
                            <td className="ticket_table">Confirmed</td>
                        </tr>
                )
            })
        }
    }
    arrivalTime=()=>{
        let time=localStorage.getItem('bus_details');
        let timeArr=JSON.parse(time);
        return(timeArr.arr);
    }
    depTime=()=>{
        let time=localStorage.getItem('bus_details');
        let timeArr=JSON.parse(time);
        return(timeArr.dep);
    }
    serviceNo=()=>{
        let no=localStorage.getItem('bus_details');
        let snArr=JSON.parse(no);
        return(snArr.busno);
    }
    travels=()=>{
        let travel=localStorage.getItem('bus_details');
        let trArr=JSON.parse(travel);
        return(trArr.travels);
    }
    render(){
        return(
            <div style={{backgroundColor:"lavender"}}>
            <div className="container text-center mt-4">
                 <ul>
                    <li id='nav'>Select Bus</li>
                    <li id='nav'>Select Seat</li>
                    <li id='nav'>Payment</li>
                    <li id='nav_active'>Ticket</li>
                </ul>
                <div style={{width:"80%"}} className="mx-auto">
                    <div><span id="logo">MYTRAVEL</span></div>
                    <hr/>
                    <div>Ticket Confirmed {localStorage.getItem("acc_name")} <i class="fa fa-check h5 text-success"></i></div>
                    <div>Ticket has been sent Successfully to {localStorage.getItem('email')} | {localStorage.getItem('mobile')}</div>
                    <hr/>
                    <h3 className="mt-1 text-danger">Journey Details</h3>
                    <div className="mt-1">
                        <table className="table-danger mx-auto">
                            <tr>
                                <th className="ticket_table1">Travels</th>
                                <th className="ticket_table1">Service No.</th>
                                <th className="ticket_table1">From</th>
                                <th className="ticket_table1">To</th>
                                <th className="ticket_table1">Date</th>
                                <th className="ticket_table1">Departure</th>
                                <th className="ticket_table1">Arrival</th>
                            </tr>
                            <tr>
                                <td className="ticket_table1">{this.travels()}</td>
                                <td className="ticket_table1">{this.serviceNo()}</td>
                                <td className="ticket_table1">{localStorage.getItem("from")}</td>
                                <td className="ticket_table1">{localStorage.getItem("to")}</td>
                                <td className="ticket_table1">{localStorage.getItem("date")}</td>
                                <td className="ticket_table1">{this.depTime()}</td>
                                <td className="ticket_table1">{this.arrivalTime()}</td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <h3 className="mt-4 text-danger">Passenger Details</h3>
                        <div className="mt-1">
                            <table className="table-danger mx-auto">
                                <tr>
                                    <th className="ticket_table">No.</th>
                                    <th className="ticket_table">Passenger Name</th>
                                    <th className="ticket_table">Seat No.</th>
                                    <th className="ticket_table">Gender</th>
                                    <th className="ticket_table">Age</th>
                                    <th className="ticket_table">Status</th>
                                </tr>
                                {this.passengerDetails()}
                            </table>
                        </div>
                    </div>
                    <div>
                        <h3 className="mt-4 text-danger">Payment Details</h3>
                        <div className="mt-1 pb-4">
                            <table className="table-danger mx-auto pb-5">
                                <tr>
                                    <th className="ticket_table">Booking Id</th>
                                    <th className="ticket_table">Type</th>
                                    <th className="ticket_table">Basic Fare</th>
                                    <th className="ticket_table">Tax</th>
                                    <th className="ticket_table">Total Fare</th>
                                    <th className="ticket_table">Concession</th>
                                </tr>
                                <tr>
                                    <td className="ticket_table">{Math.round(1000000*Math.random())}</td>
                                    <td className="ticket_table">Card</td>
                                    <td className="ticket_table">{Math.round(localStorage.getItem("total_price"))}</td>
                                    <td className="ticket_table">{Math.round(localStorage.getItem("tax_price")-localStorage.getItem("total_price"))}</td>
                                    <td className="ticket_table">{Math.round(localStorage.getItem("tax_price"))}</td>
                                    <td className="ticket_table">N/A</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                {/* <button onClick={window.print()} className="btn btn-primary">Print</button> */}
            </div>
            </div>
        )
    }
}