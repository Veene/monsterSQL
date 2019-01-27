import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import Generation from './components/Generation';
import Dragon from './components/Dragon';
import './index.css'
import { generationReducer } from './reducers/index';
import { generationActionCreator } from './actions/index';

const store = createStore(generationReducer);
store.subscribe(() => console.log('store update: ', store.getState()));

const zooAction = generationActionCreator({
  generationId: 'zoo',
  expiration: 'bar'
})
store.dispatch(zooAction)

fetch('http://localhost:3000/generation')
  .then(response => response.json())
  .then(json => {
    store.dispatch(generationActionCreator(json.generation))
  })

render(
  <div>
    <h2>Dragon Stack</h2>
    <Generation />
    <Dragon />
  </div>,
  document.getElementById('root')
);