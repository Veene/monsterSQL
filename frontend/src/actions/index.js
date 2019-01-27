import { GENERATION } from './types';

export const fetchGeneration = () => dispatch => {
  dispatch({ type: GENERATION.FETCH })
  return fetch('http://localhost:3000/generation')
    .then(response => response.json())
    .then(json => {
      if(json.type === 'error') {
        dispatch({ type: GENERATION.FETCH_ERROR, payload: json.message});
      } else {
        dispatch( { type: GENERATION.FETCH_SUCCESS, payload: json.generation });
      }
      
    })
    .catch(error => dispatch({
      type: GENERATION.FETCH_ERROR,
      payload: error.message
    }));
};