import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const mapStyles = {
    height: "70vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 30.248108589238974,
    lng: -97.7438929386338,
  };

  const locations = [
    {
      name: "Little Stacy Park",
      location: {
        lat: 30.24687823756802,
        lng: -97.74374407630856,
      },
    },
  ];

  return (
    <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLEMAPS_KEY}`}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={16} center={defaultCenter}>
        {locations.map(item => {
          return <Marker key={item.name} position={item.location} />;
        })}
      </GoogleMap>
    </LoadScript>
  );
};
export default Map;
