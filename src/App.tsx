import {useState} from 'react'
import './App.css'
import {LoginPage} from './loginPage'
import {RegisterPage} from './registerPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage";
import {PrivateRoute} from "./service/PrivateRoute";
import {CreateCar} from "./CreateCar";


function App() {



    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={
                    <PrivateRoute>
                    <HomePage />
                </PrivateRoute>
                } />
                <Route path="/create" element={<CreateCar />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
