import axios from "axios";
const axiosInstance =  axios.create({
    // baseURL:'http://127.0.0.1:5001/clone-35cea/us-central1/api',
    baseURL:'https://amazon-api-yuos.onrender.com'
})
export {axiosInstance}