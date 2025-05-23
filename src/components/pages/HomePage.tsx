// src/service/HomePage.tsx
import { useEffect, useState } from 'react';
import { AuthService } from '../service/AuthService';
import { getCars, deleteCar, updateCar, createCar, Car} from '../service/api';
import {Link, useNavigate} from 'react-router-dom';
import './HomePage.css'

const HomePage = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {

        const loadCars = async () => {

                const carsData = await getCars();
                setCars(carsData);
                setLoading(false);

        };

        loadCars();
    }, []);






    const handleDelete = async (id: string) => {
        if (window.confirm('Möchtest du dieses Auto wirklich löschen?')) {
            try {
                await deleteCar(id);
                setCars(cars.filter(car => car.id !== id));
            } catch (err) {
                setError('Fehler beim Löschen des Autos.');
            }
        }
    };

    if (loading) {
        return <div className="loading">Laden...</div>;
    }

    return (
        <div className="home-container">
            <div className="home-header">
                <h1>Willkommen auf der Homepage</h1>
            </div>
            <button className="btnn" onClick={() => {localStorage.removeItem('token'); navigate("/login")}}>Logout</button>
            <button className="btnn" onClick={() => {navigate("/create")}}>Jetzt Auto erstellen</button>


            <div>

                    <ul>
                        {cars.map(car => (
                            <div key={car.id} className="hallo-container">
                                <li className="car-item">
                                    <h3>Auto: {car.Name}</h3>
                                    <p>Baujahr: {car.Year}</p>
                                    <p>Meilen pro Gallone: {car.Miles_per_Gallon}</p>
                                    <p>Zylinder: {car.Cylinders}</p>
                                    <p>Hubraum: {car.Displacement}</p>
                                    <p>PS: {car.Horsepower}</p>
                                    <p>Gewicht: {car.Weight_in_lbs}</p>
                                    <p>Beschleunigung: {car.Acceleration}</p>
                                    <p>Herkunft: {car.Origin}</p>
                                    {error && <p className="error-message">{error}</p>}
                                    <button className="btnn" onClick={() => navigate(`/cars/${car.id}`)}>Edit</button>
                                    <button className="btnn" onClick={() => handleDelete(car.id)} style={{background: '#ff0000'}}>Delete</button>
                                </li>
                            </div>

                        ))}
                    </ul>

            </div>
        </div>
    );
};

export default HomePage;