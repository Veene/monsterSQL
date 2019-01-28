import React, { Component } from 'react';
import { skinny, slender, spotted, sporty, patchy, plain, striped, stocky } from '../assets';

const propertyMap = {
  backgroundColor: { 
    black: '#263238', 
    white: '#cfd8dc', 
    green: '#a5b6a7', 
    blue: '#0277BD'
  },
  build: { slender: slender, stocky, sporty, skinny},
  pattern: { plain: plain, striped, spotted, patchy },
  size: { small: '100px', medium: '140px', large: '180px', enormous: '220px' }
};

class DragonAvatar extends React.Component {
  DragonImage() {
    const dragonPropertyMap = {};

    this.props.dragon.traits.forEach(trait => {
      const { traitType, traitValue } = trait;
      dragonPropertyMap[traitType] = propertyMap[traitType][traitValue]
    })

    const { backgroundColor, build, pattern, size } = dragonPropertyMap;

    const sizing = { width: '200px', height: '200px' };

    return (
      <div className="dragon-avatar-image-wrapper">
        <div style= {{ backgroundColor: backgroundColor, width: size, height: size }} className="dragon-avatar-image-background"></div>
        <img src={pattern} className="dragon-avatar-image-pattern" style={{ width: size, height: size }} />
        <img src={build} className="dragon-avatar-image" style={{ width: size, height: size }} />
      </div>
    );
  }
  
  render() {
    const { generationId, dragonId, traits } = this.props.dragon;
    if(!this.props.dragon) {
      return <div>Loading..</div>
    }
    return (

      <div>
        <span>G{generationId}.</span>
        <span>I{dragonId}.</span>
        {traits.map(trait => trait.traitValue).join(', ')}
        { this.DragonImage() }
      </div>
    )
  }
}

export default DragonAvatar;