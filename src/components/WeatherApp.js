import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  var arrayOfWeekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var dateObj = new Date();
  var weekdayNumber = dateObj.getDay();
  var weekdayName = arrayOfWeekdays[weekdayNumber];

  useEffect(() => {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=532be5b90393df1056cb85f1d768a93d"
      )
      .then((res) => {
        setWeatherData(res.data);
      });
  }, []);
  console.log(weatherData);
  if (weatherData) {
    return (
      <div className="weather__info">
        <p className="weather__location">
          {weatherData.name}, {weatherData.sys.country}
        </p>

        <div className="weather__main">
          <div className="logo__container">
            <p>{weekdayName}</p>
            <p className="feels__like">
              Feels like: {Math.round(weatherData.main.feels_like - 273.15)}°C
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="Weather"
            />
            <p>{weatherData.weather[0].main}</p>
            <p>{Math.round(weatherData.main.temp - 273.15)}°C </p>
          </div>
          <div className="weather__description">
            <div className="weather__description__item item__top">
              <p>High: {Math.round(weatherData.main.temp_max - 273.15)}°C </p>
              <p>Low: {Math.round(weatherData.main.temp_min - 273.15)}°C </p>
              <p>Humidity: {weatherData.main.humidity}% </p>
            </div>
            <div className="weather__description__item">
              <p> Pressure at Sea level:{weatherData.main.sea_level}hPA </p>
              <p> Atmospheric Pressure: {weatherData.main.pressure}hPa </p>
            </div>
            <div>
              <p> Weather App by: Faheem Ahmed</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading Weather...</div>;
  }
};

export default WeatherApp;
