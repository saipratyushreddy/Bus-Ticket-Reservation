import axios from 'axios'

export function getBuses(from,to) {
    const URL = "http://localhost:4200/busSearch"
    return axios.post(URL,{from,to});
}

export function Buses() {
    const URL = "http://localhost:4200/busSearch"
    return axios.get(URL);
}
export function sendingData(data,date){
    data.date=date;
    return data;
}