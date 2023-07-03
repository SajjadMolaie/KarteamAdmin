import React, { useState } from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Location from "../images/location.png";
import { BiMap } from "react-icons/bi";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoic2FqYWQxMDg0IiwiYSI6ImNsamw4azl3YzB0bngzZXBwZHJwODBrZzIifQ.-qsnpz2fFU3wGxGDeW3gYg",
});

const MapboxRadiusSelector = ({
  center,
  handleMapClick,
  radius,
  locations,
}) => {
  return (
    <div>
      <Map
        style="mapbox://styles/mapbox/streets-v12"
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
        {locations &&
          locations.map((loc) => (
            <Marker
              coordinates={[loc.long, loc.lat]}
              anchor="bottom"
              className="text-2xl"
            >
              <img src={Location} className="w-6 h-6" />
            </Marker>
          ))}
      </Map>
    </div>
  );
};

export default MapboxRadiusSelector;
