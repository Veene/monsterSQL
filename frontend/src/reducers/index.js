import generation from './generation';
import dragonReducer from './dragon';
import { combineReducers } from 'redux';

export default combineReducers({
  generation: generation,
  dragon: dragonReducer
})
