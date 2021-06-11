import React, {useState} from 'react'
import TimeFrame from './TimeFrame.js';
import Location from './Location.js';
import './App.css';
import './Forecast.css';

function Header({
    timeFrame,
    handleTimeFrameParent,
    handleTodayForecast,
    handleSevenDayForecast
}) 
{
    const api = {
        key: "2bc90cf230438961d510a69c84f16903",
        byCity: "https://api.openweathermap.org/data/2.5/weather?",
        byLongLat: "https://api.openweathermap.org/data/2.5/onecall?"
    }
  
    const getDay = async (location) => {
        fetch(
            api.byCity + 
            "q=" + location + 
            "&units=imperial" +
            "&appid=" + api.key )
        .then(res => res.json())
        .then(result => {
            handleTodayForecast(result)
        })
    }

    const getSevenDay = async (location) => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
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
                    handleSevenDayForecast(result.daily)
                })
            }
        );
    }

    const handleTimeFrame = (tf) => {
        handleTimeFrameParent(tf);
    }

    const handleLocation = (location) => {
        if(timeFrame === 'today') {
            getDay(location)
        } else {
            getSevenDay(location)
        }    
    }

    return (
        <div>
            <TimeFrame handleTimeFrame={handleTimeFrame}/>      
            <Location handleLocation={handleLocation}/>
        </div>
    );
}

export default Header;
