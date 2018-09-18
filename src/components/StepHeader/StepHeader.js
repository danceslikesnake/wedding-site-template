import React, {Component} from 'react';

import './StepHeader.css';

class StepHeader extends Component {
  render() {
    return (
      <div id="StepHeader" className="columns">
        <div className="column has-text-centered-mobile">
          <div className="step-header bold-on-mobile">Yichun &amp; Jared</div>
        </div>
        <div className="column has-text-right has-text-centered-mobile">
          <div className="step-header">Friday, December 7th 2018</div>
        </div>
      </div>
    );
  }
}

export default StepHeader;