import React, { Component } from 'react';
import './Timer.css';
import { FormattedMessage } from 'react-intl';

import TimerBox from '../../components/TimerBox/TimerBox';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
        secondsLeft: '0',
        minutesLeft: '0',
        hoursLeft: '0',
        daysLeft: '0'
    };

    this.countDownDate = new Date("Mar 19, 2019").getTime();
  }

  handleCounting(){
    const dateNow = new Date().getTime();
    const distance = this.countDownDate - dateNow;

    if (distance <= 0) {
      this.stopCounter();
      return false;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.setState({ 
      secondsLeft: seconds,
      minutesLeft: minutes,
      hoursLeft: hours,
      daysLeft: days
    });
  }

  formatNumber(number) {
    let formatted = String(number);
    formatted = formatted.length < 2 ? '0' + formatted : formatted;
    return formatted;
  }

  stopCounter() {
    clearInterval(this.counter);
  }

  componentDidMount() {
    this.counter = setInterval(() => {
      this.handleCounting();
    }, 1000);
  }

  componentWillUnmount() {
    this.stopCounter();
  }
  
  render() {
    const state = this.state

    return (
      <div className="container timer-container">
        <div className="timer-label">
          <FormattedMessage
           id="timer.label"
           defaultMessage="Starts in" />
        </div> 
        <TimerBox 
          timeLeft={state.daysLeft} 
          boxLabel={
            <FormattedMessage id="timer.box.label.days" defaultMessage="Days" />
          } />
        <TimerBox 
          timeLeft={this.formatNumber(state.hoursLeft)} 
          boxLabel={
            <FormattedMessage id="timer.box.label.hours" defaultMessage="Hours" />
          } />
        <TimerBox 
          timeLeft={this.formatNumber(state.minutesLeft)} 
          boxLabel={
            <FormattedMessage id="timer.box.label.minutes" defaultMessage="Minutes" />
          } />
        <TimerBox 
          timeLeft={this.formatNumber(state.secondsLeft)} 
          boxLabel={
            <FormattedMessage id="timer.box.label.seconds" defaultMessage="Seconds" />
          } />
      </div>
    );
  }
}
 
export default Timer;
