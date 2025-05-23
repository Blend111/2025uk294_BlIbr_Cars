import './registerPage.css'
import {useState} from "react";
import {login, User, register} from './service/api';
import {Link} from "react-router-dom";
import {Field, Formik, ErrorMessage, Form} from "formik";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';



export const RegisterPage = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleRegister = async (values: { email: string; password: string; passwordConfirm: string }) => {

        try {
            const result: User = await register(values.email, values.password);
            console.log('Registrierung erfolgreich:', result);
            navigate('/login');

        } catch {
            setError('Registrierung fehlgeschlagen');
            console.log('Registrierung fehlgeschlagen');
        }
    }


    const registerSchema = Yup.object({
        email: Yup.string()
            .email('Ungültige E-Mail-Adresse')
            .required('E-Mail ist erforderlich'),
        password: Yup.string()
            .min(6, 'Passwort muss mindestens 6 Zeichen haben')

            .required('Passwort ist erforderlich'),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwörter müssen übereinstimmen')
            .required('Passwort bestätigen ist erforderlich'),
    });

        return (
            <Formik
                initialValues={{email: '', password: '', passwordConfirm: ''}}
                onSubmit={handleRegister}
                validationSchema={registerSchema}
            >

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
                                <ErrorMessage name="email" component="div" className="error-message" />

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
                                <ErrorMessage name="password" component="div" className="error-message" />
                            </div>

                            <div className="password">
                                <label htmlFor="passwordConfirm">Passwort wiederholen</label>
                                <Field
                                    type="password"
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    placeholder="Dein Passwort"
                                />
                                <ErrorMessage name="passwordConfirm" component="div" className="error-message" />
                            </div>


                            {error && <p className="error-message">{error}</p>}
                            <button type="submit" className="login-btn">Registrieren</button>

                        </Form>


                        <div className="register">
                            <p>Schon ein Konto? <Link to="/login">Jetzt anmelden</Link></p>
                        </div>
                    </div>

                )}
            </Formik>
        );
    };