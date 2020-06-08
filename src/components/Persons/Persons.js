import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
  /*Ici vu qu'on a pas initialisé le state d'abord, la console 
  va mettre un warning indiquant que c'est une mauvaise idée 
  de retourner un state undefined.*/

  //static getDerivedStateFromProps(props, state) {
  //  console.log('[Persons.js] getDerivedStateFromProps');
  //  return state;
  //}

  // ici, il faut absolument retourner un booléen, sinon ça ne fonctionnera pas
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[Persons.js] shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshoBeforeUpdate');
    return { message: 'Snapshot' };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  }

  render() {
    console.log('[Person.js] rendering...');
    return this.props.persons.map((person, index) => {
      return (
        <Person
          click={() => this.props.clicked(index)}
          name={person.name}
          key={person.id}
          age={person.age}
          changed={(event) => this.props.changed(event, person.id)}
        />
      );
    });
  }
}

export default Persons;
