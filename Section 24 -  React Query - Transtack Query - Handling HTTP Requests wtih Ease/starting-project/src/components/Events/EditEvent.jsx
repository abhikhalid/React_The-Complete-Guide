import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, fetchEvents, queryClient, updateEvent } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();

  const params = useParams();

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['events', params.id], //why id? because this query depends on the id of the event which we want to edit
    queryFn: ({signal}) => fetchEvent({id: params.id, signal}),
  });

  const {mutate} = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      //Normally, it's manipulated by React Query whenever you got a new response that's being cached. But you can also manipulate that stored data yourself by calling setQeryData()
      const newEvent = data.event;

      await queryClient.cancelQueries({queryKey: ['events', params.id]}); //cancel all active queries for a specific key, (with this code, we are making sure if we had any outgoing queries for that key, those queries would be canceled and we would not have clashing resposne data from those queries and our optimistically updated query data.)
      //cancel queries will not cancel the mutation, it will really only cancel the queries triggered with useQuery.
      
      const previousEvent = queryClient.getQueryData(['events', params.id]);

      queryClient.setQueryData(['events', params.id], newEvent);
      
      return {previousEvent};
    },
    onError: (error, data, context) => {
      //if the mutation fails, we want to revert the optimistic update
      queryClient.setQueryData(['events', params.id], context.previousEvent); //we're rolling back this optimistic update if the mutation fails
    },
    // onSettled will be called no matter if the mutation was successful or not
    onSettled: () => {
      // just to be sure we got the same data in your front-end as you have on your backend.

      // When then mutation is finished, even though you did perform this optimistic updating and you rolled back if things went wrong.
      // you still make sure that you fetched the latest data from the backend so that if the backendd did something different and the data 
      // would be out of sync, you would still have the latest data in your front-end.
      queryClient.invalidateQueries(['events', params.id]); 
    } 
  });

  function handleSubmit(formData) {
    mutate({
      id: params.id,
      event: formData
    });

    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }


  let content;

  if(isPending){
    content = (<div className="center">
      <LoadingIndicator/>
    </div>);
  }

  if(isError){
    content = (<>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message || 
            'Failed to load event. Please check your inputs and try again later.'
          }
        />

        <div className='form-actions'>
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
     </>
  )}

  if(data){
    content =  (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    )
  }

  return (
    <Modal onClose={handleClose}>
       {content}
    </Modal>
  );
}
