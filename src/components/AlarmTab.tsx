import React, { useState, useEffect } from 'react';
import './AlarmTab.css';

interface Alarm {
  id: number;
  time: string;
  enabled: boolean;
}

const AlarmTab: React.FC = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [newAlarmTime, setNewAlarmTime] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // localStorageからアラームを読み込む
  useEffect(() => {
    const savedAlarms = localStorage.getItem('alarms');
    if (savedAlarms) {
      setAlarms(JSON.parse(savedAlarms));
    }
  }, []);
  
  // アラームが変更されたらlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('alarms', JSON.stringify(alarms));
  }, [alarms]);
  
  // 現在時刻を更新し、アラームをチェック
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().substr(0, 5); // HH:MM形式
      setCurrentTime(timeStr);
      
      // アラームチェック
      alarms.forEach(alarm => {
        if (alarm.enabled && alarm.time === timeStr) {
          playAlarmSound();
          alert('アラーム: ' + alarm.time);
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [alarms]);
  
  const addAlarm = () => {
    if (newAlarmTime) {
      const newAlarm: Alarm = {
        id: Date.now(),
        time: newAlarmTime,
        enabled: true
      };
      setAlarms([...alarms, newAlarm]);
      setNewAlarmTime('');
    }
  };
  
  const toggleAlarm = (id: number) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
    ));
  };
  
  const deleteAlarm = (id: number) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };
  
  const playAlarmSound = () => {
    // アラーム音を鳴らす（実際には音声ファイルを再生するロジックが必要）
    console.log('ALARM SOUND PLAYING');
  };
  
  return (
    <div className="alarm-container">
      <div className="add-alarm">
        <input
          type="time"
          value={newAlarmTime}
          onChange={(e) => setNewAlarmTime(e.target.value)}
          className="time-input"
        />
        <button onClick={addAlarm} className="add-button">アラーム追加</button>
      </div>
      
      <div className="alarms-list">
        <h3>設定済みアラーム</h3>
        {alarms.length === 0 ? (
          <p className="no-alarms">アラームはありません</p>
        ) : (
          alarms.map(alarm => (
            <div key={alarm.id} className={`alarm-item ${alarm.enabled ? 'enabled' : 'disabled'}`}>
              <span className="alarm-time">{alarm.time}</span>
              <div className="alarm-controls">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={alarm.enabled}
                    onChange={() => toggleAlarm(alarm.id)}
                  />
                  <span className="slider"></span>
                </label>
                <button 
                  onClick={() => deleteAlarm(alarm.id)}
                  className="delete-button"
                >
                  削除
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlarmTab; 