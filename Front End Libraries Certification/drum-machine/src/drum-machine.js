import React from 'react';
import ReactDOM from 'react-dom';

const sounds = [
  {
    key: 'Q',
    name: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    key: 'W',
    name: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    key: 'E',
    name: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    key: 'A',
    name: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    key: 'S',
    name: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    key: 'D',
    name: 'Open HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    key: 'Z',
    name: 'Kick-n\'-Hat',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    key: 'X',
    name: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    key: 'C',
    name: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

class App extends React.Component {

  render() {
    
    // console.log(sounds[8].key);
    return(
      <div id="drum-machine">
        <div id="display" className="display">
          <h1>Press or Click a Button</h1>
          {sounds.map((sound,index) => (
            <DrumPad 
              text={sound.key}
              audio={sound.url}
              name={sound.name}
              key={index} /> 
            ))}
        </div>
      </div>
    )
  }
}

class DrumPad extends React.Component {
  constructor(props){
    super(props);
    this.sound = React.createRef(); // we create a reference to the audio element
  }

  componentDidMount() {
    this.sound.current.addEventListener('ended', (e)=>{
      const parent = e.target.parentNode;
      parent.classList.remove('active');
    })
  }

  playSound = () => {

    this.sound.current.currentTime = 0;
    this.sound.current.play();
    const grabName = this.props.name;
    const parent = this.sound.current.parentNode;
    
    parent.classList.add('active');
    const displayNode = parent.parentNode;
    displayNode.querySelector('h1').innerText = grabName;
  }


  render() {

    return (
      <div className="drum-pad" id={this.props.name} onClick={this.playSound}>
        {this.props.text}
        <audio ref={this.sound} src={this.props.audio} id={this.props.text} className='clip'></audio>
      </div>
    )
  }
}

document.addEventListener('keydown', (e) =>{ // event is deprecated
  // console.log(e);
  const grabKey = e.key.toUpperCase();
  const audio = document.getElementById(grabKey);
  
  if (audio) {
    const parent = audio.parentNode;
    parent.classList.add('active');

    const displayNode = parent.parentNode;
    displayNode.querySelector('h1').innerText = `${grabKey} is playing`;
    audio.currentTime = 0;
    audio.play();
  }
})


ReactDOM.render(<App />, document.getElementById('root'));