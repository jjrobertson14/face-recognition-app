import React, {Component} from 'react';
import 'tachyons';
import Particles from 'react-particles-js';
import particlesOptions from './particlesjs-config.js'
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Particles 
          className='particles'
          params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
