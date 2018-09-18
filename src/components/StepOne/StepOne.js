import React, { Component } from 'react';

import StepHeader from '../StepHeader/StepHeader';
import StepLabels from '../StepLabels/StepLabels';
import TextField from '../ui/TextField/TextField';

import './StepOne.css';
import 'react-dropdown/style.css';

class StepOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailAddress: '',
      numberAttending: null
    }
  }

  renderNumberAttending = () => {
    let items = [];
    items.push(<option>Select...</option>);
    for (let i = 1; i <= this.props.numberAttending; i++) {
      items.push(<option value={i}>{i}</option>);
    }
    return items;
  }

  render() {
    return (
      <div id="StepOne">
        <StepHeader />
        <div className="divider" />
        <StepLabels stepName={'Guests'} />
        <div>
          <TextField
            label={'Email Address'}
            additionalClasses="full-width-input"
            onChangeText={(value) => {
              this.setState({ emailAddress: value });
            }}
          />
        </div>
        <div className="columns">
          <div className="column is-one-third">
            <div className="selectBox">
              <select onChange={(event) => {
                this.setState({ numberAttending: parseInt(event.target.value) });
              }}>
              {this.renderNumberAttending()}
              </select>
              <label className="select-label">Total in your party</label>
            </div>
          </div>
        </div>
        <div className="has-text-right">
          <button className="call-to-action" onClick={() => { this.props.callToAction(this.state.emailAddress, this.state.numberAttending) }}>Continue</button>
        </div>
      </div>
    );
  }
}

export default StepOne;