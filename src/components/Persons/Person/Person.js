import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import classes from './Person.module.css';
import PropTypes from 'prop-types';

// Pour utiliser les lifecycle hooks, il faut absolument avoir un component class-based

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  componentDidMount() {
    this.inputElementRef.current.focus();
  }

  render() {
    console.log('[Person.js] rendering...');
    return (
      <Auxiliary>
        {this.props.isAuth ? <p>Authenticated</p> : <p>Please Log in</p>}
        <p onClick={this.props.click}>
          I'm {this.props.name} and I'm {this.props.age} years old
        </p>
        <input
          ref={this.inputElementRef}
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

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};

export default withClass(Person, classes.Person);
