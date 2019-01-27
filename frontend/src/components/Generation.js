import React, { Component } from 'react';

const DEFAULT_GENERATION = { 
  generationId: '', 
  expiration: ''
}
const MINIMUM_DELAY = 3000;

class Generation extends Component {
  state = { generation: DEFAULT_GENERATION };
  timer = null;

  componentDidMount() {
    this.fetchNextGeneration();
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  fetchGeneration = () => {
    fetch('http://localhost:3000/generation')
      .then(response => response.json())
      .then((json) => {

        this.setState({ generation : json.generation })
      })
      .catch(error => console.log(error))
  };

  fetchNextGeneration = () => {

    this.fetchGeneration();

    //getTime is in miliseconds
    let delay = new Date(this.state.generation.expiration).getTime() - new Date().getTime();
    if(delay < MINIMUM_DELAY) {
      delay = MINIMUM_DELAY
    }
    //need to set to this.timer because otherwise it would be local scoped and we wouldnt be able to clear in unmount
    this.timer = setTimeout(() => this.fetchNextGeneration(), delay);
  }

  render() {
    const { generation } = this.state;
    return (
      <div>
        <h3>Generation {generation.generationId}. Expires on:</h3>
        <h4>{new Date(generation.expiration).toString()}</h4>
      </div>
    )
  }
}

export default Generation;