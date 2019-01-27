import { GENERATION_ACTION_TYPE } from '../actions/types';

const DEFAULT_GENERATION = {
  generationId: '',
  expiration: ''
};

export const generationReducer = (state=DEFAULT_GENERATION, action) => {
  switch(action.type) {
    case GENERATION_ACTION_TYPE:
      return Object.assign({}, state, action.payload)
    case 'foo':
      return state
    default:
      return state
  }
} 
