import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'https://inventorymanagementredux-reduxtoolkit.onrender.com',
});
export default axiosInstance;
