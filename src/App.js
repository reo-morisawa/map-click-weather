import './App.css';
import { Wrapper } from "@googlemaps/react-wrapper";
import { useState } from 'react';
import { Map } from './components/Map';
import { Marker } from './components/Marker';

const POS_TOKYO_STATION = { lat: 35.681, lng: 139.767 };

const App = () => {
  const [ markerPosition, setMarkerPosition ] = useState(null);

  const onClick = async (e) => {
    const pos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarkerPosition(pos);
  }

  return (
    <Wrapper apiKey={process.env.REACT_APP_MAP_API_KEY}>
      <Map center={POS_TOKYO_STATION} zoom={14} onClick={onClick}>
        <Marker position={markerPosition} />
      </Map>
    </Wrapper>
  );
}

export default App;
