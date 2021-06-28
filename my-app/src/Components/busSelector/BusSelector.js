import React from 'react';
import './BusSelector.css';
import * as busFunc from './selectorFunc';
// import BusList from './BusList';

export default class BusSelector extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bus_data:[],
            to:'',
            from:'',
            data:'',
            date:''
        };
    }
    handleFromchange=(e)=>{
        let value=e.target.value;
        this.setState({from:value});
        localStorage.setItem('from',value);
    }
    handleTochange=(e)=>{
        let value=e.target.value;
        this.setState({to:value});
        localStorage.setItem('to',value);
    }
    handleDatechange=(e)=>{
        let value=e.target.value;
        this.setState({date:value});
        localStorage.setItem('date',value);
    }
    getBuses=e=>{
        e.preventDefault();
        busFunc.getBuses(this.state.from,this.state.to).then((res)=>{
            this.setState({bus_data:res.data});
        })
    }
    sendData=(e,data)=>{
        e.preventDefault();
        localStorage.setItem("bus_details",JSON.stringify(data))
        this.props.history.push('/booking/seat')
    }
    render(){
        const {bus_data}=this.state;
        return(
            <div className="container mt-4">
                <ul>
                    <li id='nav_active'>Select Bus</li>
                    <li id='nav'>Select Seat</li>
                    <li id='nav'>Payment</li>
                    <li id='nav'>Ticket</li>
                </ul>
                <form onSubmit={e=>this.getBuses(e)}>
                    <select id="optionSelector" onChange={e=>this.handleFromchange(e)}>
                        <option>Select From City</option>
                        <option>Hyderabad</option>
                        <option>Vijayawada</option>
                        <option>Chennai</option>                       
                        <option>Banglore</option>
                        <option>Delhi</option>
                    </select>
                    <select id="optionSelector" onChange={e=>this.handleTochange(e)}>
                        <option>Select To City</option>
                        <option>Chennai</option>
                        <option>Vijayawada</option>
                        <option>Hyderabad</option>                       
                        <option>Banglore</option>
                        <option>Delhi</option>
                    </select>
                    <input type="date" id="optionSelector" onChange={e=>this.handleDatechange(e)}/>
                    <button type='submit' id="button">Search</button>
                </form>
                    {
                        Object.keys(bus_data).map(itemkey=>{
                            return(
                                <div>
                                    <table className="table table-danger text-center">                                    
                                    <tr>
                                            <th>Travels</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Bus Number</th>
                                            <th>Seats Available</th>
                                            <th>Price</th>
                                            <th>Departure</th>
                                            <th>Arrival</th>
                                            <th>Book</th>
                                        </tr>
                                        <tr key={itemkey}>
                                            <td>{bus_data[itemkey].travels}</td>
                                            <td>{bus_data[itemkey].from}</td>
                                            <td>{bus_data[itemkey].to}</td>
                                            <td>{bus_data[itemkey].busno}</td>
                                            <td>{bus_data[itemkey].seats}</td>
                                            <td>{bus_data[itemkey].price}</td>
                                            <td>{bus_data[itemkey].dep}</td>
                                            <td>{bus_data[itemkey].arr}</td>
                                            <td><button id="button" onClick={e=>this.sendData(e,bus_data[itemkey])}>View Seats</button></td>
                                        </tr>
                                    </table>
                                </div>
                            )
                        })
                    } 
            </div>
        )
    }
}


// export default function Routeselector(){
    
//     const [busData, setbusData] = useState("")
//     const [busDetails, setbusDetails] = useState("");
    
//     const handleChangeEvent = (e, field) => {
//         let value = e.target.value
//         setbusData({ ...busData, [field]: value })
//     }
//     const getBuses=e=>{
//         e.preventDefault();
//         busFunc.getBuses(busData);
//         busFunc.Buses().then((res)=>{
//             setbusDetails({busDetails:res.data});
//         })
//         //alert(busDetails);
//     }
//     const renderBusList = (busDetails) => {
//         if (Object.keys(busDetails).length > 0) {
//             return (<BusList value={busDetails} />)
//         }
//     }
//     return(
//         <div className='container'>
//             <div className='form-group-inline'>
//                 <form onSubmit={e => getBuses(e)}>
//                     <select id="optionSelector" onChange={e=>{handleChangeEvent(e,'from')}}>
//                         <option>Hyderabad</option>
//                         <option>Chennai</option>
//                         <option>Banglore</option>
//                         <option>Delhi</option>
//                     </select>
//                     <select id="optionSelector" onChange={e=>handleChangeEvent(e,'to')}>
//                         <option>Chennai</option>
//                         <option>Hyderabad</option>                       
//                         <option>Banglore</option>
//                         <option>Delhi</option>
//                     </select>
//                     <input type="date" id="optionSelector"/>
//                     <button type='submit' id="button">Search</button>
//                 </form>
//                 <h1 className="text-danger">Bus Results</h1>
//                 <div>
//                     {renderBusList(busDetails)}
//                 </div>
//             </div>
//         </div>
//     )
// }