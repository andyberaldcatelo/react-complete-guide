import React, { Component } from 'react';
import classes from './Person.module.css';

// Pour utiliser les lifecycle hooks, il faut absolument avoir un component class-based

class Person extends Component {
  render() {
    console.log('[Person.js] rendering...');
    return (
      <div className={classes.Person}>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I'm {this.props.age}
        </p>
        <input
          type='text'
          defaultValue={this.props.name}
          onChange={this.props.changed}
        />
        <p>{this.props.children}</p>
      </div>
    );
  }
}

export default Person;
