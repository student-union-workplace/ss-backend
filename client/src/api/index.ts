import axios from "axios";

export const BASE_URL = 'http://213.176.92.82/api'

const token = localStorage.getItem('token')

export const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {'Authorization': 'Bearer ' + token}
});