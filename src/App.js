import React, {Component} from 'react';
import 'tachyons';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        {/*
          <Logo />
          <ImageLinkForm />
          <FaceRecognition />
        */}
      </div>
    );
  }
}

export default App;
