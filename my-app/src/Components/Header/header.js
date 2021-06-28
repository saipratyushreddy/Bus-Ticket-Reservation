import  React from 'react';
import './header.css'

class header extends React.Component{
    constructor(){
        super();
        this.state={
            data:[]
        };
    }
    logout=e=>{
        localStorage.setItem("login",false);
        this.push('/login');
    };
    render(){
        return(
            <>
            <div className="container-fluid bg-danger text-center" style={{height: 60}}>
                <div className="container align-items-center">
                    <span className="h1" id="logo_header">MYTRAVEL</span>
                </div>
            </div>
            </>
        )
    }
}
export default header;