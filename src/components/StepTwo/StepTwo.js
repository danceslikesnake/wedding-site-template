import React, {Component} from 'react';

import StepHeader from '../StepHeader/StepHeader';
import TextField from "../ui/TextField/TextField";
import SelectBox from "../ui/SelectBox/SelectBox";

import './StepTwo.css';

class StepTwo extends Component {
  render() {
    return (
      <div id="StepTwo">
        <StepHeader/>
        <div className="divider" />
        <div className="columns">
          <div className="column has-text-centered">
            <div className="step-name">Guests</div>
          </div>
          <div className="column has-text-centered add-dash">
            <div className="step-name active">Details</div>
          </div>
          <div className="column has-text-centered">
            <div className="step-name">Notes</div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <TextField
              label={'First Name'}
              additionalClasses="full-width-input"
              onChangeText={(value) => {
                //console.log(value);
              }}
            />
          </div>
          <div className="column">
            <TextField
              label={'Last Name'}
              additionalClasses="full-width-input"
              onChangeText={(value) => {
                //console.log(value);
              }}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <SelectBox
              label={'Availability'}
              options={[
                { value: 'yes', text: 'Can make it' },
                { value: 'no', text: 'Can\'t make it' },
              ]}
              noSelectionLabel="Select..."
              onSelect={(option) => {
                console.log(option)
              }}
            />
          </div>
          <div className="column">
            <SelectBox
              label={'Meal'}
              options={[
                { value: 'meat', text: 'Meat' },
                { value: 'vegetarian', text: 'Vegetarian' },
                { value: 'vegan', text: 'Vegan' }
              ]}
              noSelectionLabel="Select..."
              onSelect={(option) => {
                console.log(option)
              }}
            />
          </div>
        </div>
        <div className="has-text-right">
          <button className="call-to-action" onClick={() => {this.props.callToAction();}}>Continue</button>
        </div>
      </div>
    );
  }
}

export default StepTwo;