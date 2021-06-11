import React, {useState} from 'react';
import TimeFrame from './TimeFrame.js';
import Location from './Location.js';
import Day from './Day.js';
import Weekly from './Weekly.js';
import './App.css';

function App() {
  const [timeFrame, setTimeFrame] = useState('sevenDay');
  const [sevenDay, setSevenDay] = useState([]);
  const [today, setToday] = useState({});

  const handleTimeFrame = (input) => {
    setTimeFrame(input)
  }

  const handleSevenDayForecast = (input) => {
    setSevenDay(input);
  }

  const handleTodayForecast = (input) => {
    setToday(input);
  }

  return (
    <div className="App">
      <div className="title"> Weather </div>
      <div className="top">
        <TimeFrame handleTimeFrame={handleTimeFrame}/>
        <Location
          handleTodayForecast={handleTodayForecast}
          handleSevenDayForecast={handleSevenDayForecast}
        />
      </div>
      <div className="bottom">
        {timeFrame === 'today' ?
          <Day forecast={today}/>
          :
          <Weekly forecast={sevenDay}/>
        }
      </div>
    </div>
  );
}

export default App;
