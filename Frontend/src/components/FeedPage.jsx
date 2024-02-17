import React, { useEffect, useState } from 'react';
import FeedPageChild from './FeedPageChild';

const FeedPage = () => {
    const [data, setData] = useState([]);

    const getData = async () => {
        const searchString = "Iconic kajal";

        try {
            const response = await fetch(`http://localhost:8000/api/getnews?search=${searchString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();
            
            if (response.ok) {
                setData(responseData); // Set data in state
                console.log(data)
            } else {
                console.log("Error Occurred:", responseData.message || 'Something went wrong.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container mx-auto py-8 bg-pink-100 h-screen">
            <FeedPageChild data={data} />
        </div>
    );
};

export default FeedPage;
