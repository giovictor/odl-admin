import axios from 'axios'
import token from '../helpers/token'

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
})

export default axiosInstance