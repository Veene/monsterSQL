import React, { Component } from 'react';
import DragonAvatar from './DragonAvatar';
import { fetchDragon } from '../actions/index';
import { connect } from 'react-redux';

class Dragon extends Component {

  componentDidMount() {
    this.fetchDragon();
  }

  fetchDragon = () => {
    this.props.fetchDragon();
  }


  render() {
    console.log('this.props in DRAGON.js: ',this.props)
    return (
      <div>
        <button onClick={this.fetchDragon}>New Dragon</button>
        <DragonAvatar dragon={this.props.dragon} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    dragon: state.dragon
  }
}

export default connect(mapStateToProps, { fetchDragon })(Dragon);