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
  const [location, setLocation] = useState("satari");

  return (
    <div>
      <h1 className="relative top-6 z-50 backdrop-blur-2xl contrast-50 w-24 mr-auto text-left rounded-br-md rounded-tl-sm">
        {location}
      </h1>
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
              coordinates={[loc.lat, loc.long]}
              anchor="bottom"
              className="text-2xl"
              onClick={() => setLocation(loc.name)}
            >
              <img src={Location} className="w-6 h-6" />
            </Marker>
          ))}
      </Map>
    </div>
  );
};

export default MapboxRadiusSelector;
