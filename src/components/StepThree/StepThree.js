import React, {Component} from 'react';

import StepHeader from '../StepHeader/StepHeader';
import StepLabels from '../StepLabels/StepLabels';

import './StepThree.css';

class StepThree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      additionalNotes: ''
    }
  }

  render() {
    return (
      <div id="StepThree">
        <StepHeader />
        <div className="divider" />
        <StepLabels stepName={'Notes'} />
        <div>
          <textarea className="textarea" onChange={(event) => {this.setState({additionalNotes: event.target.value})}}></textarea>
          <label className="textarea-label">Would you like to include a note?</label>
        </div>
        <div className="has-text-right">
          <button className="call-to-action" onClick={() => {this.props.callToAction(this.state.additionalNotes);}}>Finish</button>
        </div>
      </div>
    );
  }
}

export default StepThree;