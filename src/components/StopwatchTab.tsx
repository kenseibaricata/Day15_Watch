import React, { useState, useEffect } from 'react';
import './StopwatchTab.css';

const StopwatchTab: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (running) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10); // 10ミリ秒ごとに更新
      }, 10);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [running]);
  
  const handleStart = () => {
    setRunning(true);
  };
  
  const handleStop = () => {
    setRunning(false);
  };
  
  const handleReset = () => {
    setTime(0);
    setLaps([]);
    setRunning(false);
  };
  
  const handleLap = () => {
    if (running) {
      setLaps([...laps, time]);
    }
  };
  
  // 時間のフォーマット
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="stopwatch-container">
      <div className="time-display">
        {formatTime(time)}
      </div>
      
      <div className="controls">
        {!running ? (
          <button onClick={handleStart} className="start-btn">スタート</button>
        ) : (
          <button onClick={handleStop} className="stop-btn">ストップ</button>
        )}
        <button onClick={handleLap} className="lap-btn" disabled={!running}>ラップ</button>
        <button onClick={handleReset} className="reset-btn">リセット</button>
      </div>
      
      {laps.length > 0 && (
        <div className="laps">
          <h3>ラップタイム</h3>
          <ul>
            {laps.map((lapTime, index) => (
              <li key={index} className="lap-item">
                <span className="lap-number">ラップ {index + 1}</span>
                <span className="lap-time">{formatTime(lapTime)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StopwatchTab; 