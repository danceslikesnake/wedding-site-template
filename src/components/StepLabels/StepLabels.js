import React, {Component} from 'react';

import './StepLabels.css';

const steps = ['Guests', 'Details', "Notes"];
class StepLabels extends Component {
  render() {
    const indexOfStep = steps.indexOf(this.props.stepName) +  1;
    return (
      <div id="StepLabels">
        <div className="columns is-hidden-mobile">
          {steps.map((step, idx) => (
            <div key={idx} className={idx === 1 ? 'column has-text-centered add-dash' : 'column has-text-centered'}>
              <div className={this.props.stepName === step ? 'step-name active' : 'step-name'}>{step}</div>
            </div>
          ))}
        </div>
        <div className="columns is-flex-mobile is-hidden-tablet">
          <div className="column is-half-mobile"><span className="step-name">{indexOfStep}/3</span></div>
          <div className="column has-text-right is-half-mobile"><span className="step-name active">{this.props.stepName}</span></div>
        </div>
        <div style={{marginTop: -8}} className="divider is-invisible-tablet" />
        <div style={{height: 8}} className="is-invisible-tablet" />
      </div>
    );
  }
}

export default StepLabels;