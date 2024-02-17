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
        <div className="h-screen bg-[url('../output/pinkroses.jpg')] bg-cover bg-center flex flex-col justify-center items-center">
            <div className="-ml-20 flex flex-col items-center justify-center h-3/4 w-1/4 bg-[#e0d2e4] shadow-lg rounded-2xl hover:shrink-0 transform hover:scale-105 duration-500">
            <h2 className="text-5xl font-bold font-mono mb-7 text-[#155b98] shadow-lg">Login</h2>
            <form onSubmit={handleLoginSubmit} className="flex flex-col items-center w-4/5">
                <label className="lb">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="text-field"
                    placeholder="Enter your email..."
                    required
                />

                <label className="lb">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="text-field"
                    placeholder="Enter the password..."
                    required
            
                />
                {loginError && <p className="text-red-500 mb-4">Email or password is incorrect</p>}
                <button type="submit" className="btn mt-4">
                    Sign in
                </button>
            </form>
            <p className="mt-4">
                Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-[#531044]">Register here</Link>
            </p>
            </div>
        </div>
    );
};

export default LoginPage;