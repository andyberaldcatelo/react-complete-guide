import React, { Component } from 'react'; /* toujours importer React*/
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: 'abc', name: 'Max', age: 29 },
      { id: 'def', name: 'Pilou', age: 26 },
      { id: 'ghi', name: 'Rex', age: 15 },
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    isAuthenticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state; // ici on a écrit state, mais sous jacent, c'est le state après update
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  loginHandler = () => {
    this.setState({
      isAuthenticated: true,
    });
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

    this.setState((prevState, props) => {
      return {
        persons: updatedPersons,
        changeCounter: prevState.changeCounter + 1,
      };
    });
    console.log(this.state.changeCounter);
  };

  render() {
    console.log('[App.js] render');

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
          isAuthenticated={this.state.isAuthenticated}
        />
      );
    }

    return (
      <Auxiliary classes={classes.App}>
        <button
          onClick={() =>
            this.setState({ showCockpit: !this.state.showCockpit })
          }
        >
          Show Cockpit
        </button>
        <AuthContext.Provider
          value={{
            isAuthenticated: this.state.isAuthenticated,
            login: this.loginHandler,
          }}
        >
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              personsLength={this.state.persons.length}
              showPersons={this.state.showPersons}
              clicked={this.tooglePersonsHandler}
              login={this.loginHandler}
            />
          ) : null}
          {persons}
        </AuthContext.Provider>
      </Auxiliary>
    );
  }
}

export default withClass(App, classes.App);
