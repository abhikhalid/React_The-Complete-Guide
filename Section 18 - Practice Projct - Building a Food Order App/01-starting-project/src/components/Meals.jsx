import React, { useEffect, useState } from 'react'
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {};

//React Component can not be a async function
export default function Meals() {
  // const [loadedMeals, setLoadedMeals] = useState([]);
  
  //firt write code without useEffect to show your students about infinite loop
  // useEffect(() => {
  //   async function fetchMeals(){
  //     const response = await fetch('http://localhost:3000/meals');
  
  //     if(!response.ok){
  //       // ...
  //     }
  
  //     const meals = await response.json();
  //     setLoadedMeals(meals);
  //   }

  //   fetchMeals();
  // }, []);

  const {data : loadedMeals, isLoading, error} = useHttp('http://localhost:3000/meals',requestConfig,[]);

  console.log(loadedMeals);

  if(isLoading){
    return <p className='center'>Fetching meals...</p>;
  }

  if(error){
    return <Error 
              title="Failed to fetch meals"
              message={error}
            />
  }
  
  
  return (
    <ul id="meals">
      {loadedMeals.map(meal => (
          <MealItem key={meal.id} meal={meal}/>
      ))}
    </ul>
  )
}
