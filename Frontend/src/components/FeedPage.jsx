import React, { useEffect, useState } from 'react';
import FeedPageChild from './FeedPageChild';

const FeedPage = () => {
    const [data, setData] = useState([]);
    const [searchString, setSearchString] = useState("Manicure");

    const getData = async () => {
        try {
            // First API call to get keywords
            const tempString = `Give me some keywords to search according to this message separated by space."${searchString}"`;
            const tempResponse = await fetch('http://localhost:8000/auth/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: tempString
                }),
            });
            const tempResponseData = await tempResponse.json();
    
            if (tempResponse.ok) {
                const updatedSearchString = tempResponseData.choices[0].message.content.slice(0, 20);
                console.log(`Updated search string: ${updatedSearchString}`);
    
                // Second API call using the truncated searchString
                try {
                    const response = await fetch(`http://localhost:8000/api/getnews?search=${updatedSearchString}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
    
                    const responseData = await response.json();
    
                    if (response.ok) {
                        setData(responseData);
                        setSearchString(updatedSearchString); // Update searchString if needed
                    } else {
                        console.log("Error Occurred:", responseData.message || 'Something went wrong.');
                    }
                } catch (error) {
                    console.error('Error fetching news:', error);
                }
            }
        } catch (error) {
            console.error('Error in the first API call:', error);
        }
    };
    useEffect(() => {
        getData();
    }, []); // No need to include searchString as a dependency for the initial call

    return (
        <div className="container mx-auto py-8 bg-pink-100 h-screen">
            <FeedPageChild data={data} />
        </div>
    );
};

export default FeedPage;
