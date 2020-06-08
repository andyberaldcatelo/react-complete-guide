import React from 'react';
import classes from './Person.module.css';

const person = (props) => {
  console.log('[Person.js] rendering...');
  return (
    <div className={classes.Person}>
      <p onClick={props.click}>
        I'm {props.name} and I'm {props.age}
      </p>
      <input type='text' defaultValue={props.name} onChange={props.changed} />
      <p>{props.children}</p>
    </div>
  );
};

export default person;
