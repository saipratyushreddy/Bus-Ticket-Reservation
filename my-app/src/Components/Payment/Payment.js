import React from 'react';

export default class Payment extends React.Component{
    constructor(){
        super();
        this.state={
            nameErr:'',
            numErr:'',
            dateErr:'',
            cvvErr:'',
            visited:{
                name:false,
                num:false,
                date:false,
                cvv:false
            }
        }
    }

    handleName=e=>{
        e.preventDefault();
        let value=e.target.value;
        let visited = this.state.visited;
        visited.name=true;
        if(value.length>0){
            if(!/^[A-Za-z]+$/.test(value)){
                this.setState({nameErr:'Enter only alphabets'});
            }
            else{
                this.setState({nameErr:''});
            }
        }
        else{
            this.setState({nameErr:'Enter Name'});
        }
    }
    handleCnum=e=>{
        e.preventDefault();
        let value=e.target.value;
        let visited = this.state.visited;
        visited.num=true;
        if(value.length>0){
            if(/^([0-9]{16})$/.test(value)){
                this.setState({numErr:''})
            }
            else{
                this.setState({numErr:'Enter 16 digits'})
            }
        }
        else{
            this.setState({numErr:'Enter card number'})
        }
    }
    handleDate=e=>{
        e.preventDefault();
        let value=e.target.value;
        let visited = this.state.visited;
        visited.date=true;
        if(value.length>0){
            if(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value)){
                this.setState({dateErr:''})
            }
            else{
                this.setState({dateErr:'Enter valid date'})
            }
        }
        else{
            this.setState({dateErr:'Enter date'})
        }
    }
    handleCvv=e=>{
        e.preventDefault();
        let value=e.target.value;
        let visited = this.state.visited;
        visited.cvv=true;
        if(value.length>0){
            if(/^([0-9]{3})$/.test(value)){
                this.setState({cvvErr:''})
            }
            else{
                this.setState({cvvErr:'Enter 3 digits'})
            }
        }
        else{
            this.setState({cvvErr:'Enter CVV number'})
        }
    }
    handleSubmit=e=>{
        e.preventDefault();
        let {nameErr,numErr,cvvErr,dateErr}=this.state;
        let {visited} = this.state;
        if(visited.name  && visited.num && visited.cvv && visited.date){
            if(nameErr.length===0 && numErr.length===0 && cvvErr.length===0 && dateErr.length===0){
                this.props.history.push('/booking/ticket');
            }
            else{
                alert('Please enter Valid fields')
            }
        }
        else{
            alert("Please Fill Valid Fields");
        }
    }
    ticketPrice=()=>{
        let bus=localStorage.getItem('bus_details');
        let busArr=JSON.parse(bus);
        return(busArr.price);
    }
    getTotalUsers=()=>{
        let count = 0;
        let seatArray = localStorage.getItem("reservedSeats");
        let price=this.ticketPrice();
        if(seatArray){
            let seats = JSON.parse(seatArray)
            for(let i = 0; i<seats.length;i++){
                count++;
            }
            let total_price=count*price;
            let tax_price=count*price*1.09;
            localStorage.setItem("tax_price",tax_price);
            localStorage.setItem("total_price",total_price);
            return(
                <div className="p-5 mt-4 text-center">
                    <h3 className="text-danger">Payment Summary</h3>
                    <table className="mx-auto text-right text-white bg-danger border border-danger">
                        <tr>
                            <td className="pr-5 pl-5 pt-4 pb-4">Price per Person:</td>
                            <td className="pr-5 pl-5 pt-4 pb-4">{price}/-</td>
                        </tr>
                        <tr>
                            <td className="pr-5 pl-5 pt-4 pb-4">Total Passengers:</td>
                            <td className="pr-5 pl-5 pt-4 pb-4">{count}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold pr-5 pl-5 pt-4 pb-4">Total Amount:</td>
                            <td className="font-weight-bold pr-5 pl-5 pt-4 pb-4">{price*count}</td>
                        </tr>
                        <tr>
                            <td className="pr-5 pl-5 pt-4 pb-4">Taxes (9%):</td>
                            <td className="pr-5 pl-5 pt-4 pb-4">{price*count*0.09}</td>
                        </tr>
                        <tr className="border-top">
                            <td className="font-weight-bold pr-5 pl-5 pt-4 pb-4">Grand Total:</td>
                            <td className="font-weight-bold pr-5 pl-5 pt-4 pb-4">{Math.round(tax_price)}</td>
                        </tr>
                    </table>
                </div>
            )
        }
    }
    render(){
        const {nameErr,numErr,cvvErr,dateErr}=this.state;
        return(
           <div className="container mt-4">
               <ul>
                    <li id='nav'>Select Bus</li>
                    <li id='nav'>Select Seat</li>
                    <li id='nav_active'>Payment</li>
                    <li id='nav'>Ticket</li>
                </ul>
                <div className="row">
                    <div className="col">
                        <form className="form-group mt-1" onSubmit={e=>this.handleSubmit(e)}>
                            <table className="mx-auto text-left text-danger mt-5">
                                <tr>
                                    <td className="p-4 text-right">Name on Card:</td>
                                    <td className="p-4"><input className="form-control" name="Cname"type="text" placeholder="Enter Name" onChange={this.handleName}/></td>
                                </tr>
                                <tr><td></td><td>{nameErr.length>0 && <span>*{nameErr}*</span>}</td></tr>
                                <tr>
                                    <td className="p-4 text-right">Card Number:</td>
                                    <td className="p-4"><input className="form-control" name="Cnum" type="text" placeholder="Enter Card Number" onChange={this.handleCnum}/></td>
                                </tr>
                                <tr><td></td><td>{numErr.length>0 && <span>*{numErr}*</span>}</td></tr>
                                <tr>
                                    <td className="p-4 text-right">Expiry Date:</td>
                                    <td className="p-4"><input className="form-control" num="Cdate" type="text" placeholder="MM/YY" onChange={this.handleDate}/></td>
                                </tr>
                                <tr><td></td><td>{dateErr.length>0 && <span>*{dateErr}*</span>}</td></tr>
                                <tr>
                                    <td className="p-4 text-right">CVV:</td>
                                    <td className="p-4"><input className="form-control" name="Cvv" type="password" placeholder="CVV" onChange={this.handleCvv}/></td>
                                </tr>
                                <tr><td></td><td>{cvvErr.length>0 && <span>*{cvvErr}*</span>}</td></tr>
                                <tr>
                                    <td className="p-4 text-center" colSpan="2"><button id="button" type="submit">Pay</button></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div className="col">
                        {this.getTotalUsers()}
                    </div>
                </div>
           </div>
        )
    }
}