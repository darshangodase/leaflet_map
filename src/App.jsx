import React, { useEffect, useState } from 'react';
import MapComponent from './components/MapComponent';

function App() {
  const [position, setPosition] = useState(null); // Handle position as null initially
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error message state

  useEffect(() => {
    const handleSuccess = (position) => {
      const newPosition = [position.coords.latitude, position.coords.longitude];
      setPosition(newPosition);
      setLoading(false); 
    };

    const handleError = (error) => {
      setError('Unable to retrieve your location. Please enable location services or try again.');
      setLoading(false); 
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });

    const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="App">
      <div className="flex h-16 justify-center items-center text-lg font-serif bg-green-200">
        <h1>Real-Time Leaflet Map</h1>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen w-full">
        <div className="">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500 ml-14"></div>
          <p className="mt-4 text-lg">Loading your location...</p>
        </div>
      </div>
      ) : error ? (
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <p className="text-red-600 text-lg">{error}</p> 
      </div>
      ) : (
        <MapComponent position={position} />
      )}
    </div>
  );
}

export default App;
