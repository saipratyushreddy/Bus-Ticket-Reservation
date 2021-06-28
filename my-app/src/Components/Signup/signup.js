import React from 'react';
import * as signupFunc from './SignupFunction'
import './signup.css';

export default class Signup extends React.Component{
    constructor(){
        super();
        this.state={
            userData:{
                name:'',
                email:'',
                mobile:'',
                password:'',
                dob:'',
                gender:''
            },
            errors:{
                name:'',
                email:'',
                mobile:'',
                password:'',
                dob:'',
                gender:''
            },
            visited:{
                name:false,
                email:false,
                mobile:false,
                password:false,
                dob:false,
                gender:false
            }
        }
    }
    handleUserdata=e=>{
        e.preventDefault();
        let visited=this.state.visited;
        const {name,value}=e.target;
        let userData = this.state.userData;
        let errors = this.state.errors;
        switch(name){
            case 'name':
                visited.name=true;
                if(value.length>0){
                    if(!/^[A-Za-z ]+$/.test(value)){
                        errors.name="Enter only characters";
                    }
                    else{
                        errors.name='';
                        userData.name=value;
                    }
                }
                else{
                    errors.name="Enter Name"
                }
                break;
            case 'email':
                visited.email=true;
                if(value.length>0){
                    if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)){
                        errors.email="Enter valid email"
                    }
                    else{
                        errors.email=""
                        userData.email=value;
                    }
                }
                else{
                    errors.email='Enter Password';
                }
                break;
            case 'mobile':
                visited.mobile=true;
                if(value.length>0){
                    if(!/^\d{10}$/.test(value)){
                        errors.mobile="Enter 10 Digits";
                    }
                    else{
                        errors.mobile="";
                        userData.mobile=value;
                    }
                }
                else{
                    errors.mobile="Enter mobile number"
                }
                break;
            case 'password':
                visited.password=true;
                if(value.length>0){
                    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(value)){
                        errors.password="Enter valid password";
                    }
                    else{
                        errors.password="";
                        userData.password=value;
                    }
                }
                else{
                    errors.password="Enter password"
                }
                userData.password=value;
                break;
            case 'dob':
                visited.dob=true;
                if(!value){
                    errors.dob="Enter Date of Birth";
                }
                else{
                    errors.dob="";
                    userData.dob=value;
                }
                break;
            case 'gender':
                visited.gender=true;
                if(!(value==='male'||value==='female')){
                    errors.gender='Select a Gender'
                }
                else{
                    errors.gender='';
                    userData.gender=value;
                }
                break;
            default:
                break;                
        }
        this.setState({userData,[name]:value});
        this.setState({errors,[name]:value})
        this.setState({visited,[name]:value})
    }
    submitData = e=>{
        e.preventDefault();
        const {errors}=this.state;
        const {visited}=this.state;
        if(visited.name && visited.email && visited.password && visited.dob && visited.gender && visited.mobile){
            if(errors.name.length===0 && errors.email.length===0 && errors.password.length===0 && errors.dob.length===0 && errors.gender.length===0 && errors.mobile.length===0){
                signupFunc.registerUser(this.state.userData).then(res=>res.data);
                this.props.history.push('/login');
            }
            else{
                alert("Enter Valid Details")
            }
        }
        else{
            alert("Please Fill the Form");
        }
    }
    render(){
        const {errors}=this.state;
        return(
            <div style={{backgroundColor:'lavender'}}>
            <div className="container w-25 mt-1 bg-danger pt-4 pl-5 pr-5 pb-4 text-center text-white">
            <h1 classname="font-weight-bold">Sign-Up</h1>
            <form onSubmit={e => this.submitData(e)}>
                <div className="form-group">
                    <label  className="text-left">Name</label>
                    <input id="name" type="text" className="form-control" name="name" placeholder="Enter Your Name" onChange={e => this.handleUserdata(e)} />
                    {errors.name.length>0 && <span>*{errors.name}*</span>}
                </div> 
                <div className="form-group">
                    <label >Email</label>
                    <input id="email" type="text" className="form-control" name="email" placeholder="Enter Your email" onChange={e => this.handleUserdata(e)}/>
                    {errors.email.length>0 && <span>*{errors.email}*</span>}
                </div>
                <div className="form-group">
                    <label >Mobile Number</label>
                    <input id="mobile" type="text" className="form-control" name="mobile" placeholder="Enter number"onChange={e => this.handleUserdata(e)} />
                    {errors.mobile.length>0 && <span>*{errors.mobile}*</span>}
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input id="password" type="password" className="form-control" name="password" placeholder="Enter Password" onChange={e => this.handleUserdata(e)} />
                    {errors.password.length>0 && <span>*{errors.password}*</span>}
                </div>
                <div className="form-group">
                    <label> Date of Birth</label>
                    <input id="dob" type="text" className="form-control" name="dob" placeholder="DD-MM-YYYY" onChange={e => this.handleUserdata(e)} />
                    {errors.dob.length>0 && <span>*{errors.dob}*</span>}
                </div>
                <div className="form-group">
                <label>Gender</label><br/>
                    <div className="form-check form-check-inline">
                        <label >Male</label>
                        <input id="male" type="radio" className="form-check-input" name="gender" value="male" onChange={e => this.handleUserdata(e)} />
                    </div>
                    <div className="form-check form-check-inline">
                        <label>Female</label>
                        <input id="female" type="radio" className="form-check-input" name="gender" value="female" onChange={e => this.handleUserdata(e)} />
                    </div>
                    {errors.gender.length>0 && <span>{errors.gender}</span>}
                </div>
                <button type="submit" id="button">Signup</button>
            </form>
        </div>
        </div>
        )
    }
}

// export default function LogOrSignIn({history}){
//     let [newUser, setnewUser] = useState({});
//     const handleChangeEvent = (e, field)=>{
//         let fieldValue = e.target.value;
//         setnewUser({...newUser, [field]: fieldValue});
//     }
//     const submitData = e=>{
//         e.preventDefault();
//         signupFunc.registerUser(newUser).then(res=>res.data)
//         console.log(newUser)
//         history.push('/login');
//     }
//     return(
//         <div className="container w-25 mt-5 bg-danger p-5 text-white">
//             <h1>Sign-Up</h1>
//             <form onSubmit={e => submitData(e)}>
//                 <div className="form-group">
//                     <label  className="text-left">Name:</label>
//                     <input id="name" type="text" className="form-control" placeholder="Enter Your Name" onChange={e => handleChangeEvent(e, 'name')} />
//                 </div> 
//                 <div className="form-group">
//                     <label >email:</label>
//                     <input id="email" type="text" className="form-control" placeholder="Enter Your email" onChange={e => handleChangeEvent(e, 'email')} />
//                 </div>
//                 <div className="form-group">
//                     <label >Mobile Number:</label>
//                     <input id="mobile" type="text" className="form-control" placeholder="Enter number" onChange={e => handleChangeEvent(e, 'mobile')} />
//                 </div>
//                 <div className="form-group">
//                     <label >Password:</label>
//                     <input id="password" type="password" className="form-control" placeholder="Enter Password" onChange={e => handleChangeEvent(e, 'password')} />
//                 </div>
//                 <div className="form-group">
//                     <label> Date of Birth:</label>
//                     <input id="dob" type="text" className="form-control" placeholder="DD-MM-YYYY" onChange={e => handleChangeEvent(e, 'dob')} />
//                 </div>
//                 <div className="fomr-group">
//                     <div className="form-check form-check-inline">
//                         <label >Male</label>
//                         <input id="male" type="radio" className="form-check-input" name="gender" value="male" onChange={e => handleChangeEvent(e, 'gender')} />
//                     </div>
//                     <div className="form-check form-check-inline">
//                         <label>Female</label>
//                         <input id="female" type="radio" className="form-check-input" name="gender" value="female" onChange={e => handleChangeEvent(e, 'gender')} />
//                     </div>
//                 </div>
//                 <button type="submit" id="button">Signup</button>
//             </form>
//         </div>
//     )
// }







// export default class LogOrSignIn extends React.Component{
//     constructor(props){
//         super(props);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.state ={
//             Uname:null,
//             Password:null,
//             Name:null,
//             email:null,
//             mobile:null,
//             password:null,
//             gender:null,
//             dob:null,
//             login:null,
//             signup:null,
//             LoginErr:{
//                 Uname:'',
//                 Password:''
//             },
//             SignupErr:{
//                 Name:'',
//                 email:'',
//                 mobile:'',
//                 password:'',
//                 gender:'',
//                 dob:''
//             }
//         }
//     }
//     handleSubmit(event){
//         event.preventDefault();
//         // console.log(data);
//         // fetch("http://localhost:4200/registerUser",{
//         //     method: 'POST',
//         //     body: data,
//         // })
//     }
//     handleChange = (event)=>{
//         event.preventDefault();
//         const {name,value}=event.target;
//         let LoginErr = this.state.LoginErr;
//         let SignupErr = this.state.SignupErr;
//         let login = this.state.login;
//         let signup = this.state.signup;
        
//         switch(name){
//             case 'Uname':
//                 if(value.length===0 || !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)){
//                     LoginErr.Uname = '*Please enter valid email*';
//                 }
//                 else{
//                     LoginErr.Uname='';
//                 }
//                 break;
//             case 'Password':
//                 if(value.length===0 || !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(value)){
//                     LoginErr.Password = "*Please enter Valid Password*";
//                 }
//                 else{
//                     LoginErr.Password = '';
//                 }
//                 break;
//             case 'Name':
//                 if(value.length<3){
//                     SignupErr.Name = '*Enter Atleast 3 Characters*';
//                 }
//                 else{
//                     SignupErr.Name='';
//                 }
//                 break;
//             case 'email':
//                 if(value.length===0 || !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)){
//                     SignupErr.email = '*Please enter valid email*';
//                 }
//                 else{
//                     SignupErr.email='';
//                 }
//                 break;
//             case 'mobile':
//                 if(!/^\d{10}$/.test(value)){
//                     SignupErr.mobile='*Please Enter Valid Mobile Number*';
//                 }
//                 else{
//                     SignupErr.mobile='';
//                 }
//                 break;
//             case 'password':
//                 if(value.length===0 || !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(value)){
//                     SignupErr.password = "*Please enter Valid Password*";
//                 }
//                 else{
//                     SignupErr.password = '';
//                 }
//                 break;
//             case 'gender':
//                 if(!(value==='male'||value==='female')){
//                     SignupErr.gender='Select a Gender'
//                 }
//                 else{
//                     SignupErr.gender=''
//                 }
//                 break;
//             case 'dob':
//                 if(!value){
//                     SignupErr.dob='Please select Date';
//                 }
//                 else{
//                     SignupErr='';
//                 }
//                 break;
//             default:
//                 break;
//         }
//         login = (LoginErr.Uname === '' && LoginErr.Password === '' && LoginErr.Uname === null && LoginErr.Password === null );
//         signup = (SignupErr.Name === '' && SignupErr.email === '' && SignupErr.mobile === '' && SignupErr.password === '' && SignupErr.gender === '' && SignupErr.dob === '');
//         this.setState({login: login,signup: signup});
//         this.setState({LoginErr,[name]:value});
//         this.setState({SignupErr,[name]:value});
//     }
//     render(){
//         const {LoginErr}=this.state;
//         const {SignupErr}=this.state;
//         const {login}=this.state;
//         const {signup}=this.state;
//         const {data}=this.state;
//     return(
//         <div className="container w-50 mt-5">
//             <div className="row">
//                 <div className="col">
//                     <h4 className="text-danger">Login</h4>
//                     <table>
//                         <tr>
//                             <td className="text-left"> Username :</td>
//                             <td>
//                                 <input type="text" name="Uname" className="input-box" onChange={this.handleChange} placeholder="Enter email"/><br/>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td></td>
//                             <td>{LoginErr.Uname.length > 0 && <span id="error">{LoginErr.Uname}</span>}</td>
//                         </tr>
//                         <tr>
//                             <td className="text-left">Password :</td>
//                             <td>
//                                 <input type="password" className="input-box" name="Password" onChange={this.handleChange} placeholder="Enter Password"/>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td></td>
//                             <td>{LoginErr.Password.length > 0 && <span id="error">{LoginErr.Password}</span>}</td>
//                         </tr>
//                         <tr>
//                             <td id="error" colSpan="2">Password should contain uppercase, lowercase & special character. Minimum 8 & Maximum 15 characters</td>
//                         </tr>
//                     </table>
//                     <button type="submit" name="login" id={(login)?"button":"button_dis"} value="login">Login</button>
//                     <span>{login}</span>
//                 </div>
//                 <div className="col">
//                 <form onSubmit={this.handleSubmit}>
//                     <label for="Name">Name:</label>
//                     <input type="text" className="input-box" name="Name" onChange={this.handleChange} placeholder="Enter your Name"/>
                    
//                     <label for="email">email:</label>
//                     <input type="text" className="input-box" name="email" onChange={this.handleChange} placeholder="Enter your email"/>

//                     <label for="mobile">Mobile:</label>
//                     <input type="text" className="input-box" name="mobile" onChange={this.handleChange} placeholder="Enter your number"/>

//                     <label for="password">Password:</label>
//                     <input type="password" className="input-box" name="password" onChange={this.handleChange} placeholder="Enter your password"/>

//                     <label for="dob">Date of Birth</label>
//                     <input type="text" className="input-box" name="dob" onChange={this.handleChange} placeholder="Enter your dob"/>

//                     <button type="submit" id="button" name="signup" value="signup">Signup</button>
//                 </form>
//                 {/* <div className="col border-start">
//                     <h4 className="text-danger">New User? Sign-up</h4>
//                     <table className="ml-5">
//                         <tr>
//                             <td className="text-left">Name : </td>
//                             <td><input type="text" className="input-box" name="Name" onChange={this.handleChange} placeholder="Enter your Name"/></td>
//                         </tr>
//                         <tr>
//                             <td></td>
//                             <td>{SignupErr.Name.length > 0 && <span id="error">{SignupErr.Name}</span>}</td>
//                         </tr>
//                         <tr>
//                             <td className="text-left">email : </td>
//                             <td><input type="text" className="input-box" name="email" onChange={this.handleChange} placeholder="Enter your email"/></td>
//                         </tr>
//                         <tr>
//                             <td></td>
//                             <td>{SignupErr.email.length > 0 && <span id="error">{SignupErr.email}</span>}</td>
//                         </tr>
//                         <tr>
//                             <td className="text-left">Mobile number : </td>
//                             <td><input type="text" className="input-box" name="mobile" onChange={this.handleChange} placeholder="Enter Mobile"/></td>
//                         </tr>
//                         <tr>
//                             <td></td>
//                             <td>{SignupErr.mobile.length > 0 && <span id="error">{SignupErr.mobile}</span>}</td>
//                         </tr>
//                         <tr>
//                             <td className="text-left">Password : </td>
//                             <td><input type="text" className="input-box" name="password" onChange={this.handleChange} placeholder="Enter Password"/></td>
//                         </tr>
//                         <tr>
//                             <td></td>
//                             <td>{SignupErr.password.length > 0 && <span id="error">{SignupErr.password}</span>}</td>
//                         </tr>
//                         <tr>
//                             <td className="text-left">Gender : </td>
//                             <td>
//                                 <input type="radio" id="male" name="gender" value="male" onChange={this.handleChange}/><label className="p-2" for="male">Male</label>
//                                 <input type="radio" id="female" name="gender" value="female" onChange={this.handleChange}/><label className="p-2" for="female">Female</label>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td></td>
//                             <td>{SignupErr.gender.length > 0 && <span id="error">{SignupErr.gender}</span>}</td>
//                         </tr>
//                         <tr>
//                             <td className="text-left">Date of Birth : </td>
//                             <td><input type="text" name="dob" className="input-box" onChange={this.handleChange} placeholder="Select Date" id="datepicker"/></td>
//                         </tr>
//                         <tr>
//                             <td></td>
//                             <td>{SignupErr.dob.length > 0 && <span id="error">{SignupErr.dob}</span>}</td>
//                         </tr>
//                     </table>
//                     <button type="submit" id="button" name="signup" value="signup" onSubmit={this.handleSubmit}>Login</button>*/}
//                 </div> 
//             </div>
//         </div>









//         // <div className="container w-50 p-5" style={{backgroundColor:'#f5f5f5'}}>
//         //     <div className="row">
//         //         <div className="col pr-5">
//         //             <h3 className="text-danger">Already a User ? Login</h3>
//         //             <form className="form-inline mt-4" onSubmit={(e)=>{submitLogin(e)}}>
//         //                 <div className="form-inline mb-3">
//         //                     <label className="form-inline form-label">Email Address</label>
//         //                     <input type="text" className="form-control" id="email" name="email"/>
//         //                 </div>
//         //                 <div className="form-inline mb-3">
//         //                     <label className="form-label">Password</label>
//         //                     <input type="text" className="form-control" id="password" name="password"/>
//         //                 </div>
//         //                 <button type="submit" class="btn btn-danger mt-2 mb-5">Login</button>              
//         //             </form>
//         //         </div>
//         //         <div className="col border-start pl-5">
//         //         <h3 className="text-danger">New User ? Sign-up</h3>
//         //             <form className="mt-4">
//         //                 <div className="form-inline mb-3">
//         //                     <label className="form-label">Name: </label>
//         //                     <input type="text" className="form-control" id="name" name="name"/>
//         //                 </div>
//         //                 <div className="form-inline mb-3">
//         //                     <label className="form-label">Email Address:</label>
//         //                     <input type="text" className="form-control" id="email" name="email"/>
//         //                 </div>
//         //                 <div className="form-inline mb-3">
//         //                     <label className="form-label">Mobile Number</label>
//         //                     <input type="text" className="form-control" id="mobile" name="mobile"/>
//         //                 </div> 
//         //                 <div className="form-inline mb-3">
//         //                     <label>Create Password</label>
//         //                     <input type="text" className="form-control" id="password" name="password"/>
//         //                 </div>
//         //                 <div class="form-check form-check-inline mt-2 form-inline mb-3">
//         //                     <input class="form-check-input" type="radio" name="gender" id="male" value="male"/>
//         //                     <label class="form-check-label">Male</label>
//         //                 </div>
//         //                 <div class="form-inline form-check form-check-inline">
//         //                     <input class="form-check-input" type="radio" name="gender" id="female" value="female"/>
//         //                     <label class="form-check-label">Female</label>
//         //                 </div>
//         //                 <div className="form-inline">
//         //                     <label className="form-label">Date of Birth</label>
//         //                     <input type="text" className="form-control" id="datepicker"/>
//         //                 </div>
//         //                 <button type="button" class="btn btn-danger mt-2">Sign-Up</button>
//         //             </form>
//         //         </div>
//         //     </div>
//         // </div>
//     );
// }
// }