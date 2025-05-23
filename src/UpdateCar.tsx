import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCar, updateCar, Car } from './service/api';
import './UpdateCar.css';
import { Field, Form, Formik } from 'formik';

export const UpdateCar = () => {
    const { id } = useParams();
    const [car, setCar] = useState<Car | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCar = async () => {
            try {
                if (id) {
                    const data = await getCar(id);
                    setCar(data);
                }
            } catch (err) {
                setError('Fehler beim Laden des Autos.');
            } finally {
                setLoading(false);
            }
        };

        loadCar();
    }, [id]);

    const handleSubmit = async (values: Car) => {
        try {
            if (!id) return;

            await updateCar(id, values);
            navigate('/'); // zurück zur Homepage
        } catch (err) {
            setError('Fehler beim Aktualisieren des Autos.');
        }
    };

    if (loading) return <div>Lade Fahrzeugdaten...</div>;
    if (!car) return <div>Auto nicht gefunden</div>;

    return (
        <div className="create-car-container">
            <h2>Auto bearbeiten</h2>

            <Formik initialValues={car}  onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="Name">Name</label>
                            <Field type="text" id="Name" name="Name" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Year">Baujahr</label>
                            <Field type="date" id="Year" name="Year" />
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
                            <Field type="text" id="Origin" name="Origin" />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Wird gespeichert...' : 'Änderungen speichern'}
                        </button>
                        <button className="btnn" type="button" onClick={() => {navigate("/")}}>Abbrechen</button>
                    </Form>

                )}
            </Formik>

        </div>
    );
};
