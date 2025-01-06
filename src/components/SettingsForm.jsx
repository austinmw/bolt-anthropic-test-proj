import React, { useState } from 'react';

function SettingsForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    region: '',
    accessKeyId: '',
    secretAccessKey: '',
    sessionToken: '',
    modelId: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="region"
        placeholder="AWS Region"
        value={formData.region}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="accessKeyId"
        placeholder="AWS Access Key ID"
        value={formData.accessKeyId}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="secretAccessKey"
        placeholder="AWS Secret Access Key"
        value={formData.secretAccessKey}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="sessionToken"
        placeholder="AWS Session Token (optional)"
        value={formData.sessionToken}
        onChange={handleChange}
      />
      <input
        type="text"
        name="modelId"
        placeholder="Model ID"
        value={formData.modelId}
        onChange={handleChange}
        required
      />
      <button type="submit">Connect</button>
    </form>
  );
}

export default SettingsForm;
