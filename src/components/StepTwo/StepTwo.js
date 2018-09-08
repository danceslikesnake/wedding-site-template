import React, {Component} from 'react';

import StepHeader from '../StepHeader/StepHeader';
import StepLabels from '../StepLabels/StepLabels';
import TextField from "../ui/TextField/TextField";

import './StepTwo.css';

class StepTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guestOne: {
        firstName: '',
        lastName: '',
        availability: '',
        meal: ''
      },
      guestTwo: {
        firstName: '',
        lastName: '',
        availability: '',
        meal: ''
      }
    }
  }

  handleInputs = (guest, attribute, value) => {
    let temp = this.state[guest];
    temp[attribute] = value;

    if(guest === 'guestOne')
      this.setState({guestOne: temp});
    if(guest === 'guestTwo')
      this.setState({guestTwo: temp});
  };

  render() {
    return (
      <div id="StepTwo">
        <StepHeader/>
        <div className="divider" />
        <StepLabels stepName={'Details'} />
        <div className="guest-label"><i className="fas fa-user"></i> Details for Guest 1</div>
        <div className="columns">
          <div className="column">
            <TextField
              label={'First Name'}
              additionalClasses="full-width-input"
              onChangeText={(value) => {
                this.handleInputs('guestOne', 'firstName', value);
              }}
            />
          </div>
          <div className="column">
            <TextField
              label={'Last Name'}
              additionalClasses="full-width-input"
              onChangeText={(value) => {
                this.handleInputs('guestOne', 'lastName', value);
              }}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="selectBox">
              <select onChange={(event) => {
                this.handleInputs('guestOne', 'availability', event.target.value);
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
                this.handleInputs('guestOne', 'meal', event.target.value);
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
        {this.props.numberAttending === 2 &&
          <div>
            <div className="divider" />
            <div className="guest-label"><i className="fas fa-user"></i> Details for Guest 2</div>
            <div className="columns">
              <div className="column">
                <TextField
                  label={'First Name'}
                  additionalClasses="full-width-input"
                  onChangeText={(value) => {
                    this.handleInputs('guestTwo', 'firstName', value);
                  }}
                />
              </div>
              <div className="column">
                <TextField
                  label={'Last Name'}
                  additionalClasses="full-width-input"
                  onChangeText={(value) => {
                    this.handleInputs('guestTwo', 'lastName', value);
                  }}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="selectBox">
                  <select onChange={(event) => {
                    this.handleInputs('guestTwo', 'availability', event.target.value);
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
                    this.handleInputs('guestTwo', 'meal', event.target.value);
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
          </div>
        }
        <div className="has-text-right">
          <button className="call-to-action" onClick={() => {
            let pass = true;
            let guestOne = this.state.guestOne;

            for(let key in guestOne) {
              if(guestOne[key] === '')
                pass = false;
            }

            if(this.props.numberAttending === 2) {
              let guestTwo = this.state.guestTwo;

              for(let key2 in guestTwo) {
                if(guestTwo[key2] === '')
                  pass = false;
              }
            }

            if (pass)
              this.props.callToAction(this.state);
          }}>Continue</button>
        </div>
      </div>
    );
  }
}

export default StepTwo;