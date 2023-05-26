import axios from "axios";

export default axios.create({
    baseURL: 'http://10.252.3.195:3333/api'
});