import {useState} from 'react'
import './App.css'
import {LoginPage} from './loginPage'
import {RegisterPage} from './registerPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./HomePage";
import {CreateCar} from "./CreateCar";
import {UpdateCar} from "./UpdateCar";


function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/create" element={<CreateCar/>}/>
                <Route path="/cars/:id" element={<UpdateCar/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
