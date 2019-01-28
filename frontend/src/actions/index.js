import { GENERATION, DRAGON } from './types';
import { BACKEND } from '../config';

export const fetchGeneration = () => dispatch => {
  dispatch({ type: GENERATION.FETCH })
  return fetch(`${BACKEND.ADDRESS}/generation`)
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

export const fetchDragon = () => dispatch => {
  dispatch({ type: DRAGON.FETCH })

  fetch(`${BACKEND.ADDRESS}/dragon/new`)
    .then(response => response.json())
    .then(json => {
      if(json.type === 'error') {
        dispatch({ type: DRAGON.FETCH_ERROR, payload: json.message});
      } else {
        dispatch({ type: DRAGON.FETCH_SUCCESS, payload: json.dragon});
      }
    })
    .catch(error => console.log(error));

    // .catch(error => dispatch({ type: DRAGON.FETCH_ERROR, payload: error.message}))


    // const response = fetch('http://localhost:3000/dragon/new');
    // console.log('response: ', response)
    // response.then((response) => response.json())
    // .then((response) => {
    //   dispatch({
    //     type: DRAGON.FETCH_SUCCESS,
    //     payload: response.dragon
    //   });
    // })
    
}