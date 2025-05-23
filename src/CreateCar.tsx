import { useState } from 'react';
import { createCar, Car } from './service/api';
import './CreateCar.css';
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";



export const CreateCar = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values: Car) => {


        try {
            const carData={
                ...values,
            };

            await createCar(carData);
            navigate("/")

        } catch (err) {
            setError('Fehler beim Erstellen des Autos.');
            console.error('Fehler beim Erstellen des Autos:', err);
        }


    };


    return (
        <div className="create-car-container">
            <h1>Neues Auto hinzufügen</h1>

            <Formik
                initialValues={{
                    id: '',
                    Name: '',
                    Year: '',
                    Miles_per_Gallon: null,
                    Cylinders: null,
                    Displacement: null,
                    Horsepower: null,
                    Weight_in_lbs: null,
                    Acceleration: null,
                    Origin: ''
                }}

                onSubmit={handleSubmit}
            >
                {({ isSubmitting: formikSubmitting }) => (


                    <Form>


                        <div className="form-group">
                            <label htmlFor="Name">Name</label>
                            <Field
                                type="text"
                                id="Name"
                                name="Name"
                                placeholder="z.B. BMW M3"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Year">Baujahr</label>
                            <Field
                                type="date"
                                id="Year"
                                name="Year"
                                min="1900"
                                max={new Date().getFullYear()}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Miles_per_Gallon">Meilen pro Gallone</label>
                            <Field
                                type="number"
                                id="Miles_per_Gallon"
                                name="Miles_per_Gallon"
                                placeholder="z.B. 21.5"
                                step="0.1"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Cylinders">Zylinder</label>
                            <Field
                                type="number"
                                id="Cylinders"
                                name="Cylinders"
                                placeholder="z.B. 6"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Displacement">Hubraum</label>
                            <Field
                                type="number"
                                id="Displacement"
                                name="Displacement"
                                placeholder="z.B. 2800"
                                step="0.1"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Horsepower">PS</label>
                            <Field
                                type="number"
                                id="Horsepower"
                                name="Horsepower"
                                placeholder="z.B. 280"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Weight_in_lbs">Gewicht (kg)</label>
                            <Field
                                type="number"
                                id="Weight_in_lbs"
                                name="Weight_in_lbs"
                                placeholder="z.B. 3400"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Acceleration">Beschleunigung</label>
                            <Field
                                type="number"
                                id="Acceleration"
                                name="Acceleration"
                                placeholder="z.B. 8.5"
                                step="0.1"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Origin">Herkunft</label>
                            <Field
                                type="text"
                                id="Origin"
                                name="Origin"
                                placeholder="z.B. Deutschland"
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={formikSubmitting}
                        >
                            {formikSubmitting ? 'Wird gespeichert...' : 'Auto speichern'}
                        </button>

                        <button className="btnn" type="button" onClick={() => {navigate("/")}}>Abbrechen</button>
                    </Form>
                )}
            </Formik>

        </div>

    );

    };
