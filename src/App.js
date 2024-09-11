import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import SignIn from './Components/SignIn/SignIn';
import Navigation from './Components/Navigation/Navigation';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';
import 'tachyons';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
    };
  }

  calculateFaceLocation = (region) => {
    const clarifaiFace = region.region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (boxes) => {
    this.setState({ box: boxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    const PAT = '533ec48878e64b6c858297e042c4bfae';
    const USER_ID = 'cwgoqsklov82';
    const APP_ID = 'brain';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID,
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": this.state.input,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT,
      },
      body: raw,
    };

    fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result.outputs && result.outputs[0].data.regions) {
        const regions = result.outputs[0].data.regions;
        const faceBoxes = regions.map(region => this.calculateFaceLocation(region));
        this.displayFaceBox(faceBoxes);  // Update the state with the face box location
      } else {
        console.log('No faces detected or regions not returned');
      }
    })
    .catch(error => console.log('error', error));
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({ route: route });
  }

  render() {
   const { isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div>
        <ParticlesBg type="cobweb" bg={true} />
        <div className="App">
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          {route === 'home'
            ?  <div>
                <Logo />
                <Rank />
                <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition box={box} imageUrl={imageUrl} />
              </div>
              : (
                route === 'signin' 
                ? <SignIn onRouteChange={this.onRouteChange} />
                :  <Register onRouteChange={this.onRouteChange} />
              )
              
          }
        </div>
      </div>
    );
  }
}

export default App;


