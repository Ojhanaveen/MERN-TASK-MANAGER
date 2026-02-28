import axios from "axios";

const api = axios.create({
 baseURL: "https://mern-task-manager-uy2j.onrender.com/api",
});

export default api;