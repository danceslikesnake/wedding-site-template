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
                <option value="Accept with Pleasure">Accept with Pleasure</option>
                <option value="Regretfully Declines">Regretfully Declines</option>
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
                <option value="Omnivores">Omnivores</option>
                <option value="Herbivores">Vegetarian</option>
              </select>
              <label className="select-label">Meal</label>
            </div>
          </div>
          <div className="column">
          <div className="selectBox">
            <select onChange={(event) => {
              this.handleInputs(guest, 'shuttleService', event.target.value);
            }}>
              <option>Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <label className="select-label">Shuttle Service To The Venue</label>
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