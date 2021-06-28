import axios from 'axios'

export function registerUser(newUserDetails){
    let apiUrl = 'http://localhost:4200/registerUser'
    return axios.post(apiUrl,newUserDetails);
}
