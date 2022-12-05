import './App.css';
import { Wrapper } from "@googlemaps/react-wrapper";
import { useState } from 'react';
import { WeatherDisplay } from './components/WeatherDisplay';
import { Map } from './components/Map';
import { Marker } from './components/Marker';

const POS_TOKYO_STATION = { lat: 35.681, lng: 139.767 };

const App = () => {
  const [ markerPosition, setMarkerPosition ] = useState(null);
  const [ currentWeather, setCurrentWeather ] = useState(null);

  const getWeather = async ({ lat, lng }) => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&timezone=Asia%2FTokyo`);
    return response ? response.json() : null;
  }

  const onClick = async (e) => {
    const pos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarkerPosition(pos);
    const weather = await getWeather({ lat: pos.lat, lng: pos.lng });
    setCurrentWeather(weather.current_weather);
  }

  return (
    <Wrapper apiKey={process.env.REACT_APP_MAP_API_KEY}>
      <Map center={POS_TOKYO_STATION} zoom={14} onClick={onClick}>
        <Marker position={markerPosition} />
      </Map>
      <WeatherDisplay currentWeather={currentWeather} />
    </Wrapper>
  );
}

export default App;
