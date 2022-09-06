import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {

  const [weather, setWeather] = useState(null);
  const [degrees, setDegrees] = useState("C");
  
  useEffect(() => {
    let latitude, longitude = null
    navigator.geolocation.getCurrentPosition((res) => {
      latitude = res.coords.latitude
      longitude = res.coords.longitude
     
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3feadbd5cf89963484d81ac3c36e3e21`)
      .then(res => {
        console.log(res);
        setWeather(res.data)
      });
    })
  }, [])

  function handleClick(){
    if (degrees === "C"){
      setDegrees("F")
    }
    else{
      setDegrees("C")
    }
  }



  return (
    <div className="app">
      <div className="weatherCard">
        <h1>Weather App</h1>
        { weather &&
            <div>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon"/> 
              <h2>{`${weather.name}, ${weather.sys.country}`}</h2>              
              <h2> {weather.weather[0].description.toUpperCase()}</h2>
              <h2>
                <span>Temperature </span> 
                {degrees === "C" ? Math.round(weather.main.temp - 273.15) : (Math.round(weather.main.temp - 273.15) * 9/5 + 32)}{` °${degrees}`}
              </h2>              
              <h2>
                <span>Wind Speed </span> 
                {weather.wind.speed} m/s
              </h2>
              <h2>
                <span>Pressure </span> 
                {weather.main.pressure}</h2> 
              <button className="button" onClick={handleClick}>Degrees °F/°C </button>
            </div>
            

        }
      </div>
      
    </div>
    
  )
}


export default App