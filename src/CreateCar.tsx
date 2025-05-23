import { useState } from 'react';
import { createCar, Car } from './service/api';
import './CreateCar.css';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import * as Yup from 'yup';



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

    const carSchema = Yup.object({
        Name: Yup.string()
            .min(2, 'Name muss mindestens 2 Zeichen haben')
            .required('Name ist erforderlich'),
        Year: Yup.date()
            .max(new Date(), 'Baujahr kann nicht in der Zukunft liegen')
            .required('Baujahr ist erforderlich'),
        Miles_per_Gallon: Yup.number()
            .positive('Muss eine positive Zahl sein')
            .max(100, 'Unrealistischer Wert')
            .required('Miles per Gallon ist erforderlich'),
        Cylinders: Yup.number()
            .integer('Muss eine ganze Zahl sein')
            .min(1, 'Mindestens 1 Zylinder')
            .max(16, 'Maximal 16 Zylinder')
            .required('Zylinderanzahl ist erforderlich'),
        Displacement: Yup.number()
            .positive('Muss eine positive Zahl sein')
            .required('Hubraum ist erforderlich'),
        Horsepower: Yup.number()
            .positive('Muss eine positive Zahl sein')
            .max(2000, 'Unrealistischer Wert')
            .required('PS ist erforderlich'),
        Weight_in_lbs: Yup.number()
            .positive('Muss eine positive Zahl sein')
            .required('Gewicht ist erforderlich'),
        Acceleration: Yup.number()
            .positive('Muss eine positive Zahl sein')
            .required('Beschleunigung ist erforderlich'),
        Origin: Yup.string()
            .min(2, 'Herkunft muss mindestens 2 Zeichen haben')
            .required('Herkunft ist erforderlich'),
    });



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
                validationSchema={carSchema}
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
                            <ErrorMessage name="Name" component="div" className="error-message" />
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
                            <ErrorMessage name="Year" component="div" className="error-message" />
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
                            <ErrorMessage name="Miles_per_Gallon" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Cylinders">Zylinder</label>
                            <Field
                                type="number"
                                id="Cylinders"
                                name="Cylinders"
                                placeholder="z.B. 6"
                            />
                            <ErrorMessage name="Cylinders" component="div" className="error-message" />
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
                            <ErrorMessage name="Displacement" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Horsepower">PS</label>
                            <Field
                                type="number"
                                id="Horsepower"
                                name="Horsepower"
                                placeholder="z.B. 280"
                            />
                            <ErrorMessage name="Horsepower" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Weight_in_lbs">Gewicht (kg)</label>
                            <Field
                                type="number"
                                id="Weight_in_lbs"
                                name="Weight_in_lbs"
                                placeholder="z.B. 3400"
                            />
                            <ErrorMessage name="Weight_in_lbs" component="div" className="error-message" />
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
                            <ErrorMessage name="Acceleration" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Origin">Herkunft</label>
                            <Field
                                type="text"
                                id="Origin"
                                name="Origin"
                                placeholder="z.B. Deutschland"
                            />
                            <ErrorMessage name="Origin" component="div" className="error-message" />
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
