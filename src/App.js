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
  apiKey: process.env.CLARIFAI_API_KEY,
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
      user: {
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  // leaving in in case I want to play around with this app
  // componentDidMount() {
  //   fetch('https://face-recognition-app-0103.herokuapp.com/')
  //     .then(response => response.json())
  //     .then(console.log);
  // }

  // method to load a user object into the state
  loadUser = (data) => {
    if (data && typeof data === 'object') {
      this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }});
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
    if (typeof route === 'string') {
      if (route === 'SignIn') {
        this.setState({isSignedIn: false});
      } else if (route === 'Home') {
        this.setState({isSignedIn: true});
      }
      this.setState({route: route});
    }
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
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      this.displayFaceBox(this.calculateFaceLocation(response));
      // update the user's entry count to reflect this submission
      fetch('https://face-recognition-app-0103.herokuapp.com/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })    
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries: count}));
      });
    })
    .catch(err => console.err(err));
  }

  render () {
    const { imageUrl, box, route, isSignedIn } = this.state;
    return (
      <div className='App'>
        <Particles 
          className='particles'
          params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { 
        route === 'Home' ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition 
              box={box}
              imageUrl={imageUrl}
            />
          </div>
          
        : 
          ( route === 'SignIn' ?
            <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          :
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }
      </div>
    );
  }
}

export default App;
