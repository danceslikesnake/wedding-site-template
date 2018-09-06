import React, {Component} from 'react';
import QRCode from 'qrcode.react';

import StepHeader from '../StepHeader/StepHeader';

import './FullDetails.css';

class FullDetails extends Component {
  render() {
    return (
      <div id="FullDetails">
        <StepHeader/>
        <div className="divider" />
        <div className="columns qr-code-and-confirmation">
          <div className="column is-one-fifth">
            <div className="qr-code">
              <QRCode value="http://facebook.github.io/react/" width={'100%'} />
            </div>
          </div>
          <div className="column is-four-fifths">
            <h2>Thank you for your RSVP</h2>
            <p className="confirmation-number">Your Confirmation number is <strong>8ykjhas</strong></p>
          </div>
        </div>
        <div className="divider" />
        <div className="guests-attending">
          <div className="final-details-label">ATTENDING</div>
          <div className="columns">
            <div className="column">
              <p><strong>Guest 1 Name</strong></p>
              <p>Type of Meal</p>
            </div>
            <div className="column">
              <p><strong>Guest 2 Name</strong></p>
              <p>Type of Meal</p>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div className="columns">
          <div className="column">
            <div className="final-details-label">LOCATION</div>
            <div className="map-wrapper">
              <div className="mapouter">
                <div className="gmap_canvas">
                  <iframe width="100%" height="224" id="gmap_canvas" src={this.props.mapUrl} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="final-details-label">OPTIONS</div>
          </div>
        </div>
      </div>
    );
  }
}

export default FullDetails;