import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { GoogleMap, LoadScript, MarkerF, useJsApiLoader} from '@react-google-maps/api';

const config = require('../../../TFCConfig.json')

const mapstyle = {
      position: "relative",
      width: "100%",
      height: "100%",
}

const StudiosMap = ({studios,setUserLocation,
      selectedStudio,setSelectedStudio, 
      userMarker, setUserMarker,
      setInputLocation}) => {

      const [mapcenter,setMapCenter] = useState({lat: 43.725329,lng: -79.422753})

      const onMapClick = (e) => {
            setUserMarker(
                  {lat: e.latLng.lat(),
                  lng: e.latLng.lng()}
            );
            setUserLocation(
                  {lat: e.latLng.lat(),
                  lng: e.latLng.lng()}
            );
            setSelectedStudio(null);
            setInputLocation('');
          };

      
      useEffect(()=>{
            selectedStudio && setMapCenter({
                  lat: selectedStudio.location.latitude,
                  lng: selectedStudio.location.logitude,});
      } ,[selectedStudio])


      const { isLoaded, loadError } = useJsApiLoader({
            googleMapsApiKey: config.GoogleAPIKey
       })

      return (
      <div style={{
            position: "relative",
            zIndex: 0,
            width: "100%",
            height: "100%",
          }}>

      {isLoaded && <GoogleMap
      mapContainerStyle={mapstyle}
      center={mapcenter}
      zoom={11.2}
      onClick={onMapClick}
      >

      {userMarker && <MarkerF
            key={'userMarker'}
            position={{
            lat: userMarker.lat,
            lng: userMarker.lng,
            }}
            icon={{
            url: '/user.png',
            scaledSize: {
            width: 33,
            height: 33,
            },
            }}
      />}
      
      {studios.map((studio) => (
            <MarkerF
            key={studio.id}
            position={{
            lat: studio.location.latitude,
            lng: studio.location.logitude,
            }}
            clickable={true}
            icon={{url:'/marker.png',
                  scaledSize: {
                        width: 40,
                        height: 40,
                  },
            }}
            onClick={
                  () => {
                        setSelectedStudio(studio);
                  }}
                  
            />
      ))}
      </GoogleMap>}

      </div>
      );
}

export default StudiosMap;