import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import Navbar from './Navbar';

const ChatPage = () => {
    const [showResult, setShowResult] = useState(false);
    const navigate=useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    //const [gRes, setGRes] = useState(false);
    //const history = useHistory();  // Create a history object using useHistory

    const handleSendMessage = async () => {
        if (inputMessage.trim() !== '') {
            const userMessage = { text: inputMessage, sender: 'user' };
            setMessages([...messages, userMessage]);
            setInputMessage('');

            try {
                const response = await CallOpenAI(inputMessage);
                const assistantMessage = { text: response.choices[0].message.content, sender: 'assistant' };
                setMessages((prevMessages) => [...prevMessages, assistantMessage]);
            } catch (error) {
                console.error('Error calling OpenAI API:', error);
            }
        }
    };

    const handleSendAndViewResult = async () => {
        // Similar logic as handleSendMessage
        await handleSendMessage();

        // Set gRes to true to conditionally render the Result component
        //setGRes(true);

        const resultUrl = `/result?searchString=${encodeURIComponent(inputMessage)}`;
        window.open(resultUrl, '_blank');
        // Redirect to the Result page with the inputMessage as a query parameter
        //history.push(`/result?searchString=${encodeURIComponent(inputMessage)}`);
    };

    const CallOpenAI = async (input) => {
        try {
            const response = await fetch('http://localhost:8000/auth/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: input
                }),
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error('Error calling backend API:', response.statusText);
            }
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            throw error;
        }
    };

    // Conditionally render the Result component based on gRes
    return (
        <div className="h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 overflow-y-auto p-6">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-4 max-w-md ${message.sender === 'user' ? 'ml-auto' : ''}`}
                    >
                        <div
                            className={`p-4 rounded-lg shadow-md ${
                                message.sender === 'user'
                                    ? 'bg-[#a8c9e8] text-[#060f17]'
                                    : 'bg-gray-200'
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t">
                <div className="flex items-center space-x-10 pl-10 pr-10 pt-4 pb-4">
                    <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-2 border rounded-lg outline-none focus:border-blue-500 resize-none"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="w-20 px-4 py-2 bg-[#ba7dba] text-white rounded-lg hover:bg-[#c9a2d4] hover:text-blue-950"
                    >
                        Send
                    </button>
                    <button
                        onClick={handleSendAndViewResult}
                        className="w-28 px-4 py-2 bg-[#ba7dba] text-white rounded-lg hover:bg-[#c9a2d4] hover:text-blue-950"
                    >
                        Send and View Result
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
