import React, { Component } from 'react';
import DragonAvatar from './DragonAvatar';
import { fetchDragon } from '../actions/index'
import { connect } from 'react-redux';

class Dragon extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.fetchDragon}>New Dragon</button>
        <DragonAvatar dragon={this.props.dragon} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dragon: state.dragon
  }
}

export default connect(mapStateToProps, { fetchDragon })(Dragon);