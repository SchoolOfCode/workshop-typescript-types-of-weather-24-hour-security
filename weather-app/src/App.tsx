import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [location, setLocation] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const fetchWeather = async () => {
    if (location) return;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();
    setWeatherData(data);
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  return (
    <>
      <h1>24-Hour Weather</h1>
      <div className="searchbar">
        <label className={styles.formGroup}>
          City:
          <input
            type="text"
            name="city"
            onChange={(event) => handleChange(event)}
            className={styles.field}
            value={state.data.city}
          />
        </label>
      </div>
      <button>
        <img
          src="\search-icon-png-transparent-18-2112149448.jpg"
          alt="search button"
          width="100"
          height="100"
        />
      </button>
      <div className="weather-picture"></div>
    </>
  );
}

export default App;
