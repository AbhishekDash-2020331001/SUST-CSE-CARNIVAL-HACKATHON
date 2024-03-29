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
        <div className="bg-[url('../output/pinkbg.jpg')] bg-cover bg-center h-screen flex justify-center items-center">
            <div className="h-5/6 w-2/7 bg-[rgb(228,221,228)] p-8 pt-4 rounded-lg shadow-md max-w-md w-full hover:shrink-0 transform hover:scale-105 duration-500 shadow-gray-500">
                <h2 className="text-2xl font-bold mb-2 text-[#22223b]">Sign Up</h2>
                <form onSubmit={handleSignUpSubmit} className="mb-4">
                    <label className="lb2">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-field2"
                        placeholder="Type your name..."
                        required
                    />

                    <label className="lb2">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-field2"
                        placeholder="Type the username..."
                        required
                    />

                    <label className="lb2">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-field2"
                        placeholder="Enter your email address..."
                        required
                    />

                    <label className="lb2">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-field2"
                        placeholder="Enter your password..."
                        required
                    />

                    <label className="lb2">Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="text-field2 mb-2"
                        placeholder="Confirm password..."
                        required
                    />

                    <button type="submit" className="btn">
                        Sign Up
                    </button>

                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                </form>

                <p className="text-xs mt-[-10px] p-0 float-end">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:text-[#531044]">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;