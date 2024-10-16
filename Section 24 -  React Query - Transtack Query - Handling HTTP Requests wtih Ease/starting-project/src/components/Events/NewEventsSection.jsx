//A custom hook built by the Tanstack React Query Team
import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {
  // this hook now behind the scenes send an HTTP Request. get us the event data that we need in this section and also give us loading state and potential error state
  const {data, isPending, isError, error} = useQuery({
    queryKey: ['events', {max:3}], //key name is totally up to you. you could have object or anything else
    queryFn:  ({signal, queryKey}) => fetchEvents({signal, ...queryKey[1]}), // the fetch events will be executed by Tanstack Query to fetch my data.
    // staleTime: 0, // default vlaue is 0. if you want to cache the data for a certain amount of time, you can set it to a different value
    staleTime: 5000, //It will wait 5000 milliseconds before sending another request.
    //Garbage Collection Time : this controls how long the data and the cache will be kept around.
    // the default value is 5 minutes. if you want to change that, you can set it to a different value
    //gcTime: 30000, // 30 seconds (The cahced data would only be kept around for half a minute and thereafter, it would be discarded). So thereafter, this component needs to render again. It would fetch the data again.
    
  });
  
  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || 'Failed to fetch events.'}
       />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
