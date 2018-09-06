import React, {Component} from 'react';

import StepHeader from '../StepHeader/StepHeader';

import './StepThree.css';

class StepThree extends Component {
  render() {
    return (
      <div id="StepThree">
        <StepHeader />
        <div className="divider" />
        <div className="columns">
          <div className="column has-text-centered">
            <div className="step-name">Guests</div>
          </div>
          <div className="column has-text-centered add-dash">
            <div className="step-name">Details</div>
          </div>
          <div className="column has-text-centered">
            <div className="step-name active">Notes</div>
          </div>
        </div>
        <div>
          <textarea className="textarea">

          </textarea>
          <label className="textarea-label">Would you like to include a note?</label>
        </div>
        <div className="has-text-right">
          <button className="call-to-action" onClick={() => {this.props.callToAction();}}>Finish</button>
        </div>
      </div>
    );
  }
}

export default StepThree;