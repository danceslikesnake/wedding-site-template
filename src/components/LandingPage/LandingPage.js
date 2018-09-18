import React, { Component } from 'react';

import TextField from '../ui/TextField/TextField';

import './LandingPage.css';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rsvpCode: null
    }
  }

  render() {
    return (
      <div id="LandingPage" className="has-text-centered">
        <p className="standard-text">Please Join</p>
        <h1 className="couple-name">Yichun & Jared</h1>
        <p className="standard-text">FOR THEIR WEDDING CEREMONY & RECEPTION</p>
        <h1 className="wedding-date">Friday, December 7th, 2018 @15:00</h1>
        <div className="divider" />
        <p className="standard-text">To Get Started, Please Enter Your RSVP Code</p>
        <div className="rsvp-spacer" />
        <div className="columns">
          <div className="column is-8">
            <TextField
              label={'RSVP Code'}
              onChangeText={(value) => {
                this.setState({rsvpCode: value});
              }}
            />
          </div>
          <div className="column has-text-left" style={{paddingTop: 10}}>
            <button
              className="call-to-action long-cta has-text-centered"
              onClick={() => {
                this.props.callToAction(this.state.rsvpCode);
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;