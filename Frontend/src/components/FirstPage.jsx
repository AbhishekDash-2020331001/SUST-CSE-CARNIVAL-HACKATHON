import React from 'react';
import { Link } from 'react-router-dom';

const FirstPage = () => {
    return (
        <div className="flex flex-col h-screen bg-[url('../output/bg111.jpg')] bg-cover bg-center w-screen justify-center items-center">
             <h1 className="-mt-12 mb-10 text-8xl font-bold font-serif text-[#698dc1] custom-shadow hover:shrink-0 transform hover:scale-105 duration-500 first-letter:text-9xl">QUEEN</h1>
                 <div className="-mr-20 mt-16 flex justify-center items-center space-x-10">
                    <Link to="/login">
                        <button className="ml-12 text-3xl px-8 py-4 bg-[#ab9bc1] text-[#251b25] rounded-full focus:outline-none focus:bg-blue-950 hover:bg-[#dce1ea] hover:text-[#132542] hover:shrink-0 transform hover:scale-105 duration-500">Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className="text-3xl px-8 py-4 bg-[#ab9bc1] text-[#251b25] rounded-full focus:outline-none focus:bg-blue-950 hover:bg-[#dce1ea] hover:text-[#132542] hover:shrink-0 transform hover:scale-105 duration-500">Sign Up</button>
                    </Link>
                 </div>
        </div>

    );
};

export default FirstPage;
