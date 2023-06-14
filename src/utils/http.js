import axios from 'axios';
const BASE_URL = 'http://localhost:5500'

const http = axios.create({
    baseURL: BASE_URL,
});

const httpPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {'Content-Type': 'application/json'}
})

export const get = async (path, option = {}) => {
    const res = await http.get(path, option);
    return res;
};

export const post = async (path, option = {}) => {
    const res = await http.post(path, option, {
        withCredentials: true,
    });
    return res;
};

export const patch = async (path, option = {}) => {
    const res = await http.patch(path, option);
    return res;
};

export const dele = async (path, option = {}) => {
    const res = await http.delete(path, option);
    return res;
};

export default http;
export {
    httpPrivate
}