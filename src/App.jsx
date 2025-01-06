import React, { useState } from 'react';
import SettingsForm from './components/SettingsForm';
import Chat from './components/Chat';

function App() {
  const [settings, setSettings] = useState(null);

  return (
    <div className="container">
      <h1>AWS Bedrock Chatbot</h1>
      {!settings ? (
        <SettingsForm onSubmit={setSettings} />
      ) : (
        <Chat settings={settings} />
      )}
    </div>
  );
}

export default App;
