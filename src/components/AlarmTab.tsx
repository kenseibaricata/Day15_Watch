import React, { useState, useEffect, useRef } from 'react';

interface AlarmState {
  isSet: boolean;
  time: string; // HH:MM形式
}

const STORAGE_KEY = 'reactClockAlarmSettings';

const AlarmTab: React.FC = () => {
  const [alarmState, setAlarmState] = useState<AlarmState>({
    isSet: false,
    time: ''
  });
  const [alarmStatus, setAlarmStatus] = useState<string>('');
  const alarmSoundRef = useRef<HTMLAudioElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  // localStorageからアラーム設定を読み込む
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState) as AlarmState;
        setAlarmState(parsedState);
        if (parsedState.isSet) {
          setAlarmStatus(`アラーム設定: ${formatAlarmTime(parsedState.time)}`);
        }
      }
    } catch (error) {
      console.error('アラーム設定の読み込みに失敗しました:', error);
    }
  }, []);

  // アラームの確認
  useEffect(() => {
    let intervalId: number;
    
    if (alarmState.isSet) {
      // 10秒ごとに確認（過負荷防止のため）
      intervalId = window.setInterval(() => {
        checkAlarm();
      }, 10000);
      
      // 初回チェック
      checkAlarm();
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      stopAlarmSound();
    };
  }, [alarmState]);

  // アラームのチェック
  const checkAlarm = () => {
    if (!alarmState.isSet || !alarmState.time) {
      return;
    }
    
    const now = new Date();
    const currentHours = now.getHours().toString().padStart(2, '0');
    const currentMinutes = now.getMinutes().toString().padStart(2, '0');
    const currentTimeStr = `${currentHours}:${currentMinutes}`;
    
    if (currentTimeStr === alarmState.time) {
      triggerAlarm();
    }
  };

  // アラームの発動
  const triggerAlarm = () => {
    playAlarmSound();
    showNotification();
    setAlarmStatus('⚠️ アラーム発動中！');
  };

  // アラーム音の再生
  const playAlarmSound = () => {
    if (alarmSoundRef.current) {
      alarmSoundRef.current.loop = true;
      alarmSoundRef.current.play().catch(error => {
        console.error('アラーム音の再生に失敗しました:', error);
      });
    }
  };

  // アラーム音の停止
  const stopAlarmSound = () => {
    if (alarmSoundRef.current) {
      alarmSoundRef.current.pause();
      alarmSoundRef.current.currentTime = 0;
    }
  };

  // 通知の表示
  const showNotification = () => {
    if (!('Notification' in window)) {
      return;
    }
    
    if (Notification.permission === 'granted') {
      new Notification('React Clock Alarm', {
        body: 'アラーム時刻になりました！',
        icon: '/favicon.ico'
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  };

  // アラームのセット
  const setAlarm = () => {
    if (!timeInputRef.current || !timeInputRef.current.value) {
      return;
    }
    
    const newAlarmState = {
      isSet: true,
      time: timeInputRef.current.value
    };
    
    setAlarmState(newAlarmState);
    setAlarmStatus(`アラーム設定完了: ${formatAlarmTime(newAlarmState.time)}`);
    
    // localStorageに保存
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAlarmState));
    } catch (error) {
      console.error('アラーム設定の保存に失敗しました:', error);
    }
  };

  // アラームのキャンセル
  const cancelAlarm = () => {
    const newAlarmState = {
      isSet: false,
      time: timeInputRef.current?.value || ''
    };
    
    setAlarmState(newAlarmState);
    setAlarmStatus('');
    stopAlarmSound();
    
    // localStorageに保存
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAlarmState));
    } catch (error) {
      console.error('アラーム設定の保存に失敗しました:', error);
    }
  };

  // HH:MM形式を見やすく変換
  const formatAlarmTime = (timeStr: string): string => {
    if (!timeStr) return '';
    
    const [hours, minutes] = timeStr.split(':');
    if (!hours || !minutes) return timeStr;
    
    const hoursNum = parseInt(hours, 10);
    const ampm = hoursNum >= 12 ? 'PM' : 'AM';
    const hours12 = hoursNum % 12 || 12;
    
    return `${ampm} ${hours12}:${minutes}`;
  };

  return (
    <div className="tab-content">
      <div className="alarm-container">
        <div className="time-picker">
          <input 
            type="time" 
            ref={timeInputRef}
            defaultValue={alarmState.time}
          />
        </div>
        <div className="alarm-controls">
          <button 
            onClick={setAlarm}
            disabled={alarmState.isSet}
          >
            アラームをセット
          </button>
          <button 
            onClick={cancelAlarm}
            disabled={!alarmState.isSet}
          >
            キャンセル
          </button>
        </div>
        <div className="alarm-status">{alarmStatus}</div>
      </div>
      <audio 
        ref={alarmSoundRef}
        src="https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
      />
    </div>
  );
};

export default AlarmTab; 