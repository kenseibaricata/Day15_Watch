import React, { useState } from 'react';
import './App.css';
import ClockTab from './components/ClockTab';
import AlarmTab from './components/AlarmTab';
import StopwatchTab from './components/StopwatchTab';

function App() {
  const [activeTab, setActiveTab] = useState<string>('clock');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>HyaQShix Clock Suite</h1>
        <div className="tab-buttons">
          <button 
            className={activeTab === 'clock' ? 'active' : ''} 
            onClick={() => setActiveTab('clock')}
          >
            Clock
          </button>
          <button 
            className={activeTab === 'alarm' ? 'active' : ''} 
            onClick={() => setActiveTab('alarm')}
          >
            Alarm
          </button>
          <button 
            className={activeTab === 'stopwatch' ? 'active' : ''} 
            onClick={() => setActiveTab('stopwatch')}
          >
            Stopwatch
          </button>
        </div>
      </header>
      <main className="app-content">
        {activeTab === 'clock' && <ClockTab />}
        {activeTab === 'alarm' && <AlarmTab />}
        {activeTab === 'stopwatch' && <StopwatchTab />}
      </main>
      <footer className="app-footer">
        <p>© 2025 HyaQShix Clock Suite</p>
      </footer>
    </div>
  );
}

export default App; 