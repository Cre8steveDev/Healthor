import "./comp_styles/map.css";
// eslint-disable-next-line no-unused-vars
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import axios from "axios";
import { useState, useEffect, useRef } from "react";

const HospitalMap = () => {
  // Compoment States
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState({
    lat: 6.332915,
    lng: 5.622178,
  });
  const [address, setAddress] = useState("Benin City, Edo State, Nigeria");
  const [tempaddress, setTempAddress] = useState("");
  const [nearbyHospitals, setNearbyHospitals] = useState([]);

  const { lat: latitude, lng: longitude } = userLocation;

  useEffect(() => {
    GetLocation(address, setUserLocation);
  }, [address]);

  // Fetch nearby hospitals using the Google Places API
  useEffect(() => {
    axios
      .get(
        `https://us1.locationiq.com/v1/nearby?key=pk.96a5cf876667a96fdf1b9b8fa7269975&lat=${latitude}&lon=${longitude}&tag=hospital,clinic&radius=10000&format=json`
      )
      .then((response) => {
        // res.status(200).json(response.data);
        setNearbyHospitals(response.data);
        // console.log(response.data);
        // setUserLocation({
        //   lat: Number(response.data[0]?.lat),
        //   lng: Number(response.data[0]?.lon),
        // });
      })
      .catch((error) => {
        // console.log(error.message);
        error;
        console.log("Sorry, an error occured!");
      });
  }, [latitude, longitude]);

  return (
    <div>
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
        <p className="information">
          Please try to be very descriptive in the address to ensure you get
          accurate results. eg. Street, City, State, Country. You can zoom in an
          out using + and + button on the map, or pinch and drag using two
          fingers with on mobile devices.
        </p>
      </div>

      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "75vh", width: "100vw" }}
        ref={mapRef}
        placeholder={
          <div className="h-[73vh] w-[screen] text-4xl">
            {" "}
            Currently loading map data
          </div>
        }
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <UpdateMapCentre mapCentre={[userLocation.lat, userLocation.lng]} />

        {nearbyHospitals.map((point, idx) => (
          <Marker position={[point.lat, point.lon]} key={idx}>
            <Popup>
              <p className="hospital_name">{point.name}</p>
              <p>{point.display_name}</p>
              <p>{`Latitude: ${point.lat} || Longitude: ${point.lon}`}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HospitalMap;

// GET LOCATION FROM ADDRESS
// FORWARD GEOCODING
const GetLocation = async (address, setUserLocation) => {
  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/search?key=pk.96a5cf876667a96fdf1b9b8fa7269975&q=${address}&format=json`
    );

    const data = await response.json();

    if (!data) {
      throw new Error("Error Occured getting location");
    }

    setUserLocation({
      lat: Number(data[0]?.lat),
      lng: Number(data[0]?.lon),
    });
  } catch (error) {
    console.log(error);
    setUserLocation({
      lat: 6.332915,
      lng: 5.622178,
    });
  }
};

// Adjusting center of the map
function UpdateMapCentre(props) {
  const map = useMap();
  // eslint-disable-next-line react/prop-types
  map.setView(props.mapCentre, 13);
  return null;
}
