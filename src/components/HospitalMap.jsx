/* eslint-disable react/prop-types */
// Install the required packages
// npm install @react-google-maps/api axios

import "./comp_styles/map.css";

import {
  GoogleMap,
  InfoWindowF,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import axios from "axios";
import { useState, useEffect } from "react";

//locationIQ Key
let locationIqkey = "pk.489f5dd8c5c03f519c3b96803ae25eb7";

// Map Style
const mapContainerStyle = {
  width: "100%",
  height: "80%",
};

const HospitalMap = ({ apiKey }) => {
  // Compoment States
  const [userLocation, setUserLocation] = useState({
    lat: 6.332915,
    lng: 5.622178,
  });
  const [address, setAddress] = useState("Benin City, Edo State, Nigeria");
  const [tempaddress, setTempAddress] = useState("");
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(userLocation);

  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey });

  const { lat: latitude, lng: longitude } = userLocation;

  const handleActiveMarker = (index) => {
    if (index === activeMarker) return;
    setActiveMarker(index);
  };

  useEffect(() => GetLocation(address, setUserLocation), [address]);

  // Fetch nearby hospitals using the Google Places API
  mapCenter;
  useEffect(() => {
    axios
      .get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
        params: {
          location: `${latitude},${longitude}`,
          radius: 5000,
          type: "hospital",
          key: apiKey,
        },
      })
      .then((response) => {
        // console.log(response);
        setNearbyHospitals(response.data.results);
      })
      .catch((err) => {
        err;
      });
  }, [apiKey, latitude, longitude]);

  return (
    <>
      <div className="address-input-container">
        <input
          type="text"
          id="address"
          className="address-input-text"
          placeholder="Enter Address here"
          onChange={(e) => setTempAddress(e.target.value)}
        />
        <input
          type="button"
          id="hospital"
          value="CHECK HOSPITALS"
          onClick={() => setAddress(tempaddress)}
        />
      </div>
      {isLoaded ? (
        <GoogleMap
          center={userLocation}
          zoom={17}
          mapContainerStyle={mapContainerStyle}
          id="map-container"
        >
          {nearbyHospitals.map((hospital, index) => {
            return (
              <Marker
                key={index}
                id={index}
                position={{
                  lat: hospital.geometry.location.lat,
                  lng: hospital.geometry.location.lng,
                }}
                title={hospital.name}
                label={{ text: "H", color: "white" }}
                cursor="pointer"
                onClick={() => handleActiveMarker(index)}
              >
                {activeMarker === index ? (
                  <InfoWindowF
                    onCloseClick={() => {
                      setMapCenter({
                        lat: hospital.geometry.location.lat,
                        lng: hospital.geometry.location.lng,
                      });
                      handleActiveMarker(null);
                    }}
                  >
                    <div className="marker-container">
                      {hospital.photos ? (
                        <img
                          src={
                            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
                            hospital.photos[0].photo_reference +
                            "&key=" +
                            apiKey
                          }
                          alt="Hospital Photo"
                          className="marker-photo"
                        />
                      ) : (
                        ""
                      )}
                      <p className="marker-name">{hospital.name}</p>
                      <p className="marker-address">{hospital.vicinity}</p>
                    </div>
                  </InfoWindowF>
                ) : null}
              </Marker>
            );
          })}
        </GoogleMap>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            fontFamily: "Montserrat",
            textAlign: "center",
            fontSize: "1.2rem",
          }}
        >
          Connecting to Maps...
        </div>
      )}
    </>
  );
};

export default HospitalMap;

// GET LOCATION FROM ADDRESS
// FORWARD GEOCODING
const GetLocation = (address, setUserLocation) => {
  axios
    .get("https://us1.locationiq.com/v1/search", {
      params: {
        key: locationIqkey,
        q: address,
        format: "json",
      },
    })
    .then((response) => {
      setUserLocation({
        lat: +response.data[0]?.lat,
        lng: +response.data[0]?.lon,
      });
    })
    .catch((error) => error);
};
