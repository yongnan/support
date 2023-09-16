import React, { Fragment, useEffect, useState } from 'react';
import { Promise } from 'bluebird';

Promise.config({ cancellation: true });

function fetchUser() {
  console.count('fetching user');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: 1, name: 'Adam' });
    }, 1000);
  });
}

export default function User() {
  const [id, setId] = useState('loading...');
  const [name, setName] = useState('loading...');

  useEffect(() => {
    const promise = fetchUser().then(user => {
      setId(user.id);
      setName(user.name);
    });

    return () => {
      promise.cancel();
    };
  }, []);
  //[resolved],
  // the cleanup function will only ever run if the resolved state value changes.
  // If the effect runs and the resolved state hasn't changed, then the cleanup code will not run.

  return (
    <Fragment>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
    </Fragment>
  );
}
