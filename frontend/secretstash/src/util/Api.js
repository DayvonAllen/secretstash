import axios from 'axios';
const {URL} = process.env;

const Api = axios.create({
    baseURL: URL
});

export default Api;