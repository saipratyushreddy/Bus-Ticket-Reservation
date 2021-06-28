import axios from 'axios'
let url='http://localhost:4200/login'
export function logUserIn(email,password) {
    return axios.post(url,{email,password});
}

export function loginData(){
    return axios.get(url);
}