// The Hospital Component that renders the Map

import HospitalMap from "./HospitalMap";

const Hospital = () => {
  // const apiKey = "AIzaSyAT1_U3TE0PV8OmYNopWsrm6wYQq4OvcxM";
  const mapKey = "hospital-map"; // Unique key for remounting

  return <HospitalMap key={mapKey} />;
};

export default Hospital;
