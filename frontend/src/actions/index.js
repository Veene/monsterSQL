import { GENERATION, DRAGON } from './types';

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

export const fetchDragon = () => async dispatch => {
  dispatch({ type: DRAGON.FETCH })

  fetch('http://localhost:3000/dragon/new')
    .then(response => {
      console.log(response)
      response.json()
    } )
    .then(json => {
      if(json.type === 'error') {
        dispatch({ type: DRAGON.FETCH_ERROR, payload: json.message});
      } else {
        dispatch({ type: DRAGON.FETCH_SUCCESS, payload: json.dragon});
      }
    })
    .catch(error => console.log(error));
    // .catch(error => dispatch({ type: DRAGON.FETCH_ERROR, payload: error.message}))

    
    // const response = await fetch('http://localhost:3000/dragon/new').json();
    // console.log('response: ', response)
    // dispatch({
    //   type: DRAGON_FETCH,
    //   payload: response
    // });
}