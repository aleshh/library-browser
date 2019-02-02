import React, { Component } from 'react';
// import customData from './data/ddcIndex.json';

class App extends Component {

  render() {
    const ddc = require('./data/ddcIndex.json');
    console.log(ddc[0]);

    return (
      <div className="App">
        {ddc[0].number + ' ' + ddc[0].description}
      </div>
    );
  }
}

export default App;
