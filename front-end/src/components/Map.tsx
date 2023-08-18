import React from "react";
import GoogleMapReact from "google-map-react";
import { REACT_APP_MAP_API } from "../const /env.const";
import { DetailCardProps } from "./DetailCard";

function Map({ data, coordsNow }: MapProps) {
  return (
    <div style={{ height: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: REACT_APP_MAP_API }}
        defaultZoom={13}
        defaultCenter={{
          lat: data.latitude,
          lng: data.longitude,
        }}
        onGoogleApiLoaded={({ map }) => {
          new google.maps.Circle({
            strokeColor: "green",
            strokeOpacity: 0.6,
            strokeWeight: 2,
            fillColor: "green",
            fillOpacity: 0.1,
            map,
            center: {
              lat: data.latitude,
              lng: data.longitude,
            },
            radius: data.radius,
          });
          new google.maps.Marker({
            position: {
              lat: coordsNow.lat,
              lng: coordsNow.lng,
            },
            map: map,
            icon: {
              url: "/marker.png",
              scaledSize: new google.maps.Size(50, 50),
            },
          });
        }}
      />
    </div>
  );
}

export default Map;

interface MapProps extends DetailCardProps {
  coordsNow: {
    lat: number;
    lng: number;
  };
}
