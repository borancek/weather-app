// all original code from us is in App.js, App.css and settingsPage.js, please ignore all other files as they came with the dev install of node js.
import logo from './logo.svg';
import React, { Fragment, PureComponent, useEffect, useState }from 'react';
import './App.css';
import { geolocated } from "react-geolocated";
import { render } from '@testing-library/react';

//weatherapi key and base url
const api = {
  key: "b6f8640e564f49fb917104400222403",
  base: "http://api.weatherapi.com/v1"
}

function App() {
  // variables to store current location and functions to later reset values
  // Will default to Paris if it cannot find current location
  const [lat, setLat] = useState('51.51279');
  const [lon, setLon] = useState('-0.09184');

  const getLocation = () => {
    if (!navigator.geolocation) {
      <div>Geo location not supported by browser</div>;
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude)
        setLat(''+position.coords.latitude);
        setLon(''+position.coords.longitude);
      }, () => {
        console.log("Unable to retrieve location")
      });
    }
  }
  // variables to store weather data, and the functions to then later reset values
  const [weather, setWeather] = useState({});
  const [hourly, setHourly] = useState([]);
  // stops the api from constantly retrieving data and reduces cpu load
  useEffect(()=>{
    getLocation();
  }, []);

  useEffect(()=>{
    fetchWeather();
  },[lat, lon])

  // fetches api data and using setWeather function to store various bits of data into different names within the weather variable.
  const fetchWeather = () =>{
    const res = fetch(`${api.base}/forecast.json?key=${api.key}&q=${lat}, ${lon}&days=1&alerts=no`).then((res) => { 
      const result = res.json().then((result) => {
        setWeather({
          name: result.location?.name,
          region: result.location?.region,
          country: result.location?.country,
          uLat: result.location?.lat,
          uLon: result.location?.lon,
          tempC: result.current?.temp_c,
          tempF: result.current?.temp_f,
          condition: result.current?.condition.text,
          wind: result.current?.wind_mph,
          humidity: result.current?.humidity,
          precip: result.current?.precip_mm,
          vis: result.current?.vis_miles,
          uv: result.current?.uv,
          rainChance: result.forecast?.forecastday[0].day.daily_chance_of_rain,
          snowChance: result.forecast?.forecastday[0].day.daily_chance_of_snow,
          windDir: result.current?.wind_dir,
          currentT: result.location?.localtime,
        });
        setHourly(result.forecast?.forecastday[0].hour)
      })
    })
  };
  // var to use later to store array of hourly time
  let hourTime = [];

  return (
    // imagines and text for appearance of home screen
    <div className="App">
      <header className="App-header">
        
        <img src={require('./images/location.png')} className="location-icon" height={50} width={50}  />
        <img src={require('./images/whiteCloud.png')} className="cloud-icon" height={50} width={50}  />
        <img src={require('./images/greenRect.png')} className="current-weather-background" height={200} width={200}  />
        <img src={require('./images/greenRect.png')} className="current-weather-background2" height={200} width={200}  />
        <img src={require('./images/greenRect.png')} className="current-weather-background3" height={200} width={200}  />

        <img src={require('./images/greenRect.png')} className="current-weather-background4" height={200} width={200}  />
        <img src={require('./images/greenRect.png')} className="current-weather-background5" height={200} width={200}  />
        <img src={require('./images/greenRect.png')} className="current-weather-background6" height={350} width={200}  />
        <img src={require('./images/greenRect.png')} className="current-weather-background7" height={200} width={200}  />
        <img src={require('./images/greenRect.png')} className="current-weather-background8" height={300} width={352}  />
        <img src={require('./images/greenRect.png')} className="current-weather-background9" height={200} width={225}  />
        <img src={require('./images/greenRect.png')} className="current-weather-background10" height={200} width={225}  />
        <img src={require('./images/greenRect.png')} className="current-weather-background11" height={200} width={200}  />
         
        {/* Display api data of Location and current temp */}
        <p className="location-text" >{weather.region}</p>
        <div className="tempValue">
          <p className="location-temp-text" ><b>{weather.tempC}</b>°C</p>
        </div>
        
        {/* Scroller showing the hourly temp from current time onwards, using map function and split to only show hour */}
        <div className="Hourly-Scroller">
          {hourly.map((hour) => (
            hourTime = hour.time.split(" "),
            <div className='hourInfo'>
            <p className="time">{hourTime[1]}</p>
            <p className="hour">{hour.temp_c}°C</p>
            </div>
          ))}
         
        </div>
        <p className="todays-forecast" >TODAY'S FORECAST</p>
        
        {/* Lower part of home screen, including more detailed info on weather for the whole day on avg */}
        <p className="line3">-------------------------------------------</p>
        <p className="uv-index"> UV INDEX</p>
        <p className="uv-stat" >{weather.uv}</p>
        <p className="visibility-text"> VISIBILITY</p>
        <p className="vis-stat" >{weather.vis} miles</p>
        <p className="line4">-------------------------------------------</p>
        <p className="wind-text"> WIND</p>
        <p className="wind-stat" >{weather.wind} mph</p>
        <p className="humidity-text">WIND DIRECTION</p>
        <p className="humidity-stat">{weather.windDir}</p>
        <p className="line5">-------------------------------------------</p>
        <p className="cof-text"> HUMIDITY</p>
        <p className="cof-stat">{weather.humidity} %</p>
        <p className="percipitation-text">PERCIPITATION</p>
        <p className="percipitation-stat">{weather.precip} mm</p>
        <p className="line6">-------------------------------------------</p>
        <p className="cot-text"> CHANCE OF RAIN</p>
        <p className="cot-stat">{weather.rainChance} %</p>
        <p className="flood-depth-text"> CHANCE OF SNOW</p>
        <p className="flood-depth-stat">{weather.snowChance}%</p>
        
      </header>


    </div>
  );
}

export default App;

