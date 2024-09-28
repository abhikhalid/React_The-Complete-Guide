import { useCallback, useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from './loc.js';

const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = storedIds.map(id => AVAILABLE_PLACES.find(place => place.id === id));


function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availabePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);


  //this is an example of reduntant usage od useEffect. 
  //this code runs synchronously, so it doesn't need to be inside useEffect. It executes instantly and line by line.
  //with local storage, we got not callback function or promises
  //we can simply get rid of that useEffect.
  useEffect(() => {
    // const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    // const storedPlaces = storedIds.map(id => AVAILABLE_PLACES.find(place => place.id === id));
    
    // setPickedPlaces(storedPlaces);
  }, []);
  

   //but this was not the case here with getCurrentPosition. 
  useEffect(() => {
    //when this line executed here, it was not done yet. Instead it was only done once this callback function here was executed by the browser.
    //and that happende at some point in the future.
    navigator.geolocation.getCurrentPosition((position)=>{
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude);
  
        setAvailablePlaces(sortedPlaces); //tells react to re-render the component
        console.log(sortedPlaces);
    });
  }, []);


  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
     
    // another side effec, because this code is not directly releated to rendering the JSX Code.
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]));
    }
  }

  //with useCallback, we can make sure that this function is not recreated with every render cycle.
  // Instead it stores it internally in memory and reuses it for every render cycle.
  // that's why you should use useCallback when passing functions as dependencies to useEffect.
  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false);

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];

    localStorage.setItem(
      'selectedPlaces',
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    )

  },[]); //this depenedencies works exactly same as useEffect. React will only recreate this function if the dependencies change.

  return (
    <>
      <Modal open={modalIsOpen}  onClose={handleStopRemovePlace}>
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
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availabePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
