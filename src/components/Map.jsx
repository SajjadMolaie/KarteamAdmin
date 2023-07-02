import React, { useState } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoic2FqYWQxMDg0IiwiYSI6ImNsamw4azl3YzB0bngzZXBwZHJwODBrZzIifQ.-qsnpz2fFU3wGxGDeW3gYg",
});

const MapboxRadiusSelector = ({ center, handleMapClick, radius }) => {
  return (
    <div>
      <Map
        style="mapbox://styles/mapbox/streets-v8"
        containerStyle={{
          height: "500px",
          width: "100%",
        }}
        center={center}
        onClick={handleMapClick}
      >
        <Layer
          type="circle"
          id="radius"
          paint={{
            "circle-color": "#007cbf",
            "circle-opacity": 0.3,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#007cbf",
          }}
        >
          <Feature coordinates={center} properties={{ radius: radius }} />
        </Layer>
      </Map>
    </div>
  );
};

export default MapboxRadiusSelector;
