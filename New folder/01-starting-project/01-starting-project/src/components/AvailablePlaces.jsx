import { useState } from 'react';
import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import { useEffect } from 'react';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [AvailablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);  
      
      try{
        const response = await fetch('http://localhostk:3000/places');
        const resData =  await response.json();

        if(!response.ok) {
          throw new Error('Failed to fetch places!');
        }

        setAvailablePlaces(resData.places); 
      }
      catch(error) {
        setError({
          message:
           error.message || 'Could not fetch places, please try agian later.'
        });
      }

      setIsFetching(false); 
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
