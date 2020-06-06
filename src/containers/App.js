import React, { Component } from 'react'; /* toujours importer React*/
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  /* attention, ce sont des : et non des = */
  state = {
    persons: [
      { id: 'abc', name: 'Max', age: 29 },
      { id: 'def', name: 'Pilou', age: 26 },
      { id: 'ghi', name: 'Rex', age: 15 },
    ],
    otherState: 'some other value',
    showPersons: false,
  };

  tooglePersonsHandler = () => {
    const doesShow = !this.state.showPersons;
    this.setState({ showPersons: doesShow });
  };

  deletePersonHandler = (indexPerson) => {
    /* ATTENTION ! Si tu ne mets pas le spread operator,
    tu vas manipuler une référence au state de base !
    Meme si dans le cas présent ça fonctionne, ne le fait
    pas. L'application pourrait déconner. Il faut que le
    state soit immuable, à moins d'y toucher avec setState.
    TOUJOURS FAIRE UNE COPIE ! */
    const persons = [...this.state.persons];
    persons.splice(indexPerson, 1);
    this.setState({
      persons: persons,
    });
  };

  /* Cette fonction modifie le state. Le nom d'une person
  de this.state.persons est modifié selon ce qui est tapé
  dans la textbox LUI ETANT RELIEE */
  nameChangedHandler = (event, id) => {
    /* D'abord il faut récupérer la person correspondant à la textbox */
    const personIndex = this.state.persons.findIndex((eachPerson) => {
      return eachPerson.id === id;
    });

    /* Maintenant qu'on a l'index, on va retrouver la person dans 
    l'array et changer le nom (noter qu'on aurait pu le faire
    en 1 étape avec find) */
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;

    /* Vu qu'on a pas le droit de modifier l'array du state directement,
    il va falloir en faire un copie, mettre à jour cette copie avec la 
    nouvelle modification, puis remplacer complètement l'ancien array
    par le nouveau avec setState */
    const updatedPersons = [...this.state.persons];
    updatedPersons[personIndex] = person;

    this.setState({
      persons: updatedPersons,
    });
  };

  render() {
    /* On outsource le JSX pour le mettre dans une variable.
    Ca permet de garder un return propre. Il faut le mettre après  
    le render car c'est lui qui rends la page et le state à jour.
    Il faut absolument définir persons dès le début et l'initier à null, car on l'utilise 
    conditionnellement à la valeur de this.state.showPersons.
    Sinon la variable n'existera pas et ne pourra pas être définie 
    dans le code dans le cas ou this.state.showPersons est faux */
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
      );
    }

    return (
      <div className={classes.App}>
        <Cockpit
          title={this.props.appTitle}
          persons={this.state.persons}
          showPersons={this.state.showPersons}
          clicked={this.tooglePersonsHandler}
        />
        {persons}
      </div>
    );
  }
}

export default App;
