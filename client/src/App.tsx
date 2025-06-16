import React from 'react';
import './App.css';
import ProfileForm from './components/form-wo-hook';

function App() {
  return (
    <div className="bg-gray-100 flex min-h-screen flex-col items-center justify-between p-24">
      <ProfileForm />
    </div>
  );
}

export default App;
