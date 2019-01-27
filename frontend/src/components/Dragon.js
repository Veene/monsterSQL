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
        console.log('state ', this.state)
      })
      .catch(error => console.log(error))
  }


  render() {
    const { dragon } = this.state
    return (
      <div>
        <span>G{dragon.generationId}.</span>
        <span>I{dragon.dragonId}.</span>
        {dragon.traits.map(trait => trait.traitValue).join(', ')}
      </div>
    )
  }
}

export default Dragon;