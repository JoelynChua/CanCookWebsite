import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "can-cook-website-frontend-a5o88nlzk-joelynchuas-projects.vercel.app",
    headers: {"Content-Type" : "application/json"},
    withCredentials: false,
});

export default axiosInstance;
     