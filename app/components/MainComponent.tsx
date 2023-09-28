"use client";
import React, { useEffect, useState } from "react";
// location props to get location from the search box
type Props = {
  location: string;
};
// API KEY
const APIKey = process.env.NEXT_PUBLIC_API_KEY
console.log(APIKey);
const MainComponent = (props: Props) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isCelsius, setIsCelsius] = useState(true); // State to track if the temparature is in celsius or not
  const [invalidCity, setInvalidCity] = useState(false); // State to track invalid city
  useEffect(() => {
    async function fetchData() {
      try {
        // code to fetch latitude and longitude from location name
        const location = props.location;
        const geoAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${APIKey}`;
        const geoRes = await fetch(geoAPI);

        if (!geoRes.ok) {
          throw new Error("City not found");
        }

        const geoData = await geoRes.json();

        if (geoData.length === 0) {
          setInvalidCity(true);
          return;
        } else {
          setInvalidCity(false);
        }

        // Use latitude and longitude to fetch weather data
        const lat = geoData[0].lat;
        const lon = geoData[0].lon;
        const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;
        const res = await fetch(weatherAPI);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setInvalidCity(true); // Set invalidCity to true on error
      }
    }
    fetchData();
  }, [props.location]);
  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };
  return (
    <>
      {invalidCity ? ( // Check if invalidCity is true
        <div className="text-xl font-bold text-center">
          City does not exist. Please enter a valid city name.
        </div>
      ) : (
        weatherData && (
          <>
            <div className="px-4 pt-4" id="main">
              {/* Button to toggle temperature unit */}
              <button
                onClick={toggleTemperatureUnit}
                className="bg-pink-500 p-2 border-0 rounded-lg"
              >
                {isCelsius ? "Switch to Kelvin" : "Switch to Celsius"}
              </button>
            </div>
            <div className="flex py-8 border-b-2">
              <div className="py-2 px-4 text-left">
                <div id="temp" className="text-4xl font-bold">
                  {isCelsius
                    ? `${weatherData.main.temp}°C`
                    : `${(weatherData.main.temp + 273.15).toFixed(2)}K`}
                </div>
                <div className="text-xl font-bold">
                  Feels like{" "}
                  {isCelsius
                    ? `${weatherData.main.feels_like}°C`
                    : `${(weatherData.main.feels_like + 273.15).toFixed(2)}K`}
                </div>
              </div>
              <div className="py-2 px-4">
                <h2 id="place" className="text-3xl font-bold px-4">
                  {props.location}
                </h2>
                <h3 id="country" className="text-2xl font-semibold px-4">
                  {weatherData.sys.country}
                </h3>
              </div>
            </div>

            <div className="px-2 py-8">
              <h2 className="text-2xl font-bold mb-4">Weather Details</h2>
              <div className="flex justify-between py-1">
                <p className="text-gray-700">Temperature</p>
                <p className="text-gray-700" id="weather-temp">
                  {isCelsius
                    ? `${weatherData.main.temp}°C`
                    : `${(weatherData.main.temp + 273.15).toFixed(2)}K`}
                </p>
              </div>
              <div className="flex justify-between py-1">
                <p className="text-gray-700">Cloudy</p>
                <p className="text-gray-700" id="cloudy">
                  {weatherData.weather[0]?.description}
                </p>
              </div>
              <div className="flex justify-between py-1">
                <p className="text-gray-700">Humidity</p>
                <p className="text-gray-700" id="humidity">
                  {weatherData.main.humidity}%
                </p>
              </div>
              <div className="flex justify-between py-1">
                <p className="text-gray-700">Wind</p>
                <p className="text-gray-700" id="wind">
                  {weatherData.wind.speed} m/s
                </p>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default MainComponent;
