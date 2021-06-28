import React from 'react';
import './seatSelector.css';

export default class SeatSelector extends React.Component{
    constructor(){
        super();
        this.state={
            name:[],
            visited_name:false,
            visited_gender:false,
            visited_age:false,
            btnvisited:false,
            gender:[],
            reservedSeats:[],
            age:[]
        };
    }
    getEmptySeats=e=>{
        this.setState({btnvisited:true});
        let newSeat = e.target.value;
        if(this.state.reservedSeats.includes(newSeat)){
            this.setState({reservedSeats:this.state.reservedSeats.filter(seat=>seat!==newSeat)})
        }
        else{
            this.setState({reservedSeats:[...this.state.reservedSeats,newSeat]})
        }
        this.createPassengerTable(this.state.reservedSeats);        
    }
    handleGender = (e,seatno)=>{
        const value = e.target.value;
        this.setState({gender:this.state.gender.concat(value)})
        this.setState({visited_gender:true});
    }
    handleAge=e=>{
        const value = e.target.value;
        this.setState({age:this.state.age.concat(value)});
        this.setState({visited_age:true});
    }
    handlePassengerName=(e,seatno)=>{
        e.preventDefault();
        let value = e.target.value;
        if(!value){
            return (this.setState({name:'name is required'}))
        }
        else{
            this.setState({name:this.state.name.concat(value)})
        }
        this.setState({visited_name:true});
    }
    handleSubmitDetails=e=>{
        e.preventDefault();
        if(this.state.visited_age && this.state.visited_gender&& this.state.visited_name){
            localStorage.setItem("reservedSeats",JSON.stringify(this.state.reservedSeats));
            localStorage.setItem("nameData",JSON.stringify(this.state.name));
            localStorage.setItem('genderList',JSON.stringify(this.state.gender));
            localStorage.setItem('ageList',JSON.stringify(this.state.age));
            this.props.history.push('/booking/payment');
        }
        else{
            alert("Enter all Fields");
        }
    }
    createPassengerTable=(seatArray)=>{
        return seatArray.map((seat,idx)=>{
            return(
                <form key={idx} className="form seatfrm">
                    <table className="table table-border text-white">
                        <tr>
                            <th>Seat No.</th>
                            <th>Passenger Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                        </tr>
                        <tr>
                            <td>{seat}</td>
                            <td className="w-50"><input className="form-control" onBlur={e=>this.handlePassengerName(e,seat)} type="text" style={{backgroundColor:'white'}} name="passenger-name" placeholder="Enter Passenger Name"/></td>
                            <td>
                                <div className="form-check form-check-inline text-left">   
                                    <input className="form-check-input" type="radio" name="gender" id="male" value="Male" onClick={e=>this.handleGender(e,seat)}/>
                                    <label className="form-check-label" for="male">Male</label>
                                </div>
                                <div className="form-check form-check-inline">   
                                    <input className="form-check-input" type="radio" name="gender" id="female" value="Female" onClick={e=>this.handleGender(e,seat)}/>
                                    <label className="form-check-label" for="female">Female</label>
                                </div>
                            </td>
                            <td><input className="form-control" type="text" placeholder="Age" style={{backgroundColor:'white'}} onBlur={e=>this.handleAge(e)}/></td>
                        </tr>
                    </table>
                    {/* <h3>Seat Number: {seat}</h3>
                    <input className="form-control" onBlur={e=>this.handlePassengerName(e,seat)} type="text" name="passenger-name" placeholder="Enter Passenger Name"/>
                    <div className="form-check form-check-inline">   
                        <input className="form-check-input" type="radio" name="gender" id="male" value="Male" onClick={e=>this.handleGender(e,seat)}/>
                        <label className="form-check-label" for="male">Male</label>
                    </div>
                    <div className="form-check form-check-inline">   
                        <input className="form-check-input" type="radio" name="gender" id="female" value="Female" onClick={e=>this.handleGender(e,seat)}/>
                        <label className="form-check-label" for="female">Female</label>
                    </div>
                    <div>
                        <input className="form-control" type="text" placeholder="Enter Age" onBlur={e=>this.handleAge(e)}/>
                    </div> */}
                </form>
            )
        })
    }
    render(){
        return(
            <div style={{backgroundColor:'lavender'}}>
            <div className="container mt-4">
                <ul>
                    <li id='nav'>Select Bus</li>
                    <li id='nav_active'>Select Seat</li>
                    <li id='nav'>Payment</li>
                    <li id='nav'>Ticket</li>
                </ul>
                <div className="row ml-4">
                    <div className="col">
                        <h2 className="text-danger">Select Seat</h2>
                        <form onChange={e=>this.getEmptySeats(e)}>
                            <table>
                                <tr className="seats">
                                    <td className="seat"><input type="checkbox" value="36" id="36"/><label for="36">36</label></td>
                                    <td></td>
                                    <td></td>
                                    <td className="seat"><input type="checkbox" value="2" id="2"/><label for="2">2</label></td>
                                    <td className="seat"><input type="checkbox" value="1" id="1"/><label for="1">1</label></td>
                                </tr>
                                <tr className="seats">
                                    <td className="seat"><input type="checkbox" value="6" id="6"/><label for="6">6</label></td>
                                    <td className="seat"><input type="checkbox" value="5" id="5"/><label for="5">5</label></td>
                                    <td></td>
                                    <td className="seat"><input type="checkbox" value="4" id="4"/><label for="4">4</label></td>
                                    <td className="seat"><input type="checkbox" value="3" id="3"/><label for="3">3</label></td>
                                </tr>
                                <tr className="seats">
                                    <td className="seat"><input type="checkbox" value="10" id="10"/><label for="10">10</label></td>
                                    <td className="seat"><input type="checkbox" value="9" id="9"/><label for="9">9</label></td>
                                    <td></td>
                                    <td className="seat"><input type="checkbox" value="8" id="8"/><label for="8">8</label></td>
                                    <td className="seat"><input type="checkbox" value="7" id="7"/><label for="7">7</label></td>
                                </tr>
                                <tr className="seats">
                                    <td className="seat"><input type="checkbox" value="14" id="14"/><label for="14">14</label></td>
                                    <td className="seat"><input type="checkbox" value="13" id="13"/><label for="13">13</label></td>
                                    <td></td>
                                    <td className="seat"><input type="checkbox" value="12" id="12"/><label for="12">12</label></td>
                                    <td className="seat"><input type="checkbox" value="11" id="11"/><label for="11">11</label></td>
                                </tr>
                                <tr className="seats">
                                    <td className="seat"><input type="checkbox" value="18" id="18"/><label for="18">18</label></td>
                                    <td className="seat"><input type="checkbox" value="17" id="17"/><label for="17">17</label></td>
                                    <td></td>
                                    <td className="seat"><input type="checkbox" value="16" id="16"/><label for="16">16</label></td>
                                    <td className="seat"><input type="checkbox" value="15" id="15"/><label for="15">15</label></td>
                                </tr>
                                <tr className="seats">
                                    <td className="seat"><input type="checkbox" value="22" id="22"/><label for="22">22</label></td>
                                    <td className="seat"><input type="checkbox" value="21" id="21"/><label for="21">21</label></td>
                                    <td></td>
                                    <td className="seat"><input type="checkbox" value="20" id="20"/><label for="20">20</label></td>
                                    <td className="seat"><input type="checkbox" value="19" id="19"/><label for="19">19</label></td>
                                </tr>
                                <tr className="seats">
                                    <td className="seat"><input type="checkbox" value="26" id="26"/><label for="26">26</label></td>
                                    <td className="seat"><input type="checkbox" value="25" id="25"/><label for="25">25</label></td>
                                    <td></td>
                                    <td className="seat"><input type="checkbox" value="24" id="24"/><label for="24">24</label></td>
                                    <td className="seat"><input type="checkbox" value="23" id="23"/><label for="23">23</label></td>
                                </tr>
                                <tr className="seats">
                                    <td className="seat"><input type="checkbox" value="30" id="30"/><label for="30">30</label></td>
                                    <td className="seat"><input type="checkbox" value="29" id="29"/><label for="29">29</label></td>
                                    <td></td>
                                    <td className="seat"><input type="checkbox" value="28" id="28"/><label for="28">28</label></td>
                                    <td className="seat"><input type="checkbox" value="27" id="27"/><label for="27">27</label></td>
                                </tr>
                                <tr className="seats">
                                    <td className="seat"><input type="checkbox" value="35" id="35"/><label for="35">35</label></td>
                                    <td className="seat"><input type="checkbox" value="34" id="34"/><label for="34">34</label></td>
                                    <td className="seat"><input type="checkbox" value="33" id="33"/><label for="33">33</label></td>
                                    <td className="seat"><input type="checkbox" value="32" id="32"/><label for="32">32</label></td>
                                    <td className="seat"><input type="checkbox" value="31" id="31"/><label for="31">31</label></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div className="col text-center">
                        <h2 className="text-danger">Passenger Details</h2>
                        <form className="form-group">
                            {this.createPassengerTable(this.state.reservedSeats)}
                            <button id="confirm_button" className={this.state.btnvisited?'d-block':'d-none'} onClick={e=>this.handleSubmitDetails(e)}>Confirm Details</button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}