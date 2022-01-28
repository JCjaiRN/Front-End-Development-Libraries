

const audios = {
  Q: {
    keypad: "Q",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    displayText: "Heater 1"
  },
  W: {
    keypad: "W",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    displayText: "Heater 2"
  },
  E: {
    keypad: "E",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    displayText: "Heater 3"
  },
  A: {
    keypad: "A",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    displayText: "Heater 4"
  },
  S: {
    keypad: "S",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    displayText: "Clap"
  },
  D: {
    keypad: "D",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    displayText: "Open HH"
  },
  Z: {
    keypad: "Z",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    displayText: "Kick n' Hat"
  },
  X: {
    keypad: "X",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    displayText: "Kick"
  },
  C: {
    keypad: "C",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    displayText: "Closed HH"
  }
};

const DrumPad = props => {
  const padId = props.keypad.displayText.replace(/\s/g, "-")
  return (
    <div onClick={props.onClick} id={padId} className="drum-pad">
      <audio src={props.keypad.audio} id={props.keypad.keypad} className="clip"/>
      {props.keypad.keypad}
    </div>
  );
};

const PadBank = props => {
  return <div id="container-bank">{props.children}</div>;
};

const InterfaceBank = props => {
  return <div id="container-interface">{props.children}</div>
}

const Display = props => {
  return <h1 id="display">{props.display}</h1>;
};

class DrumMachine extends React.Component {
  constructor() {
    super();
    this.state = {
      display: "",
      volume: 1
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
  }
  handleKeyPress = event => {
    const keypress = event.key.toUpperCase();
    const elementPressed = document.getElementById(keypress).parentElement
    elementPressed.click()
  };
  handleClick = event => {
    const element = event.target
    const audio = element.querySelector("audio");
    const display = audios[audio.id].displayText
    element.classList.toggle("drum-pad-active")
    setTimeout(() => element.classList.toggle("drum-pad-active"), 100)
    this.handleDisplay(display)
    this.handlePlay(audio);
  };
  handleDisplay = display => {
    this.setState({
      display: display
    })
  };
  handlePlay = audio => {
    audio.currentTime = 0;
    audio.volume = this.state.volume
    audio.play();
  };
  render() {
    const drumPads = Object.values(audios).map(audio => (
      <DrumPad keypad={audio} key={audio.keypad} onClick={this.handleClick} />
    ));
    return (
      <div id="drum-machine">
        <PadBank>{drumPads}</PadBank>
        <InterfaceBank>
          <Display display={this.state.display} />
        </InterfaceBank>
      </div>
    );
  }
}

ReactDOM.render(<DrumMachine />, document.getElementById("root"));
