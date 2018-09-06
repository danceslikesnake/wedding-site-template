import React, { Component } from 'react';

import TextField from '../ui/TextField/TextField';

import './LandingPage.css';

class LandingPage extends Component {
  render() {
    return (
      <div id="LandingPage" className="has-text-centered">
        <p className="standard-text">Please Join</p>
        <h1 className="couple-name">Yichun & Jared</h1>
        <p className="standard-text">FOR THEIR WEDDING CEREMONY & RECEPTION</p>
        <h1 className="wedding-date">Friday, September 7th, 2018</h1>
        <h2 className="wedding-time">15:00</h2>
        <div className="divider" />
        <p className="standard-text">To Get Started, Please Enter Your RSVP Code</p>
        <div style={{height: 32}} />
        <div className="columns">
          <div className="column has-text-right is-7 is-offset-1">
            <TextField
              label={'RSVP Code'}
              onChangeText={(value) => {
                //console.log(value);
              }}
            />
          </div>
          <div className="column has-text-left is-4" style={{paddingTop: 10}}>
            <button className="call-to-action" onClick={() => {this.props.callToAction();}}>Get Started</button>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;