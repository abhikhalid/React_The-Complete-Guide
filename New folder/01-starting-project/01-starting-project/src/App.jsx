import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './https.js';
import Error from './components/Error.jsx';

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);


  useEffect(() => {
    async function fetchPlaces(){
      setIsFetching(true);

      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);

      } catch (error) {
        setError({message: error.message || 'Failed to fetch user places.'});
      }

      setIsFetching(false);
    }

    fetchPlaces();

  }, [])
  

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    //I'm updating my local state before sending it to the database. 
    //In this approach we do not need to handle loading state.
    //Optimistic Updating

    //   await updateUserPlaces([selectedPlace, ...userPlaces]); (we could also do it instead of optimistic updating, in that case we have to deal with loading state otherwise user might think our applicaiton is in stuck.)
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    // updateUserPlaces(userPlaces); this won't work because the state is not updated immediately and this line is part of old component function.
    try{
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    }catch(error){
      setUserPlaces(userPlaces); //if something goes wrong, revert back to the previous state.
      setErrorUpdatingPlaces({message: error.message || 'Failed to update places.'});
    }

  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try {
      await updateUserPlaces(
        userPlaces.filter((place) => place.id !== selectedPlace.current.id)
      );
    } catch (error) {
      setUserPlaces(userPlaces); //rollback
      setErrorUpdatingPlaces({
        message: error.message || 'Failed to delete places.',
      });
    }

    setModalIsOpen(false);
  }, [userPlaces]); //this function should recreated if 'userPlaces' changes.

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
       {errorUpdatingPlaces && (
         <Error
         title="An error occured!"
         message={errorUpdatingPlaces.message} 
         onConfirm={handleError}
        />
       )}
      </Modal>


      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && 
          <Error 
          title="An error occured!"
          message={error.message}/>
        }
        
        {!error && 
          <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          isLoading={isFetching}
          loadingText="Fetching your places..."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
