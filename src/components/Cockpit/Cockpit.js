import React, { useEffect, useRef } from 'react';
import classes from './Cockpit.module.css';

const Cockpit = (props) => {
  const toogleBtnRef = useRef(null);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    toogleBtnRef.current.click();
    return () => {
      console.log('[Cockpit.js] clean up work in useEffect()');
    };
  }, []);

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

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red);
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button ref={toogleBtnRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
      <button onClick={props.login}>Log in</button>
    </div>
  );
};

export default React.memo(Cockpit);
