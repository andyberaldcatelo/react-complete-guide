import React, { useEffect } from 'react';
import classes from './Cockpit.module.css';

const Cockpit = (props) => {
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // Http request...
    setTimeout(() => {
      console.log('Saved data to cloud');
    }, 1000);
    return () => {
      console.log('[Cockpit.js] clean up work in useEffect()');
    };
  }, [props.persons]);

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect()');
    return () => {
      console.log('[Cockpit.js] 2nd clean up work in useEffect()');
    };
  });

  let assignedClasses = [];
  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.persons.length <= 2) {
    assignedClasses.push(classes.red);
  }
  if (props.persons.length <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
    </div>
  );
};

export default Cockpit;
