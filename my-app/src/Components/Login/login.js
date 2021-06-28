import React from 'react'
import * as logFunc from './loginFunction.js'
import './login.css'
export default class Login extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            name:'',
            visited:{
                email:false,
                password:false
            }
        }
    }
    toSignUp=e=>{
        e.preventDefault();
        this.props.history.push('/signup');
    }
    handleEmail=(e)=>{
        e.preventDefault();
        let visited=this.state.visited;
        visited.email=true;
        let value = e.target.value;
        this.setState({email:value});
    }
    handlePassword=(e)=>{
        e.preventDefault();
        let visited=this.state.visited;
        visited.password=true;
        let value = e.target.value;
         this.setState({password:value});
    }
    submitData=(e)=>{
        e.preventDefault();
        let visited=this.state.visited;
        if(visited.email && visited.password){
            let login=false;
            let name='';
            let email = this.state.email;
            let password = this.state.password;
            logFunc.logUserIn(email,password).then((res)=>{
                login = res.data.login;
                name = res.data.name;
                if(login){
                    var mes='Welcome '+name;
                    this.props.history.push('/booking/bus');
                    alert(mes);
                    localStorage.setItem('acc_name',name);
                    localStorage.setItem('email',res.data.email);
                    localStorage.setItem('mobile',res.data.mobile);
                    localStorage.setItem("login",true);
                }
                else{
                    alert("Invalid Username/Password");
                }
            })
        }
        else{
            alert("Please Enter all Fields");
        }   
        
    }
    render(){
        return(
            <div className="container w-25 mt-5 bg-danger p-5 text-white text-center">
                <h1>Login</h1>
                <form onSubmit={e => this.submitData(e)}>
                    <div className="form-group">
                        <label className="text-left">Email</label>
                        <input id="email" type="text" name="email" className="form-control" placeholder="Enter Your email" onChange={e => this.handleEmail(e)} />
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input id="password" type="password" name="password" className="form-control" placeholder="Enter Password" onChange={e => this.handlePassword(e)} />
                    </div>
                    <div className="mt-4"><button type="submit" id="button">Login</button></div>
                </form>
                <div className="mt-4">
                    New User? 
                    <a href="/#" onClick={e=>this.toSignUp(e)} className="text-white"> Sign-Up Here</a>
                </div>
            </div>
        )
    }
}

// export default function Login({history}){
    
//     let [userData, setUserData] = useState({})

//     const toSignUp = e => {
//         e.preventDefault()
//         history.push('/signup')
//     }

//     const handleChangeEvent = (e, field) => {
//         let value = e.target.value
//         setUserData({ ...userData, [field]: value })
//     }
//     const submitData = e => {
//         let login = false;
//         let name = '';
//         e.preventDefault();
//         logFunc.logUserIn(userData);
//         logFunc.loginData().then(res=>{
//             login = res.data.login;
//             name = res.data.name;
//             if(login){
//                 var message="Welcome Back "+name;
//                 history.push('/booking/bus');
//                 alert(message);
//             }
//             else{
//                 alert('invalid username/password')
//             }
//         });
//     }

//     return(
//         <div className="container w-25 mt-5 bg-danger p-5 text-white">
//             <h1>Login</h1>
//             <form onSubmit={e => submitData(e)}>
//                 <div className="form-group">
//                     <label >email:</label>
//                     <input id="email" type="text" className="form-control" placeholder="Enter Your email" onChange={e => handleChangeEvent(e, 'email')} />
//                 </div>
//                 <div className="form-group">
//                     <label >Password:</label>
//                     <input id="password" type="password" className="form-control" placeholder="Enter Password" onChange={e => handleChangeEvent(e, 'password')} />
//                 </div>
//                 <button type="submit" id="button">Login</button>
//             </form>
//             <div className="mt-4">
//                 New User? Signup Here
//                 <a href="/#" onClick={e=>toSignUp(e)}>Sign-Up</a>
//             </div>
//         </div>
//     )
// }