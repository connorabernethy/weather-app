import React, { useEffect, useState } from 'react';

const WeatherBackground = (props) => {

    const key = process.env.REACT_APP_WEATHER_API_KEY;

    const [weather, setWeather] = useState();

    useEffect(() => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=Phoenix`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response;
        })
        .then(data => {
            setWeather(data);
        })
        .catch(error => {
            console.log(error);
        })
    }, [])


    return(
        <div className="clear-skies">
            <button onClick={() => {console.log(weather)}}>TEST</button>
            <div>Current Temperature in Farenheit: {weather['current']['temp_f']}</div>
        </div>
    )
}

export default WeatherBackground;