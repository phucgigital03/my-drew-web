import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:5500',
});

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