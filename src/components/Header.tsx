import React from 'react';

type TabType = 'clock' | 'alarm' | 'stopwatch';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header>
      <h1>React Clock Suite</h1>
      <nav className="tabs">
        <button 
          className={`tab ${activeTab === 'clock' ? 'active' : ''}`}
          onClick={() => onTabChange('clock')}
        >
          Clock
        </button>
        <button 
          className={`tab ${activeTab === 'alarm' ? 'active' : ''}`}
          onClick={() => onTabChange('alarm')}
        >
          Alarm
        </button>
        <button 
          className={`tab ${activeTab === 'stopwatch' ? 'active' : ''}`}
          onClick={() => onTabChange('stopwatch')}
        >
          Stopwatch
        </button>
      </nav>
    </header>
  );
};

export default Header; 