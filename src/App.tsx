import React, { useState } from 'react';
import ClockTab from './components/ClockTab';
import AlarmTab from './components/AlarmTab';
import StopwatchTab from './components/StopwatchTab';
import Header from './components/Header';
import Footer from './components/Footer';

type TabType = 'clock' | 'alarm' | 'stopwatch';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('clock');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="app">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main>
        {activeTab === 'clock' && <ClockTab />}
        {activeTab === 'alarm' && <AlarmTab />}
        {activeTab === 'stopwatch' && <StopwatchTab />}
      </main>
      
      <Footer />
    </div>
  );
};

export default App; 