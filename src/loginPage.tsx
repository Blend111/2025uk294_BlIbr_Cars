import './loginPage.css'
import {useState} from "react";
import {login} from './service/api';
import {Link} from 'react-router-dom';
import {Field, Form, Formik} from "formik";

export const LoginPage = () => {
    const [error, setError] = useState('')


    const handleLogin = async (values: {email, password}: any) =>{
        const result = await login(values.email, values.password);

        localStorage.setItem('token', result.accessToken || '');
        console.log('Login erfolgreich:');
        result;
    }



    return (
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={handleLogin}
        >
            {() => (

                <div className="container">
                    <div className="login-header">
                        <h1>Willkommen zurück</h1>
                        <p>Bitte melde dich mit deinen Daten an</p>
                    </div>
                    <Form className="login-form">
                        <div className="email">
                            <label htmlFor="email">E-Mail-Adresse</label>
                            <Field type="email"
                                   id="email"
                                   placeholder="deine@email.com"
                                   name="email"
                                   required/>
                        </div>
                        <div className="password">
                            <label htmlFor="password">Passwort</label>
                            <Field type="password"
                                   id="password"
                                   placeholder="Dein Passwort"
                                   name="password" required/>
                        </div>
                    </Form>
                    <button className="login-btn">Anmelden</button>

                    <div className="register">
                        <p>Noch kein Konto? <Link to="/register">Jetzt registrieren</Link></p>
                    </div>
                </div>
            )}
        </Formik>
    );
};