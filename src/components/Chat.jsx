import React, { useState } from 'react';
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

function Chat({ settings }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const client = new BedrockRuntimeClient({
        region: settings.region,
        credentials: {
          accessKeyId: settings.accessKeyId,
          secretAccessKey: settings.secretAccessKey,
          sessionToken: settings.sessionToken || undefined,
        },
      });

      const prompt = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
          { role: "user", content: userMessage }
        ]
      };

      const command = new InvokeModelCommand({
        modelId: settings.modelId,
        body: JSON.stringify(prompt),
        contentType: "application/json",
        accept: "application/json",
      });

      const response = await client.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: responseBody.content[0].text 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, an error occurred: ' + error.message 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default Chat;
