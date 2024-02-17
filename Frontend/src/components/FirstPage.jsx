import React from 'react';
import { Link } from 'react-router-dom';

const FirstPage = () => {
    return (
        <div className=" flex flex-col h-screen bg-[url('../output/pink2bg.jpg')] bg-cover bg-center w-screen justify-center items-center">
            <div className="absolute left-1/4 top-1/3 transform -translate-y-1/2 -ml-20">
                 <h1 className="-ml-24 sm:-ml-20 mt-16 text-[9vw] text-9xl font-bold font-serif text-[#1d3557] custom-shadow hover:shrink-0 transform hover:scale-105 duration-500">Queen</h1>
            </div>
            <div className="absolute bottom-1/3 left-1/4 flex space-x-10 -ml-10">
                 <Link to="/login">
                <button className="bg-[#d19fb9] text-[#502528] py-2 px-4 rounded-full text-3xl focus:outline-none  hover:bg-[#d0d7e2] hover:text-[#5b285b] shadow-md hover:shrink-0 transform hover:scale-105 duration-500">Login</button>
                </Link>
                 <Link to="/signup">
                 <button className="bg-[#d19fb9] text-[#502528] py-2 px-4 text-3xl rounded-full focus:outline-none hover:bg-[#d0d7e2] hover:text-[#5b285b] shadow-md hover:shrink-0 transform hover:scale-105 duration-500">Sign Up</button>
                 </Link>
            </div>
        </div>
    );
};

export default FirstPage;
