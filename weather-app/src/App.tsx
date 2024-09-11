import { useState, useEffect, ChangeEvent } from "react";
import "./App.css";

interface GeoData {
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
}

interface WeatherData {
  name: string;
  weather: { description: string }[];
  main: { temp: number };
}

function App() {
  const [city, setCity] = useState<string>('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const apiKey: string = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (): Promise<void> => {
    if (!city) return;
    const response: Response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );
    const data: GeoData[] = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      setLatitude(lat);
      setLongitude(lon);
      fetchWeatherData(lat, lon);
    }
  };

  const fetchWeatherData = async (lat: number, lon: number): Promise<void> => {
    const response: Response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const data: WeatherData = await response.json();
    setWeatherData(data);
  };

  // useEffect(() => {
  //   fetchWeather();
  // }, [city]);
  //Removed this useEffect dependency on city 

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
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