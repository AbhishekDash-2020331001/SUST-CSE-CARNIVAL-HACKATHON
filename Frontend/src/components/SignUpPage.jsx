import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    //const navigate = useNavigate();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignUpSubmit=async(e)=>{
        e.preventDefault();

        if (password != confirmPassword) {
             alert("Password not matching")
        }
        try {
            //console.log('Form data submitted:', formData);
            const formData = {
                name:name,
                username: username,
                email: email,
                password: password
            }
            console.log(formData)
            let jsonData = "";
            const response = await fetch('http://localhost:8000/auth/register', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
                
            });
            jsonData = await response.json()
            console.log(jsonData)
            if (response.ok) {
                setSuccessMessage('Verification mail sent. Please check your email.');
            } else {
                setError(jsonData.message || 'Something went wrong. Please try again.');
                //console.log(error)
            }

            // Clear messages after 3 seconds
            setTimeout(() => {
                setError(null);
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            setError('Something went wrong. Please try again.');
            console.error('Error submitting form:', error);

        }
    }
    return (
        <div className="bg-[#f2e9e4] h-screen flex justify-center items-center">
            <div className="bg-[rgb(201,173,167)] p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-[#22223b]">Sign Up</h2>
                <form onSubmit={handleSignUpSubmit} className="mb-4">
                    <label className="lb">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-field"
                        required
                    />

                    <label className="lb">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-field"
                        required
                    />

                    <label className="lb">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-field"
                        required
                    />

                    <label className="lb">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-field"
                        required
                    />

                    <label className="lb">Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="text-field"
                        required
                    />

                    <button type="submit" className="btn">
                        Sign Up
                    </button>

                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                </form>

                <p className="mt-4 text-sm">
                    Already have an account? <Link to="/login" className="text-blue-500">Sign In here</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;