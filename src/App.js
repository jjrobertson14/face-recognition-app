import React, {Component} from 'react';
import 'tachyons';
import Particles from 'react-particles-js';
import particlesOptions from './particlesjs-config.js'
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '8e1cd203cf7c44e29fdf2849cf330ba4',
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
    }
  }

  // method to calculate the dimensions and position of the face bounding box
  calculateFaceLocation = (data) => {
    const clarifaiFaceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(clarifaiFaceBox);
    return {
      leftCol: clarifaiFaceBox.left_col * width, // the percentage of width that the left side of the face bounding box is at
      topRow: clarifaiFaceBox.top_row * height,
      rightCol: width - (clarifaiFaceBox.right_col * width),
      bottomRow: height - (clarifaiFaceBox.bottom_row * height)
    };
  }

  //method to set the route property of the state
  onRouteChange = (route) => {
    if (typeof route === 'string')
      this.setState({route: route});
  }

  //method to set a face bounding box property on the state
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    var value = event.target.value;
    if (value && typeof value === 'string') {
      this.setState({input: value.trim()})
    }
  }

  onButtonSubmit = (event) => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.err(err));
  }

  render() {
    return (
      <div className='App'>
        <Particles 
          className='particles'
          params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange}/>
        { 
        this.state.route === 'home' ?
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition 
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
          
        : 
          ( this.state.route === 'SignIn' ?
            <SignIn onRouteChange={this.onRouteChange} />
          :
            <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
