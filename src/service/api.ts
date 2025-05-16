import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3030',
    headers: {
        'Content-Type': 'application/json',
    }
});

interface Cars {
    id: string;
    name: string;
    year: number;
}

export interface User {
    email: string;
    password: string;
}

interface LoginResponse {
    accessToken?: string;
    token?: string;
    user?: {
        id: string;
        email: string;
    };
    message?: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post('/login', {
        email,
        password,
    });
    return response.data;
};

export const register = async (email:string, password:string): Promise<User> => {
    const response = await api.post('/register', {email, password});
    return response.data;
}

// GET all cars
export const getCars = async (): Promise<Cars[]> => {
    const response = await api.get<Cars[]>('/cars');
    return response.data;
}

// GET single car
export const getCar = async (id: string): Promise<Cars> => {
    const response = await api.get<Cars>(`/cars/${id}`);
    return response.data;
}

// POST new car
export const createCar = async (car: Cars): Promise<Cars> => {
    const response = await api.post<Cars>('/cars', car);
    return response.data;
}

// PUT update car
export const updateCar = async (id: string, car: Cars): Promise<Cars> => {
    const response = await api.put<Cars>(`/cars/${id}`, car);
    return response.data;
}

// DELETE car
export const deleteCar = async (id: string): Promise<void> => {
    await api.delete(`/cars/${id}`);
}
