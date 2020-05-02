import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export default axiosInstance