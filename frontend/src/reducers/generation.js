import { GENERATION } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_GENERATION = {
  generationId: '',
  expiration: ''
};

const generationReducer = (state = DEFAULT_GENERATION, action) => {
  switch(action.type) {
    case GENERATION.FETCH:
      return Object.assign({}, state, {status: fetchStates.fetching});
    case GENERATION.FETCH_SUCCESS:
      return { ...state, status: fetchStates.success, ...action.payload };
    case GENERATION.FETCH_ERROR:
    return { ...state, status: fetchStates.error, ...action.payload };
    default:
      return state;
  }
} 

export default generationReducer;