import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3030',
    headers: {
        'Content-Type': 'application/json',
    }
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response, (error) => {
        if(error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error)
    }
)

export interface Car {
    id: string;
    Name: string;
    Year: string;
    Miles_per_Gallon: number | null;
    Cylinders: number | null;
    Displacement: number | null;
    Horsepower: number | null;
    Weight_in_lbs: number | null;
    Acceleration: number | null;
    Origin: string | null;
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
export const getCars = async (): Promise<Car[]> => {
    const response = await api.get<Car[]>('/cars');
    return response.data;
}

// GET single car
export const getCar = async (id: string): Promise<Car> => {
    const response = await api.get<Car>(`/cars/${id}`);
    return response.data;
}

// POST new car
export const createCar = async (car: Car): Promise<Car> => {
    const response = await api.post<Car>('/cars', car);
    return response.data;
}

// PUT update car
export const updateCar = async (id: string, car: Car): Promise<Car> => {
    const response = await api.put<Car>(`/cars/${id}`, car);
    return response.data;
}

// DELETE car
export const deleteCar = async (id: string): Promise<void> => {
    await api.delete(`/cars/${id}`);
}
