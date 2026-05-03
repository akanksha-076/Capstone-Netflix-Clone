import React, { useState, useEffect, useRef } from 'react';
import './ScreenTime.css';

function ScreenTime() {
  const [timeSpent, setTimeSpent] = useState(0);
  const [limit, setLimit] = useState(0);
  const [inputLimit, setInputLimit] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [limitCrossed, setLimitCrossed] = useState(false);
  const [isSettingLimit, setIsSettingLimit] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const savedTime = parseInt(localStorage.getItem('screenTime_today') || '0');
    const savedDate = localStorage.getItem('screenTime_date');
    const savedLimit = parseInt(localStorage.getItem('screenTime_limit') || '0');
    const today = new Date().toDateString();

    if (savedDate !== today) {
      localStorage.setItem('screenTime_today', '0');
      localStorage.setItem('screenTime_date', today);
      setTimeSpent(0);
    } else {
      setTimeSpent(savedTime);
    }

    setLimit(savedLimit);

    intervalRef.current = setInterval(() => {
      setTimeSpent((prev) => {
        const newTime = prev + 1;
        localStorage.setItem('screenTime_today', newTime.toString());
        localStorage.setItem('screenTime_date', today);
        return newTime;
      });
    }, 60000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (limit > 0) {
      const remaining = limit - timeSpent;
      if (remaining <= 5 && remaining > 0) {
        setShowWarning(true);
        setLimitCrossed(false);
      } else if (remaining <= 0) {
        setLimitCrossed(true);
        setShowWarning(false);
      } else {
        setShowWarning(false);
        setLimitCrossed(false);
      }
    }
  }, [timeSpent, limit]);

  const handleSetLimit = () => {
    const val = parseInt(inputLimit);
    if (!val || val <= 0) return;
    setLimit(val);
    localStorage.setItem('screenTime_limit', val.toString());
    setInputLimit('');
    setIsSettingLimit(false);
  };

  const handleResetTime = () => {
    setTimeSpent(0);
    setLimitCrossed(false);
    setShowWarning(false);
    localStorage.setItem('screenTime_today', '0');
  };

  const getProgressPercent = () => {
    if (limit === 0) return 0;
    const percent = (timeSpent / limit) * 100;
    return Math.min(percent, 100);
  };

  const getProgressColor = () => {
    const percent = getProgressPercent();
    if (percent >= 100) return '#e50914';
    if (percent >= 80) return '#e87c03';
    return '#46d369';
  };

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
  };

  return (
    <div className="screentime">
      <div className="screentime__header">
        <h2 className="screentime__title">⏱ Screen Time</h2>
        <button
          className="screentime__set__btn"
          onClick={() => setIsSettingLimit(!isSettingLimit)}
        >
          {isSettingLimit ? 'Cancel' : 'Set Limit'}
        </button>
      </div>

      {isSettingLimit && (
        <div className="screentime__input__row">
          <input
            type="number"
            placeholder="Enter limit in minutes"
            value={inputLimit}
            onChange={(e) => setInputLimit(e.target.value)}
            className="screentime__input"
            min="1"
          />
          <button
            className="screentime__save__btn"
            onClick={handleSetLimit}
          >
            Save
          </button>
        </div>
      )}

      <div className="screentime__stats">
        <div className="screentime__stat">
          <span className="screentime__stat__label">Today's Usage</span>
          <span className="screentime__stat__value">
            {formatTime(timeSpent)}
          </span>
        </div>
        <div className="screentime__stat">
          <span className="screentime__stat__label">Daily Limit</span>
          <span className="screentime__stat__value">
            {limit > 0 ? formatTime(limit) : 'Not set'}
          </span>
        </div>
        <div className="screentime__stat">
          <span className="screentime__stat__label">Remaining</span>
          <span className="screentime__stat__value">
            {limit > 0
              ? timeSpent >= limit
                ? 'Limit reached!'
                : formatTime(limit - timeSpent)
              : '---'}
          </span>
        </div>
      </div>

      {limit > 0 && (
        <div className="screentime__progress__container">
          <div className="screentime__progress__bar">
            <div
              className="screentime__progress__fill"
              style={{
                width: `${getProgressPercent()}%`,
                backgroundColor: getProgressColor(),
              }}
            />
          </div>
          <span className="screentime__progress__label">
            {Math.round(getProgressPercent())}% of daily limit used
          </span>
        </div>
      )}

      {showWarning && (
        <div className="screentime__warning">
          ⚠️ Only {formatTime(limit - timeSpent)} left of your daily limit!
        </div>
      )}

      {limitCrossed && (
        <div className="screentime__exceeded">
          🚫 You have exceeded your daily screen time limit of {formatTime(limit)}!
          Consider taking a break.
          <button
            className="screentime__reset__btn"
            onClick={handleResetTime}
          >
            Reset Timer
          </button>
        </div>
      )}
    </div>
  );
}

export default ScreenTime;