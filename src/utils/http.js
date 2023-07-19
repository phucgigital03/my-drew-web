import axios from 'axios';
const URL_API = process.env.REACT_APP_URL_API

const http = axios.create({
    baseURL: URL_API,
});

const httpPrivate = axios.create({
    baseURL: URL_API,
    withCredentials: true,
    headers: {'Content-Type': 'application/json'}
})

const httpPrivateFile = axios.create({
    baseURL: URL_API,
    withCredentials: true,
    headers: {'Content-Type': 'multipart/form-data'}
})

export const get = async (path, option = {}) => {
    const res = await http.get(path, option);
    return res;
};

export const post = async (path, body = {}, option = {}) => {
    const res = await http.post(path, body, {
        withCredentials: true,
        ...option
    });
    return res;
};

export const patch = async (path, option = {}) => {
    const res = await http.patch(path, option);
    return res;
};

export const put = async (path, option = {}) => {
    const res = await http.put(path, option);
    return res;
};

export const dele = async (path, option = {}) => {
    const res = await http.delete(path, option);
    return res;
};

export default http;
export {
    httpPrivate,
    httpPrivateFile
}