import { useState, useEffect } from 'react';

const WEATHER_DATA = [
  { codes: [ 0 ], img: 'sunny', text: '快晴' },
  { codes: [ 1, 2 ], img: 'sunny', text: '晴れ' },
  { codes: [ 3, 45, 48 ], img: 'cloudy', text: 'くもり' },
  { codes: [ 51, 53, 55, 56, 57 ], img: 'drizzle', text: '霧雨' },
  { codes: [ 61, 63, 66, 80 ], img: 'rainy', text: '雨' },
  { codes: [ 65, 67, 81, 82 ], img: 'heavy_rainy', text: '大雨' },
  { codes: [ 71, 73, 77, 85 ], img: 'snowy', text: '雪' },
  { codes: [ 75, 86 ], img: 'heavy_snowy', text: '大雪' },
  { codes: [ 95, 96, 99 ], img: 'thunder', text: '雷' },
];

export const WeatherDisplay = ({ currentWeather }) => {
  const [ open, setOpen ] = useState(true);

  useEffect(() => {
    if (currentWeather) {
      setOpen(true);
    }
  }, [ currentWeather ])

  if (!currentWeather) {
    return <div className='weather' />;
  }

  const onClickToggle = () => {
    setOpen(!open);
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

  return <div className={`weather ${open && 'weather--open'}`}>
    <div className='weather__toggle' onClick={onClickToggle} />
    <div className='weather__time_wrap'><div className='weather__time'>{formattedTime}</div>クリック地点の天気</div>
    {weather && (
      <div className='weather__icon_wrap'>
        <img src={`./img/${weather.img}.png`} className='weather__icon' />
        <span>{weather.text}</span>
      </div>
    )}
    <ul className='weather__list'>
      <li className='weather__item'>
        <span className='weather__item_name'>気温</span>
        <span className='weather__item_content'>{currentWeather.temperature}&#8451;</span>
      </li>
      <li className='weather__item'>
        <span className='weather__item_name'>風速</span>
        <span className='weather__item_content'>
          <div className='weather__arrow_wrap'>
            <img src='./img/arrow.png' className='weather__arrow' style={{ transform: `rotate(${currentWeather.winddirection}deg)` }} />
          </div>
          {currentWeather.windspeed}km/h
        </span>
      </li>
    </ul>
  </div>;
}