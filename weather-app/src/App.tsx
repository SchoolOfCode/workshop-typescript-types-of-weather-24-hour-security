import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) return;
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      setLatitude(lat);
      setLongitude(lon);
      fetchWeatherData(lat, lon);
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const data = await response.json();
    setWeatherData(data);
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <>
      <h1>24-Hour Weather</h1>
      <div className="searchbar">
        <label className="formGroup">
          City:
          <input
            type="text"
            name="city"
            onChange={handleChange}
            className="field"
            value={city}
          />
        </label>
      </div>
      <button onClick={fetchWeather}>
        <img
          src="\search-icon-png-transparent-18-2112149448.jpg"
          alt="search button"
          width="100"
          height="100"
        />
      </button>
      <div className="weather-picture">
        {latitude && longitude && (
          <div>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
          </div>
        )}
        {weatherData && (
          <div>
            <h2>{weatherData.name}</h2>
            <p>{weatherData.weather[0].description}</p>
            <p>{Math.round(weatherData.main.temp - 273.15)}°C</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;