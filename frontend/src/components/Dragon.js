import React, { Component } from 'react';

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
    

  fetchDragon() {
    fetch(`http://localhost:3000/dragon/new`)
      .then(dragon => dragon.json())
      .then(json => { 
        // this.setState({ dragon: json})
        console.log('json from fetchDragon: ', json) 
        this.setState({ 
          birthdate: json.dragon.birthdate,
          nickname: json.dragon.nickname,
          generationId: json.dragon.generationId,
          traits: json.dragon.traits,
        })
        console.log('state ', this.state)
      })
  }


  render() {
    const { dragon } = this.state
    return (
      <div>
          <h2>DRAGON</h2>
          <button onClick={() => this.fetchDragon()}>Get Dragon</button>
          <div>Birthdate:{this.state.birthdate}</div>
          <div>nick: {this.state.nickname}</div>
          <div>genId: {this.state.generationId}</div>
      </div>

    )
  }
}

export default Dragon;