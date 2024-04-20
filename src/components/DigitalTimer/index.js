import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isRunning: false,
    initialTimer: 25,
    elapsedMinutes: 25,
    elapsedSeconds: 0,
  }
  componentDidMount() {
    this.intervalId = setInterval(this.updateTimer, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  updateTimer = () => {
    const {isRunning, elapsedMinutes, elapsedSeconds} = this.state
    if (isRunning) {
        let newElapsedMinutes = elapsedMinutes
        let newElapsedSeconds = elapsedSeconds - 1
        if (newElapsedSeconds < 0) {
            newElapsedMinutes -= 1
            newElapsedSeconds = 59
        }
        this.setState({
            elapsedMinutes: newElapsedMinutes,
            elapsedSeconds: newElapsedSeconds,
        })
    }
  }

  onClickPlayPauseBtn = () => {
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  onClickPlus = () => {
    this.setState(prevState => ({elapsedMinutes: prevState.elapsedMinutes + 1, initialTimer: prevState.initialTimer + 1}))
  }

  onClickMinus = () => {
    if (!this.state.isRunning && this.state.initialTimer > 1) {
      this.setState((prevState) => ({
        elapsedMinutes: prevState.elapsedMinutes - 1,
        initialTimer: prevState.initialTimer - 1,
      }))
    }
  }

  resetTimer = () => {
    this.setState({
      isRunning: false,
      elapsedMinutes: this.state.initialTimer,
      elapsedSeconds: 0,
    });
    clearInterval(this.intervalId);
  };

  render() {
    const {isRunning, initialTimer, elapsedMinutes, elapsedSeconds} = this.state
    const playOrPauseImgUrl = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const playOrPauseAltText = isRunning ? 'pause icon' : 'play icon'
    const formattedTime = `${elapsedMinutes}:${elapsedSeconds.toString().padStart(2, '0')}`
    return (
      <div className="app-container">
        <div className="digital-timer-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="timer-container">
            <div className="timer-bg-container">
              <img
                className="bg-image"
                src="https://assets.ccbp.in/frontend/react-js/digital-timer-elapsed-bg.png"
                alt="bg"
              />
              <div className="timer-display-container">
                <h1 className="timer-display">{formattedTime}</h1>
                <p className="running-status-text">{isRunning ? 'Running' : 'Paused'}</p>
              </div>
            </div>
            <div className="timer-controls-container">
              <div className="play-reset-container">
                <div className="control-container">
                  <button
                    type="button"
                    className="play-pause-reset-button"
                    onClick={this.onClickPlayPauseBtn}
                  >
                    <img
                      className="play-pause-reset-img"
                      src={playOrPauseImgUrl}
                      alt={playOrPauseAltText}
                    />
                    {isRunning ? 'Pause' : 'Start'}
                  </button>
                </div>
                <div className="control-container">
                  <button type="button" className="play-pause-reset-button" onClick={this.resetTimer}>
                    <img
                      className="play-pause-reset-img"
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                    />
                    Reset
                  </button>
                </div>
              </div>
              <p className="set-timer-limit-text">Set Timer Limit</p>
              <div className="timer-limit-container">
                <button
                  type="button"
                  className="plus-minus-btn"
                  onClick={this.onClickMinus}
                >
                  <p className="incre-decre-sign">-</p>
                </button>
                <p className="timer-limit-num">{initialTimer}</p>
                <button
                  type="button"
                  className="plus-minus-btn"
                  onClick={this.onClickPlus}
                >
                  <p className="incre-decre-sign">+</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
