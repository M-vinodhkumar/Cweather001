import React from 'react'
import {useRef, useState, useEffect } from 'react'
import Clear_icon from '/src/assets/sunny.png'
import Cloud_icon from '/src/assets/cloudy.png'
import Humidity_icon from '/src/assets/humidity.png'
import Drizzle_icon from '/src/assets/drizzle.png'
import Rain_icon from '/src/assets/heavy-rain.png'
import Snow_icon from '/src/assets/snow.png'
import Wind_icon from '/src/assets/windy.png'
import Search_icon from'/src/assets/Search.png';


const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const allIcons = {
        "01d": Clear_icon,
        "01n": Clear_icon,
        "02d": Clear_icon,
        "02n": Clear_icon,
        "03d": Cloud_icon,
        "03n": Cloud_icon,
        "04d": Cloud_icon,
        "04n": Cloud_icon,
        "09d": Drizzle_icon,
        "09n": Drizzle_icon,
        "10d": Rain_icon,
        "10n": Rain_icon,
        "11d": Rain_icon,
        "11n": Rain_icon,
        "13d": Snow_icon,
        "13n": Snow_icon,
        "50d": Cloud_icon,
        "50n": Wind_icon,
    }
    const VITE_APP_KEY="d77f7a7ba0ee6c448cf48cfa5d580145"
    const search = async (city) => {
        if(city===""){
            alert("Please enter a city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${VITE_APP_KEY}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();
            
            console.log(data);          
            const icon = allIcons[data.weather[0].icon] || Clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        }
        catch (error) {
            setWeatherData(false);
            alert("City not found");
        }
    }
    useEffect(() => {
        search("");
    }, [])
    return (
        <div className='pt-20 bg-gradient-to-tr from-blue-300 to-blue-100 h-screen '>
            <div className='bg-gradient-to-tr from-blue-600 to-blue-300 w-80 mx-auto  items-center p-5 rounded-md '>
                <div className='p-2 search-bar  bg-white rounded-md   flex items-center gap-10 '>
                    <input ref={inputRef} type='text' placeholder='Search' className='rounded-lg' />
                    <img src={Search_icon} alt="" onClick={()=>search(inputRef.current.value)} className='w-5 h-5 flex ' /></div>


                <img src={weatherData.icon} alt="" className='weather-icon' />
                <p className='text-white text-7xl text-center'>{weatherData.temperature}</p>
                <p className='text-white text-4xl text-center'>{weatherData.location}</p>

                <div className='weather-data w-100% mt-5 flex justify-around text-white'>

                    <div className='col flex items-center gap-2'>
                        <img src={Humidity_icon} alt="" className='w-10' />
                        <div>
                            <p>{weatherData.humidity}%</p>
                            <span className='block'>Humidity</span>
                        </div>
                    </div>

                    <div className='col flex items-center gap-2'>
                        <img src={Wind_icon} alt="" className='w-10' />

                        <div>
                            <p>{weatherData.windSpeed}km/hr</p>
                            <span className='block'>WindSpeed</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Weather
