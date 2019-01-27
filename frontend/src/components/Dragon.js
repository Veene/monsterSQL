import React, { Component } from 'react';
import DragonAvatar from './DragonAvatar';
import { Button } from 'react-bootstrap';

class Dragon extends Component {
  state = { 
    dragon: {
      birthdate: '',
      nickname: '',
      generationId: '',
      traits: [],
      dragonId: ''
    }
  } 
  componentDidMount() {
    this.fetchDragon();
  }

  fetchDragon = () => {
    fetch(`http://localhost:3000/dragon/new`)
      .then(dragon => dragon.json())
      .then(json => { 
        // this.setState({ dragon: json})
        console.log('json from fetchDragon: ', json) 
        this.setState({ 
          dragon: json.dragon
        })
      })
      .catch(error => console.log(error))
  }


  render() {
    return (
      <div>
        <button onClick={this.fetchDragon}>New Dragon</button>
        <DragonAvatar dragon={this.state.dragon} />
      </div>
    )
  }
}

export default Dragon;