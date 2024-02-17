import React, { useState } from 'react';
import Navbar from './Navbar';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            setMessages([...messages, { text: inputMessage, sender: 'user' }]);
            // Replace the following comment with your actual OpenAI API call
            // CallOpenAI(inputMessage);
            setInputMessage('');
        }
    };

    // Replace this function with your actual OpenAI API call function
    const CallOpenAI = async (input) => {
        try {
            // Your OpenAI API call logic goes here
            // Example: const response = await fetch('your_openai_api_endpoint', { method: 'POST', body: JSON.stringify({ input }) });
            // Update messages with the response from OpenAI
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 overflow-y-auto p-6">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-4 max-w-md ${
                            message.sender === 'user' ? 'self-end' : 'self-start'
                        }`}
                    >
                        <div
                            className={`p-4 rounded-lg shadow-md ${
                                message.sender === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200'
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t">
                <div className="flex items-center space-x-4">
                    <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-2 border rounded outline-none focus:border-blue-500 resize-none"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;