import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate=useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    function routeToHome(){
        navigate('/homepage')
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                email: email,
                password: password
            }
            //let jsonData = "";
            await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            })
            .then(async response => {
                const data = await response.json()
                if (response.ok) {
                    const token = data.token
                    localStorage.setItem('token',token)
                    routeToHome()
                }
                else {
                    setLoginError(true)
                }
            })
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const token = localStorage.getItem('token')
                console.log(token)
                const response = await fetch('http://localhost:8000/api/verify/'+token, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }

                });
                if (response.ok) {
                    routeToHome()
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoggedIn();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLoginSubmit} className="flex flex-col items-center">
                <label className="mb-2">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="mb-4 p-2 border border-gray-300 rounded"
                    required
                />

                <label className="mb-2">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="mb-4 p-2 border border-gray-300 rounded"
                    required
                />
                {loginError && <p className="text-red-500 mb-4">Email or password is incorrect</p>}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Login
                </button>
            </form>
            <p className="mt-4">
                Don't have an account? <Link to="/signup" className="text-blue-500">Register here</Link>
            </p>
        </div>
    );
};

export default LoginPage;