import axios from "axios"
import { getBlogToken, getToken } from "../helper/tokenHelper";

const { VITE_BACKEND_PORT_DEVELOPMENT } = import.meta.env

//for user
axios.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
//for blog
axios.interceptors.request.use((config) => {
    const token = getBlogToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


const config = {
    headers: { "Content-Type": "multipart/form-data" }
}




//User
export const RegisterUser = async (data) => {
    return await axios.post(`${VITE_BACKEND_PORT_DEVELOPMENT}register`, data)
}

export const LoginUser = async (data) => {
    return await axios.post(`${VITE_BACKEND_PORT_DEVELOPMENT}login`, data, config)
}

//Blog
export const BlogGetAPI = async () => {
    return await axios.get(`${VITE_BACKEND_PORT_DEVELOPMENT}blog`)
}
export const BlogCreateAPI = async (data) => {
    return await axios.post(`${VITE_BACKEND_PORT_DEVELOPMENT}blog`, data, config)
}
export const BlogDeleteAPI = async (id) => {
    return await axios.delete(`${VITE_BACKEND_PORT_DEVELOPMENT}blog/${id}`)
}

// Category 
export const CategoryCreateAPI = async (data) => {
    return await axios.post(`${VITE_BACKEND_PORT_DEVELOPMENT}category`, data, config)
}
export const CategoryGetAPI = async (data) => {
    return await axios.get(`${VITE_BACKEND_PORT_DEVELOPMENT}category`,)
}
export const CategoryDeleteAPI = async (id) => {
    return await axios.delete(`${VITE_BACKEND_PORT_DEVELOPMENT}category/${id}`)
}
export const CategoryUpdateAPI = async (id, data) => {
    return await axios.patch(`${VITE_BACKEND_PORT_DEVELOPMENT}category/${id}`, data)
}

//Profile
export const ProfileUpdateAPI = async (data) => {
    return await axios.post(`${VITE_BACKEND_PORT_DEVELOPMENT}user`, data, config)
}
export const ProfileGetAPI = async (data) => {
    return await axios.get(`${VITE_BACKEND_PORT_DEVELOPMENT}user`)
}