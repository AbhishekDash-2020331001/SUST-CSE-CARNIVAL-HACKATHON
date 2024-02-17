import React, { useState } from 'react';
import Navbar from './Navbar';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

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
