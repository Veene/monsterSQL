import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGeneration } from '../actions/index';
import fetchStates from '../reducers/fetchStates';

class Generation extends Component {
  timer = null;

  componentDidMount() {
    this.fetchNextGeneration();
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  fetchNextGeneration = () => {
    
    const MINIMUM_DELAY = 5000;
    this.props.fetchGeneration();

    //getTime is in miliseconds
    let delay = new Date(this.props.generation.expiration).getTime() - new Date().getTime();

    if(delay < MINIMUM_DELAY || undefined) {
      delay = MINIMUM_DELAY
    }
    //need to set to this.timer because otherwise it would be local scoped and we wouldnt be able to clear in unmount
    this.timer = setTimeout(() => this.fetchNextGeneration(), 5000);
  }

  render() {
    
    const { generation } = this.props;

    // if(generation.status === fetchStates.fetching) {
    //   return <div>...</div>
    // }
    if(generation.status === fetchStates.error) {
      return <div>{generation.message}</div>
    }
    return (
      <div>
        <h3>Generation {generation.generationId}. Expires on:</h3>
        <h4>{new Date(generation.expiration).toString()}</h4>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    generation: state.generation
  }
}


export default connect(mapStateToProps, { fetchGeneration })(Generation);