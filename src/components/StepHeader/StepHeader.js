import React, {Component} from 'react';

import './StepHeader.css';

class StepHeader extends Component {
  render() {
    return (
      <div className="columns">
        <div className="column">
          <div className="step-header">Yichun &amp; Jared</div>
        </div>
        <div className="column has-text-right">
          <div className="step-header">Friday, Septmeber 7th 2018</div>
        </div>
      </div>
    );
  }
}

export default StepHeader;