import { useState, useEffect, useRef } from 'react';

const WEATHER_DATA = [
  { codes: [ 0 ], img: 'clear_sky', text: '快晴' },
  { codes: [ 1, 2 ], img: 'sunny', text: '晴れ' },
  { codes: [ 3, 45, 48 ], img: 'cloudy', text: 'くもり' },
  { codes: [ 51, 53, 55, 56, 57 ], img: 'drizzle', text: '霧雨' },
  { codes: [ 61, 63, 66, 80 ], img: 'rainy', text: '雨' },
  { codes: [ 65, 67, 81, 82 ], img: 'heavy_rainy', text: '大雨' },
  { codes: [ 71, 73, 77, 85 ], img: 'snowy', text: '雪' },
  { codes: [ 75, 86 ], img: 'heavy_snowy', text: '大雪' },
];

export const WeatherDisplay = ({ currentWeather }) => {
  console.log('currentWeather', currentWeather)
  if (!currentWeather) {
    return <div className='weather' />;
  }

  const formatTime = (time) => {
    const date = new Date(time);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${('00' + date.getMinutes()).slice(-2)}`;
  }

  const getWeatherByCode = (code) => {
    return WEATHER_DATA.find(data => data.codes.includes(code));
  }

  const formattedTime = formatTime(currentWeather.time);
  const weather = getWeatherByCode(currentWeather.weathercode);

  return <div className='weather weather--open'>
    <div className='weather__time'>{formattedTime}現在</div>
    <div className='weather__icon'>{weather && weather.text}</div>
    <div className='weather__temp'>{currentWeather.temperature}&#8451;</div>
    <div className='weather__dir'>{currentWeather.winddirection}</div>
    <div className='weather__speed'>{currentWeather.windspeed}km/h</div>
  </div>;
}