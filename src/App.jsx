import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('https://vox-titan-backend.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages([...messages, { user: input, ai: data.response }]);
      setInput('');
      speak(data.response); // Speak the AI's response
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition(); // For Chrome
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      if (transcript.toLowerCase().includes("turn on voice recognition")) {
        recognition.stop();
        startListening(); // Restart listening for user input
      } else {
        handleSend(); // Send the recognized text
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  useEffect(() => {
    if (isListening) {
      startListening();
    }
  }, [isListening]);

  return (
    <div className="app">
      <header>
        <h1>VoxTitan</h1>
        <p>Powered by Together.ai (Llama-3.3-70B-Instruct-Turbo)</p>
        <p>Developed by [Keerthi Kumar K J]</p>
      </header>

      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p className="user-message"><strong>You:</strong> {msg.user}</p>
            <p className="ai-message"><strong>AI:</strong> {msg.ai}</p>
          </div>
        ))}
        {isLoading && <div className="loading-spinner">Loading...</div>}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
        <button onClick={() => setIsListening(true)} disabled={isListening}>
          {isListening ? "Listening..." : "Voice"}
        </button>
      </div>
    </div>
  );
}

export default App;