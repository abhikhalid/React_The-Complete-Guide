//A custom hook built by the Tanstack React Query Team
import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {
  // this hook now behind the scenes send an HTTP Request. get us the event data that we need in this section and also give us loading state and potential error state
  const {data, isPending, isError, error} = useQuery({
    queryKey: ['events'], //key name is totally up to you. you could have object or anything else
    queryFn: fetchEvents, // the fetch events will be executed by Tanstack Query to fetch my data.
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
