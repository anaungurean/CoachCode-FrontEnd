import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';

function LocationMap({ location }) {
  const [coordinates, setCoordinates] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);  

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyAiPRV87qnlMEYTB6wUjK7bc7o1SVp0R8Q`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setCoordinates({ lat, lng });
          console.log('Coordinates:', { lat, lng });
        }
      } catch (error) {
        console.error('There was a problem fetching coordinates:', error);
      }
    };

    getCoordinates();
  }, [location]);

  const mapStyles = {
    height: '400px',
    width: '100%',
    display: isExpanded ? 'block' : 'none',  
  };

  return (
    <div className="mt-4 mr-4 border pl-4 pt-4 pb-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center ml-4">
          <MapPin size={24} className="text-twilight-300 mr-2" />
          <h1 className="text-xl font-bold text-twilight-300">Location</h1>
        </div>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-twilight-500 hover:text-twilight-700 mr-4">
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      <div className="overflow-hidden mr-4 ">
        <LoadScript googleMapsApiKey="AIzaSyAiPRV87qnlMEYTB6wUjK7bc7o1SVp0R8Q">
          <GoogleMap mapContainerStyle={mapStyles} zoom={15} center={coordinates}>
            {coordinates && <Marker position={coordinates} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

LocationMap.propTypes = {
  location: PropTypes.string.isRequired
};

export default LocationMap;