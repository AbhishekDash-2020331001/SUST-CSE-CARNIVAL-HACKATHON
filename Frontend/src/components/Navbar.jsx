import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate=useNavigate();
    function routeToWelcome(){
        navigate('/')
    }

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (response.ok) {
                // Clear the token from local storage
                localStorage.removeItem('token');
                routeToWelcome()
                // Redirect or perform other actions after logout
                // For example, you can redirect to the login page
                
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <nav className="bg-[hsl(317,32%,56%)] p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="pl-3 text-white font-bold text-2xl hover:shrink-0 transform hover:scale-105 duration-500">
                    QUEEN
                </div>
                <div className="space-x-9">
                    <Link to="/feed" className=" text-white  hover:text-slate-300">Feed</Link>
                    <Link to="/talk" className="text-white  hover:text-slate-300">Talk with Assistant</Link>
                    <button onClick={handleLogout} className="text-white  hover:shrink-0 transform hover:scale-105 duration-500">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;