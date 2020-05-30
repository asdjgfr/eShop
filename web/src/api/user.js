import axios from "axios";
const login = () => axios.post("/api/login");

export default { login };
