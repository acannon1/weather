import React, {useState} from 'react'
import './App.css';
import './Forecast.css';

function SelectionBar({
  handleTimeFrame, 
  handleForecast,
  handleSevenDayForecast,
  handleTodayForecast
}) {
  // [handleDisplayClick] = props
  
  const [entry, setEntry] = useState('');
  const [timeFrame, setTimeFrame] = useState('');
  // const [weather, setWeather] = useState({});

  const api = {
    key: "2bc90cf230438961d510a69c84f16903",
    byCity: "https://api.openweathermap.org/data/2.5/weather?",
    byLongLat: "https://api.openweathermap.org/data/2.5/onecall?"
  }

  
  const getDay = async () => {
    fetch( api.byCity + "q=" + entry + "&units=imperial&appid=" + api.key )
      .then(res => res.json())
      .then(result => {
        handleTodayForecast(result)
      }
    )
  }

  const getSevenDay = async () => {
    navigator.geolocation.getCurrentPosition(
      async function(position) {
        fetch(
          api.byLongLat +
          "lat=" + position.coords.latitude +
          "&lon=" + position.coords.longitude +
          "&units=imperial" +
          "&exclude=minutely,hourly" +
          "&appid=" + api.key
        )
          .then(res => res.json())
          .then(result => {
            console.log(result)
            // setCurrent(result.current);
            handleSevenDayForecast(result.daily)
          }
        )
      }
    );
  }

  const handleTimeFrameClick = (e) => {
    if(e.target.id === 'today') {
      setTimeFrame('today')
      handleTimeFrame('today')
      getDay()
    } else {
      setTimeFrame('7day')
      handleTimeFrame('7day')
      getSevenDay()
    }    
  }

  const updateWeather = (weather) => {
    handleForecast(weather)
  }

  const updateTodayForecast = () => {
    console.log("updateTodayFOrecast")
  }

  const updateSevenDayForecast = () => {
    console.log("updateSevenDayForecast")
  }

  const onChange = (event) => {
      setEntry(event.target.value);
  }

  const handleEnter = async (event) => {
      if(event.key === 'Enter') {
        if(timeFrame === 'today') {
          fetch( api.byCity + "q=" + entry + "&units=imperial&appid=" + api.key )
            .then(res => res.json())
            .then(result => {
              handleTodayForecast(result)
            }
          )
        } else {
          navigator.geolocation.getCurrentPosition(
            async function(position) {
              fetch(
                api.byLongLat +
                "lat=" + position.coords.latitude +
                "&lon=" + position.coords.longitude +
                "&units=imperial" +
                "&exclude=minutely,hourly" +
                "&appid=" + api.key
              )
                .then(res => res.json())
                .then(result => {
                  console.log(result)
                  // setCurrent(result.current);
                  handleSevenDayForecast(result.daily)
                }
              )
            }
          );
        }
      }
  }

  return (
    <div>
      <div className="selection-bar">
          <div className="today">
            <button
            id="today"
            className="button"
            onClick={e=>handleTimeFrameClick(e)}
            >
              Today 
            </button>
          </div>
          <div className="week">
            <button
            id="7day"
            className="button"
            onClick={e=>handleTimeFrameClick(e)}
            >
              7 Day
            </button>
          </div>
      </div>
      
      <div className="search-box">
        <input
            type="text"
            placeholder="Enter City"
            className="search-bar"
            value={entry}
            onChange={onChange}
            onKeyPress={handleEnter}
        />
      </div>
    </div>
  );
}

export default SelectionBar;
