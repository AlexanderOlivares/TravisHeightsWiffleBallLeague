import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface MapProps {
  mapType: string;
}

const Map: React.FC<MapProps> = ({ mapType }) => {
  const mapStyles: {
    height: string;
    width: string;
  } = {
    height: "70vh",
    width: "100%",
  };

  const defaultCenter: {
    lat: number;
    lng: number;
  } = {
    lat: 30.246841124279797,
    lng: -97.74389326257925,
  };

  // Position of the red marker on map
  const locations: { name: string; location: { lat: number; lng: number } }[] =
    [
      {
        name: "Little Stacy Park",
        location: {
          lat: 30.24687823756802,
          lng: -97.74374407630856,
        },
      },
    ];

  // For a more zoomed in view (19) when mapType is "satellite"
  const zoomIntensity: number = mapType === "roadmap" ? 16 : 19;

  return (
    <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLEMAPS_KEY}`}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        mapTypeId={mapType}
        zoom={zoomIntensity}
        center={defaultCenter}
      >
        {locations.map(item => {
          return <Marker key={item.name} position={item.location} />;
        })}
      </GoogleMap>
    </LoadScript>
  );
};
export default Map;
