import { useState } from 'react';
import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import { useEffect } from 'react';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../https.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [AvailablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);  
      
      try{
       const places = await fetchAvailablePlaces();

        //async function to get the current position of the user
        navigator.geolocation.getCurrentPosition(position => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false); 
        });
      }
      catch(error) {
        setError({
          message:
           error.message || 'Could not fetch places, please try agian later.'
        });
        setIsFetching(false); 
      }
    }

    fetchPlaces();
  }, []);

  if(error){
    return (
      <ErrorPage
        title="An error occured!"
        message={error.message}
      />
    )
  }
  
  
  return (
    <Places
      title="Available Places"
      places={AvailablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
