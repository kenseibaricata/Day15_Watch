import React, { useState, useEffect } from 'react';

const ClockTab: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // 時計の初期化と更新
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
      // 12時間制への変換
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12; // 0時は12として表示
      
      // 表示形式の整形（ゼロパディング）
      const formattedHours = hours12.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');
      
      // 時刻を更新
      setTime(`${ampm} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
    };

    // 初回実行
    updateClock();
    
    // 1秒ごとに更新
    const intervalId = setInterval(updateClock, 1000);
    
    // クリーンアップ関数
    return () => clearInterval(intervalId);
  }, []); // 空の依存配列で初回レンダリング時のみ実行

  return (
    <div className="tab-content">
      <div className="clock">{time}</div>
    </div>
  );
};

export default ClockTab; 