import React from 'react';
import './Forecast.css';

const Day = ({forecast}) => {

    const getDate = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday"
        ];
        var today = new Date();
        var day = dayNames[today.getDay()];
        var dd = String(today.getDate());
        var mm = monthNames[today.getMonth()]
        var yyyy = today.getFullYear();
        return (day + ' ' + mm + ' ' + dd + ', ' + yyyy);
    }

    /*
    Thunderstorm, Drizzle, Rain, Snow, Clear, Clouds, 
    */
    return (
        <div className=
            {(forecast.main !== undefined) ?
                (forecast.weather[0].main === 'Rain') ?
                    "dayDiv rain"
                    : (forecast.weather[0].main === 'Clouds') ?
                        "dayDiv cloudy"
                        : "dayDiv sun"
                : null
            }
        >
            <main>
                {forecast.main !== undefined ?
                    <div>
                        <div className="location-box">
                            <div className="location">{forecast.name}, {forecast.sys.country}</div>
                            <div className="date"> {getDate()} </div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">{parseInt(forecast.main.temp)}&deg;F</div>
                            <div className="weather">{forecast.weather[0].main}</div>
                        </div>
                    </div>
                    : null
                }
            </main>
        </div>
    )
}

export default Day;