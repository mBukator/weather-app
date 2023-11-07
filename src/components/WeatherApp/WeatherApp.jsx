import React, { useState } from 'react'
import axios from 'axios';

import clearWeather from '../../img/weather-icon/clear.png'
import cloudyWeather from '../../img/weather-icon/cloud.png'
import drizzleWeather from '../../img/weather-icon/drizzle.png'
import rainyWeather from '../../img/weather-icon/rain.png'
import snowyWeather from '../../img/weather-icon/snow.png'

import searchIcon from '../../img/search.png'
import './WeatherApp.css'

export const WeatherApp = () => {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const [weatherIcon, setWeatherIcon] = useState(clearWeather)
    const [units, setUnits] = useState(true)
    
    let key = '93289e3453fd87aee6cbf834368d4261';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units ? 'metric' : 'imperial'}&appid=${key}`

    const handleWeatherIcon = (icon) => {
        if (icon) {
            if (icon === '01d' || icon === '01n') {
                setWeatherIcon(clearWeather)
            } else if (icon === '02d' || icon === '02n') {
                setWeatherIcon(cloudyWeather)
            } else if (icon === '03d' || icon === '03n' || icon === '04d' || icon === '04n') {
                setWeatherIcon(drizzleWeather)
            } else if (icon === '09d' || icon === '09n' || icon === '10d' || icon === '10n') {
                setWeatherIcon(rainyWeather)
            } else if (icon === '13d' || icon === '13n') {
                setWeatherIcon(snowyWeather)
            }
        }
    }

    const handleUnitsChange = () => {
        setUnits(!units)
    }

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data);
                handleWeatherIcon(response.data.weather[0].icon)
            });
            setLocation('');
        }
    };
    

  return (
    <div className='content'>
        <div className="location__search">
            <input 
                value={location}
                onChange={event => setLocation(event.target.value)}
                onKeyPress={searchLocation}
                className='location__input'
                type="text"
                placeholder='Enter Location' 
            />
            <div className="search" onClick={handleUnitsChange}>
                <img className='search__icon' src={searchIcon} alt="search" />
            </div>
        </div>
        <div className="data">
            <div className="top">
                <div className="data__weather">
                    {data.weather ? <img src={weatherIcon} alt="img" className='weather__img'/> : null}
                </div>
                <div className="data__temperature">
                    {data.main ? <p>{data.main.temp.toFixed()} {units ? 'ºC' : 'ºF'}</p> : null }
                </div>
                <h1 className='data__title'>{data.name}</h1>
            </div>
            <div className="bottom">
                <div className="data__feels">
                    {data.main ? <p>{data.main.feels_like.toFixed()} {units ? 'ºC' : 'ºF'}</p> : null}
                    {data.wind ? <p>Feels Like</p> : null }
                </div>
                <div className="data__humidity">
                    {data.main ? <p>{data.main.humidity.toFixed()} % </p> : null}
                    {data.wind ? <p>Humidity</p> : null }
                </div>
                <div className="data__wind-speed">
                    {data.wind ? <p>{data.wind.speed.toFixed()} km/h </p> : null}
                    {data.wind ? <p>Wind Speed</p> : null }
                </div>
            </div>
        </div>
    </div>
  )
}

