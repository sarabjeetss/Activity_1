// src/Weather.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState({
    temp: null,
    feels_like: null,
    temp_min: null,
    temp_max: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const options = {
        method: 'GET',
        url: 'https://open-weather13.p.rapidapi.com/city/Toronto/EN',
        headers: {
          'X-RapidAPI-Key': '0f97243628msh1544852534d514ep1afa0djsn433978197b1e',
          'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        const { temp, feels_like, temp_min, temp_max } = response.data.main;
        
        const convertToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

        setWeatherData({
          temp: convertToCelsius(temp).toFixed(2),
          feels_like: convertToCelsius(feels_like).toFixed(2),
          temp_min: convertToCelsius(temp_min).toFixed(2),
          temp_max: convertToCelsius(temp_max).toFixed(2)
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching weather data</div>;
  }

  return (
    <div>
      <h1>Current Weather in Toronto</h1>
      <p>Temperature: {weatherData.temp} °C</p>
      <p>Feels Like: {weatherData.feels_like} °C</p>
      <p>Minimum Temperature: {weatherData.temp_min} °C</p>
      <p>Maximum Temperature: {weatherData.temp_max} °C</p>
    </div>
  );
};

export default Weather;
