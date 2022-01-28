const audio = document.getElementById('beep');

class App extends React.Component {
  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    currentTimer: 'Session',
    isPlaying: false
  }
  
  constructor(props) {
    super(props);
    this.loop = undefined;
  }
  
  componentWillUnmount() {
    clearInterval(this.loop);
  }
  
  handlePlayPause = () => {
    const { isPlaying } = this.state;
    
    if(isPlaying) {
      clearInterval(this.loop);
      this.setState({
        isPlaying: false
      });
    } else {
      this.setState({
        isPlaying: true
      });
      
      this.loop = setInterval(() => {
        const { 
          clockCount, 
          currentTimer, 
          breakCount, 
          sessionCount
        } = this.state;
        
        if(clockCount === 0) {
          this.setState({
            currentTimer: (currentTimer === 'Session') ? 'Break' : 'Session',
            clockCount: (currentTimer === 'Session') ? (breakCount * 60) : (sessionCount * 60)
          });
          
          audio.play();
        } else {
          this.setState({
            clockCount: clockCount - 1
          });
        }
      }, 1000);
    }
 }
  
  handleReset = () => {
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTimer: 'Session',
      isPlaying: false
  });
  
  clearInterval(this.loop);
    
  audio.pause();
  audio.currentTime = 0;
}
  
  convertToTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;
    
    minutes = minutes < 10 ? ('0'+minutes) : minutes;
    seconds = seconds < 10 ? ('0'+seconds) : seconds;
    
    return `${minutes}:${seconds}`;
  }
  
  handleLengthChange = (count, timerType) => {
    const { 
      sessionCount, 
      breakCount, 
      isPlaying, 
      currentTimer
    } = this.state;
    
    let newCount;
    
    if(timerType === 'session') {
      newCount = sessionCount + count;
    } else {
      newCount = breakCount + count;
    }
    
    // case Session: sessionCount:...
    // case Break: breakCount:...
    
    if(newCount > 0 && newCount < 61 && !isPlaying)  {
      this.setState({
        [`${timerType}Count`]: newCount
      });
          
      if(currentTimer.toLowerCase() === timerType) {
        this.setState({
          clockCount: newCount * 60
        })
      }
    }
  }
 
//   handleBreakDecrease = () => {
//     const { breakCount, isPlaying, currentTimer } = this.state;
    
//     if(breakCount > 1)  {
//       if(!isPlaying && currentTimer === 'Break') {
//         this.setState({
//           breakCount: breakCount - 1,
//           clockCount: (breakCount - 1) * 60
//         });
//       } else {
//         this.setState({
//           breakCount: breakCount - 1,
//         });
//       }
//     }
//   } 
  
//   handleBreakIncrease = () => {
//     const { breakCount, isPlaying, currentTimer } = this.state;
    
//     if (breakCount < 60) {
//       if(!isPlaying && currentTimer === 'Break') {
//         this.setState({
//           breakCount: breakCount + 1,
//           clockCount: (breakCount + 1) * 60
//         });
//       } else {
//         this.setState({
//           breakCount: breakCount + 1,
//         });
//       }
//     }
//   }

  
//   handleSessionDecrease = () => {
//     const { sessionCount, isPlaying, currentTimer } = this.state;
    
//     if  (sessionCount > 1) {
//      if(!isPlaying && currentTimer === 'Session') {
//         this.setState({
//           sessionCount: sessionCount - 1,
//           clockCount: (sessionCount - 1) * 60
//         });
//       } else {
//         this.setState({
//           sessionCount: sessionCount - 1,
//         });
//       }
//     }
//   }
  
//   handleSessionIncrease = () => {
//     const { sessionCount, isPlaying, currentTimer } = this.state;
    
//     if (sessionCount < 60) {
//       if(!isPlaying && currentTimer === 'Session') {
//        this.setState({
//          sessionCount: sessionCount + 1,
//          clockCount: (sessionCount + 1) * 60
//         });
//       } else {
//         this.setState({
//           sessionCount: sessionCount + 1,
//         });
//       }
//     }
//   }
  
  render () {
    const { 
      breakCount,
      sessionCount,
      clockCount,
      currentTimer,
      isPlaying
    } = this.state;
    
    const breakProps = {
      title: 'Break',
      count: breakCount,
      handleDecrease: () => this.handleLengthChange(-1, 'break'),
      handleIncrease: () => this.handleLengthChange(1, 'break')
    }
    
    const sessionProps = {
      title: 'Session',
      count: sessionCount,
      handleDecrease: () => this.handleLengthChange(-1, 'session'),
      handleIncrease: () => this.handleLengthChange(1, 'session')
    }
    
    return (
     <div>
      <div className="flex">
        <SetTimer {...breakProps} />
        <SetTimer {...sessionProps} />
      </div>
        
      <div className="clock-container">
        <h1 id="timer-label">{currentTimer}</h1>
        <span id="time-left">{this.convertToTime(clockCount)}</span>
        
        <div className="flex">
          <button id="start_stop" onClick={this.handlePlayPause}>
            <i className={`fas fa-${isPlaying ? 'pause': 'play'}`} />
          </button>
        <button id="reset" onClick={this.handleReset}>
          <i className="fas fa-sync" />
        </button>
       </div>
      </div>
    </div>);
  } 
}

const SetTimer = (props) => {
  const id = props.title.toLowerCase();
  
  return (
  <div className="timer-container">
    <h2 id={`${id}-label`}>
      {props.title} Length
    </h2>
    <div className="flex actions-wrapper">
      <button id={`${id}-decrement`} onClick={props.handleDecrease}>
        <i className="fas fa-minus" />
      </button>
      
      <span id={`${id}-length`}>{props.count}</span>
      
      <button id={`${id}-increment`} onClick={props.handleIncrease}>
        <i className="fas fa-plus" />
      </button>
    </div>
  </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('app'));

