import './registerPage.css'
import {useState} from "react";
import {login, User, register} from './service/api';
import {Link} from "react-router-dom";
import {Field, Formik, ErrorMessage, Form} from "formik";

export const RegisterPage = () => {
    const [error, setError] = useState('')


    const handleRegister = async (values: { email: string; password: string; passwordConfirm: string }) => {
        if (password !== passwordConfirm) {
            setError('Passwörter stimmen nicht überein');
            return;
        }

        try {
            const result: User = await register(values.email, values.password);
            console.log('Registrierung erfolgreich:', result);

        } catch {
            setError('Registrierung fehlgeschlagen');
        }
    }

        return (
            <Formik
                initialValues={{email: '', password: '', passwordConfirm: ''}}
                onSubmit={handleRegister}>
                {() => (

                    <div className="container">
                        <div className="login-header">
                            <h1>Willkommen</h1>
                            <p>Bitte registriere dich mit deinen Daten</p>
                        </div>
                        <Form className="login-form">
                            <div className="email">
                                <label htmlFor="email">E-Mail-Adresse</label>
                                <Field
                                    type="email"
                                    id="email"
                                    placeholder="deine@email.com"
                                    name="email"
                                    required
                                />

                            </div>
                            <div className="password">
                                <label htmlFor="password">Passwort</label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Dein Passwort"
                                    required
                                />
                            </div>
                            <div className="password">
                                <label htmlFor="password">Passwort wiederholen</label>
                                <Field
                                    type="password"
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    placeholder="Dein Passwort"
                                />

                            </div>

                            {error && <p className="error-message">{error}</p>}

                        </Form>
                        <button type="submit" className="login-btn">Registrieren</button>

                        <div className="register">
                            <p>Schon ein Konto? <Link to="/login">Jetzt anmelden</Link></p>
                        </div>
                    </div>

                )}
            </Formik>
        );
    };