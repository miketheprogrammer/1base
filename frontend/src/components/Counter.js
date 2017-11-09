import React, { Component, PropTypes } from 'react';

export default ({increment, incrementIfOdd, decrement, counter}) =>
  (<p>
      Clicked: {counter} times
      {' '}
      <button className="btn btn-lg btn-primary" onClick={increment}>+</button>
      {' '}
      <button className="btn btn-lg btn-primary" onClick={decrement}>-</button>
      {' '}
      <button className="btn btn-lg btn-primary" onClick={incrementIfOdd}>Increment if odd</button>
  </p>
  );
