import React, {Component} from 'react';

import StepHeader from '../StepHeader/StepHeader';
import TextField from '../ui/TextField/TextField';
import SelectBox from '../ui/SelectBox/SelectBox';

import './StepOne.css';

class StepOne extends Component {
  render() {
    return (
      <div id="StepOne">
        <StepHeader />
        <div className="divider" />
        <div className="columns">
          <div className="column has-text-centered">
            <div className="step-name active">Guests</div>
          </div>
          <div className="column has-text-centered add-dash">
            <div className="step-name">Details</div>
          </div>
          <div className="column has-text-centered">
            <div className="step-name">Notes</div>
          </div>
        </div>
        <div>
          <TextField
            label={'Email Address'}
            additionalClasses="full-width-input"
            onChangeText={(value) => {
              //console.log(value);
            }}
          />
        </div>
        <div className="columns">
          <div className="column is-one-third">
            <SelectBox
              label={'Total in your party'}
              options={[
                { value: 0, text: '0' },
                { value: 1, text: '1' },
                { value: 2, text: '2' }
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

export default StepOne;