import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if speech is active
  const currentSpeech = useRef(null); // Track the current speech synthesis instance
  const silenceTimer = useRef(null);

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
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const speak = (text) => {
    if (isSpeaking) {
      // If speech is already active, stop it
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;  // Faster speech
    utterance.pitch = 0.8; // Slightly deeper tone
    utterance.volume = 1.2; // Louder volume

    utterance.onend = () => {
      setIsSpeaking(false); // Mark speech as ended
    };

    currentSpeech.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true); // Mark speech as active
  };

  const stopSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel(); // Stop the current speech
      setIsSpeaking(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const startVoiceMode = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');

      // Check for wake phrase
      if (!isVoiceMode && transcript.toLowerCase().includes("turn on voice integration")) {
        setIsVoiceMode(true);
        speak("Voice integration activated. I'm listening...");
        return;
      }

      // If in voice mode
      if (isVoiceMode) {
        // Reset silence timer on new input
        if (silenceTimer.current) clearTimeout(silenceTimer.current);
        silenceTimer.current = setTimeout(() => {
          handleVoiceCommand(transcript);
          setIsVoiceMode(false);
        }, 4000); // 4-second silence timeout
      }
    };

    recognition.start();
  };

  const handleVoiceCommand = async (transcript) => {
    try {
      const response = await fetch('https://vox-titan-backend.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: transcript }),
      });
      const data = await response.json();
      
      // Add to chat
      setMessages(prev => [...prev, { user: transcript, ai: data.response }]);
      
      // Enhanced TTS
      speak(data.response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (isVoiceMode) {
      speak("Voice integration activated. I'm listening...");
    }
  }, [isVoiceMode]);

  return (
    <div className="app">
      <header>
        <h1>VoxTitan</h1>
        <p>Powered by Together.ai (Llama-3.3-70B-Instruct-Turbo)</p>
        <p>Developed by team Non-Existing Garbage</p>
      </header>

      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p className="user-message"><strong>You:</strong> {msg.user}</p>
            <div className="ai-message">
              <strong>AI:</strong> 
              <MarkdownRenderer content={msg.ai} />
              <div className="message-actions">
                <button onClick={() => speak(msg.ai)}>
                  {isSpeaking ? "⏹️" : "🔊"}
                </button>
                <button onClick={() => copyToClipboard(msg.ai)}>📋</button>
              </div>
            </div>
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
        <button onClick={startVoiceMode} disabled={isVoiceMode}>
          {isVoiceMode ? "Listening..." : "🎤"}
        </button>
      </div>

      {isVoiceMode && <div className="voice-mode-indicator">🎤</div>}
    </div>
  );
}

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={tomorrow}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>{children}</code>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default App;