import React from 'react';
import Navbar from './Navbar';

const LoginComplete = () => {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-2xl font-bold mb-4">Successfully Logged In!</h2>
                <p>
                    Welcome to the application. You are now logged in.
                </p>
            </div>
        </div>
    );
};

export default LoginComplete;
