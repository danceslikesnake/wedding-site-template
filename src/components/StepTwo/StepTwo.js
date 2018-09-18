import React, { Component } from 'react';

import StepHeader from '../StepHeader/StepHeader';
import StepLabels from '../StepLabels/StepLabels';
import TextField from "../ui/TextField/TextField";
import _ from 'lodash';

import './StepTwo.css';

class StepTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: []
    }
  }

  handleInputs = (guest, attribute, value) => {
    let temp = this.state.guests[guest] || {}
    temp[attribute] = value;
    let guests = this.state.guests;
    guests[guest] = temp;
    this.setState({ guests });
  };

  renderGuestControl = (guest, index) => {
    if (!guest && guest != 0) {
      return (<div></div>);
    }
    return (
      <div>
        <div className="divider" />
        <div className="guest-label"><i className="fas fa-user"></i> Details for Guest {guest + 1}</div>
        <div className="columns">
          <div className="column">
            <TextField
              label={'First Name'}
              additionalClasses="full-width-input"
              onChangeText={(value) => {
                this.handleInputs(guest, 'firstName', value);
              }}
            />
          </div>
          <div className="column">
            <TextField
              label={'Last Name'}
              additionalClasses="full-width-input"
              onChangeText={(value) => {
                this.handleInputs(guest, 'lastName', value);
              }}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="selectBox">
              <select onChange={(event) => {
                this.handleInputs(guest, 'availability', event.target.value);
              }}>
                <option>Select...</option>
                <option value="Can Make It">Can make it</option>
                <option value="Can't Make It">Can't make it</option>
              </select>
              <label className="select-label">Availability</label>
            </div>
          </div>
          <div className="column">
            <div className="selectBox">
              <select onChange={(event) => {
                this.handleInputs(guest, 'meal', event.target.value);
              }}>
                <option>Select...</option>
                <option value="Meat">Meat</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
              </select>
              <label className="select-label">Meal</label>
            </div>
          </div>
        </div>
      </div>)
  }

  render() {
    return (
      <div id="StepTwo">
        <StepHeader />
        <div className="divider" />
        <StepLabels stepName={'Details'} />
        {
          _.map(_.times(this.props.numberAttending), x => this.renderGuestControl(x))}
        <div className="has-text-right">
          <button className="call-to-action" onClick={() => {
            let pass = true;

            if (pass)
              this.props.callToAction(this.state);
          }}>Continue</button>
        </div>
      </div>
    );
  }
}

export default StepTwo;