import { Link, useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation } from '@tanstack/react-query';
import { createNewEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate();

  const {mutate, isPending, isError, error} = useMutation({
    // mutationKey:  we could set mutationKey here, but we don't need it here as mutations typically isn't to cache their response data
    // they are primarliy about changing something on your backend. not about getting and storing data in your front-end.
    mutationFn: createNewEvent,
    onSuccess: () => { 
      // it tell React Query that the data fetched by certain queries is outdated now. 
      //It should be marked as stale and that an immediate refetch should be triggered if the query belongs to a component 
      //that's currently visible on the screen.
      queryClient.invalidateQueries({
        // this will then invalidate all queries that include this key. Not has to be exact match. 
        
        // queryKey: ['events', {exact: true}],
        queryKey: ['events'],

      }); 

      navigate('/events');  
    }
  });

  function handleSubmit(formData) {
    mutate({
      event: formData,
    });

    // navigate('/events');
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}  
        {!isPending && (<>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>)}
      </EventForm>
      {isError && <ErrorBlock title="Failed to create event" message={error.info?.message || 'Failed to create event. Please check your inputs and try agian later.'} />}
    </Modal>
  );
}
