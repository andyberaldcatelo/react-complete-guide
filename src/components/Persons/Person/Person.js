import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
//import classes from './Person.module.css';

// Pour utiliser les lifecycle hooks, il faut absolument avoir un component class-based

class Person extends Component {
  render() {
    console.log('[Person.js] rendering...');
    return (
      <Auxiliary>
        <p key='i1' onClick={this.props.click}>
          I'm {this.props.name} and I'm {this.props.age}
        </p>
        <input
          key='i2'
          type='text'
          defaultValue={this.props.name}
          onChange={this.props.changed}
        />
        <p key='i3'>{this.props.children}</p>
      </Auxiliary>
    );
  }
}

export default Person;
