import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGeneration } from '../actions/index';

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
    // console.log('delay: ',delay)
    // console.log('new Date(this.props.generation.expiration).getTime(): ',new Date(this.props.generation.expiration).getTime())
    // console.log('this.props.generation.expiration: ',this.props.generation.expiration)
    if(delay < MINIMUM_DELAY) {
      delay = MINIMUM_DELAY
    }
    //need to set to this.timer because otherwise it would be local scoped and we wouldnt be able to clear in unmount
    this.timer = setTimeout(() => this.fetchNextGeneration(), delay);
  }

  render() {
    console.log('this.props', this.props)
    const { generation } = this.props;
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
    generation: state
  }
}


export default connect(mapStateToProps, { fetchGeneration })(Generation);