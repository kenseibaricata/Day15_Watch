import React, { useState, useEffect } from 'react';
import './ClockTab.css';

const ClockTab: React.FC = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  
  // 12時間形式に変換
  const formattedHours = hours % 12 || 12;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  // 表示用に2桁に整形
  const displayHours = formattedHours.toString().padStart(2, '0');
  const displayMinutes = minutes.toString().padStart(2, '0');
  const displaySeconds = seconds.toString().padStart(2, '0');
  
  return (
    <div className="clock-container">
      <div className="time-display">
        <span className="time-value">{displayHours}</span>
        <span className="time-separator">:</span>
        <span className="time-value">{displayMinutes}</span>
        <span className="time-separator">:</span>
        <span className="time-value">{displaySeconds}</span>
        <span className="ampm">{ampm}</span>
      </div>
      <div className="date-display">
        {time.toLocaleDateString('ja-JP', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
    </div>
  );
};

export default ClockTab; 