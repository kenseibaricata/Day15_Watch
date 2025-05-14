import React, { useState, useEffect, useRef } from 'react';

const StopwatchTab: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [displayTime, setDisplayTime] = useState<string>('00:00:00.00');
  
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // ストップウォッチの更新
  useEffect(() => {
    if (isRunning) {
      // 現在の時刻から開始時刻を引いて経過時間を計算
      startTimeRef.current = Date.now() - elapsedTime;
      
      // 10ミリ秒ごとに更新
      intervalRef.current = window.setInterval(() => {
        const currentElapsedTime = Date.now() - startTimeRef.current;
        setElapsedTime(currentElapsedTime);
        updateDisplay(currentElapsedTime);
      }, 10);
    } else if (intervalRef.current) {
      // タイマーを停止
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // クリーンアップ関数
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  // 表示の更新
  const updateDisplay = (timeMs: number) => {
    // ミリ秒を時間、分、秒、ミリ秒に変換
    const totalMilliseconds = timeMs;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10); // 2桁のミリ秒
    
    // 表示形式の整形（ゼロパディング）
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(2, '0');
    
    // 時間を表示
    setDisplayTime(`${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`);
  };

  // スタート
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  // ストップ
  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  // リセット
  const reset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    updateDisplay(0);
  };

  return (
    <div className="tab-content">
      <div className="stopwatch">{displayTime}</div>
      <div className="stopwatch-controls">
        <button 
          onClick={start}
          disabled={isRunning}
        >
          Start
        </button>
        <button 
          onClick={stop}
          disabled={!isRunning}
        >
          Stop
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default StopwatchTab; 