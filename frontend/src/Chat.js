import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! How can I assist you today?" }]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    // Add user message to the chat
    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    // Send message to server
    try {
      const response = await fetch("http://localhost:5000/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await response.json();

      // Add bot response to the chat
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: data.text }]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-blue-600 text-white text-center text-lg">Rosy-AI</div>
      <div className="flex flex-col p-4 overflow-y-auto h-64" id="chat-body">
        {messages.map((message, index) => (
          <div key={index} className={`my-2 p-2 rounded-lg max-w-xs ${message.sender === "bot" ? "bg-gray-200 self-start" : "bg-blue-500 text-white self-end"}`}>
            <strong>{message.sender === "bot" ? "Rosy-AI" : "You"}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div className="flex p-4 border-t">
        <input type="text" value={userInput} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="Type a message..." className="flex-grow p-2 border rounded-lg focus:outline-none focus:border-blue-400" />
        <button onClick={handleSendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
