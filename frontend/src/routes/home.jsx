import React, { PropTypes } from 'react';
import Intent from '../intents/counter-intent/counter-intent';

const Home = ({ counter }) => {
  const handleIncrement = () => { console.log('inc'); Intent.incrementCounter(); };

  const handleDecrease = () => { console.log('dec'); Intent.decreaseCounter(); };

  return (
    <div className="jumbotron text-center">
      <h1>Welcome to React + RxJS</h1>
      <p>This is a template showcasing RxJS as a dataflow + React + React-router. This project will continue to grown
        implementing other use full real life examples! (well as close as) </p>
      <div className="center-block text-center">
        <h1>counter: {counter}</h1>
        <button className="btn btn-lg btn-primary" onClick={handleDecrease}>decrease</button>
           {'  '}
        <button className="btn btn-lg btn-primary" onClick={handleIncrement}>increment</button>
      </div>
    </div>
  );
};

export default Home;
