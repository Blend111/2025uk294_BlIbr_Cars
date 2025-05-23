import './registerPage.css'
import {useState} from "react";
import {login, User, register} from './service/api';
import {Link} from "react-router-dom";
import {Field, Formik, ErrorMessage, Form} from "formik";
import * as Yup from 'yup';


export const RegisterPage = () => {
    const [error, setError] = useState('')


    const handleRegister = async (values: { email: string; password: string; passwordConfirm: string }) => {


        if (values.password !== values.passwordConfirm) {
            setError('Passwörter stimmen nicht überein');
            console.log('ddddddddddddddddd')
            return;
        }

        try {
            const result: User = await register(values.email, values.password);
            console.log('Registrierung erfolgreich:', result);

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
            .min(8, 'Passwort muss mindestens 8 Zeichen haben')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Passwort muss Groß-, Kleinbuchstaben und eine Zahl enthalten'
            )
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
                                <label>E-Mail-Adresse</label>
                                <Field
                                    htmlFor="email"
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