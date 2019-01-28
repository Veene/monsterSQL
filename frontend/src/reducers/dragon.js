import { DRAGON_FETCH } from '../actions/types'

const DEFAULT_DRAGON = {
  dragonId: '',
  birthdate: '',
  nickname: "",
  traits: [],
  generationId: ''
};

const dragonReducer = (state = DEFAULT_DRAGON, action) => {
  switch(action.type) {
    case DRAGON_FETCH:
      return {...state, ...action.payload}
    default:
      return state
  }
}
export default dragonReducer;