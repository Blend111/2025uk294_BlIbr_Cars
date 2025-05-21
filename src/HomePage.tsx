// src/service/HomePage.tsx
import { useEffect, useState } from 'react';
import { AuthService } from './service/AuthService';
import { getCars, deleteCar, updateCar, createCar, Car} from './service/api';
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



            <div><p><Link to="/create">Jetzt Auto erstellen</Link></p>
                    <ul>
                        {cars.map(car => (
                            <div key={car.id} className="hallo-container">
                                <li className="car-item">
                                    <h3>Auto: {car.Name}</h3>
                                    <p>Baujahr: {car.Year}</p>
                                    {error && <p className="error-message">{error}</p>}
                                    <button className="btnn" onClick={() => navigate(`/cars/${car.id}/edit`)}>Edit</button>
                                    <button className="btnn" onClick={() => handleDelete(car.id)} style={{background: '#ff0000'}}>Delete</button>
                                </li>
                            </div>

                        ))}
                    </ul>
                )
            </div>
        </div>
    );
};

export default HomePage;