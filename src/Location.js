import React, {useState} from 'react'
import './App.css';
import './Forecast.css';

function Location({
    handleTodayForecast,
    handleSevenDayForecast
}) {
  
    const [location, setLocation] = useState('');

    //Open Weather Map API
    const api = {
        key: "2bc90cf230438961d510a69c84f16903",
        cityWeather: "https://api.openweathermap.org/data/2.5/weather?",
        cityForecast: "https://api.openweathermap.org/data/2.5/forecast?",
        coorForecast: "https://api.openweathermap.org/data/2.5/onecall?"
    }

    const getDay = async (location) => {
        fetch(
            api.cityWeather + 
            "q=" + location + 
            "&units=imperial" +
            "&appid=" + api.key )
        .then(res => res.json())
        .then(result => {
            handleTodayForecast(result)
            //Need coordinates from day forecast for 7Day forecast
            getSevenDay(result.coord.lat, result.coord.lon)
        })
    }

    const getSevenDay = (latitude, longitude) => {
        fetch(
            api.coorForecast +
            "lat=" + latitude +
            "&lon=" + longitude +
            "&units=imperial" +
            "&exclude=minutely,hourly" +
            "&appid=" + api.key
        )
        .then(res => res.json())
        .then(result => {
            handleSevenDayForecast(result.daily)
        })
    }

    const onChange = (event) => {
        setLocation(event.target.value);
    }

    const handleEnter = async (event) => {
        if(event.key === 'Enter') {
            getDay(location)
        }
    }

    return (
        <div>      
        <div className="search-box">
            <input
                type="text"
                placeholder="Enter City"
                className="search-bar"
                value={location}
                onChange={onChange}
                onKeyPress={handleEnter}
            />
        </div>
        </div>
    );
}

export default Location;
