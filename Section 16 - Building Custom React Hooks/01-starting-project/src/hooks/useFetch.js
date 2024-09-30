//amke sure the name does not clash wiht built in hooks
//function name should start with use
//custom hooks are just functions that use other hooks
//custom hooks are not built in hooks

import { useEffect, useState } from "react";

//custom hooks are just functions that use other hooks
export function useFetch(fetchFn, initialValue){
    //this custom hook will not just send req. it will also manage some states.
    
    const [isFetching, setIsFetching] = useState();
    const [error, setError] = useState();
    const [fetchedData,setFetchedData] = useState(initialValue);

    useEffect(() => {
        async function fetchData() {
          setIsFetching(true);
          try {
            const data = await fetchFn();
            setFetchedData(data);
          } catch (error) {
            setError({ message: error.message || 'Failed to fetch data.' });
          }
    
          setIsFetching(false);
        }
    
        fetchData();
      }, [fetchFn]);


      return {
        isFetching,
        fetchedData,
        setFetchedData,
        error
      }
}