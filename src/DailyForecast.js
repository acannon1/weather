import React, {useState, useEffect} from 'react';
import './Forecast.css'

const DailyForecast = ({forecast}) => {
    const [icon, setIcon] = useState("");
    const [hi, setHi] = useState(0);
    const [lo, setLo] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [day, setDay] = useState("");

    useEffect(() => {     
        if(forecast !== "undefined") {
            let dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            setDay(dayOfWeek[new Date(forecast.dt * 1000).getDay()]);
            setIcon("http://openweathermap.org/img/wn/" +
              JSON.stringify(forecast.weather[0].icon).replace(/['"]+/g, '')  +
              "@2x.png");
            setHi(forecast.temp.max);
            setLo(forecast.temp.min);
            setHumidity(forecast.humidity);
        }
    })

    return(
        <div className="dailyForecast">
            <div className="day">{day}</div>
            <div className="icon"> <img src={icon}/> </div>
            <div className="high">High: {parseInt(hi)}&deg;F</div>
            <div className="low">Low: {parseInt(lo)}&deg;F</div>
            <div className="humidity">Humidity: {humidity}%</div>
        </div>
    )
}

export default DailyForecast