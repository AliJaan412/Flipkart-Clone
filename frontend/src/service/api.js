import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

export const client = axios.create({ baseURL: API_BASE_URL });

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authenticateLogin = async (user) => {
    try {
        return await client.post('/login', user)
    } catch (error) {
        console.log('Error while calling login API: ', error);
    }
}

export const authenticateSignup = async (user) => {
    try {
        return await client.post('/signup', user)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
    }
}

export const getProductById = async (id) => {
    try {
        return await client.get(`/product/${id}`);
    } catch (error) {
        console.log('Error while getting product by id response', error);
    }
}

export const getProfile = async () => {
    try {
        return await client.get('/profile');
    } catch (error) {
        console.log('Error while getting profile', error);
    }
}
