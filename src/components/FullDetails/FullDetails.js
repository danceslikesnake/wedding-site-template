import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import AddToCalendar from 'react-add-to-calendar';
import _ from 'lodash';

import StepHeader from '../StepHeader/StepHeader';

import './FullDetails.css';
import 'react-add-to-calendar/dist/react-add-to-calendar.min.css';

import AirbnbIcon from '../../utils/images/airbnb-icon.png';

const event = {
  title: 'Yichun & Jared\'s Wedding',
  description: 'This is the sample event provided as an example only',
  location: 'Port Elizabeth, SA',
  startTime: '2018-09-07T17:00:00-00:00',
  endTime: '2018-09-07T17:00:00-00:00'
};

class FullDetails extends Component {

  addBookmark = (url, title) => {
    if (!url) { url = window.location }
    if (!title) { title = document.title }
    var browser = navigator.userAgent.toLowerCase();
    if (window.sidebar) { // Mozilla, Firefox, Netscape
      window.sidebar.addPanel(title, url, "");
    } else if (window.external) { // IE or chrome
      if (browser.indexOf('chrome') === -1) { // ie
        window.external.AddFavorite(url, title);
      } else { // chrome
        alert('Please Press CTRL+D (or Command+D for macs) to bookmark this page');
      }
    }
    else if (window.opera && window.print) { // Opera - automatically adds to sidebar if rel=sidebar in the tag
      return true;
    }
    else if (browser.indexOf('konqueror') !== -1) { // Konqueror
      alert('Please press CTRL+B to bookmark this page.');
    }
    else if (browser.indexOf('webkit') !== -1) { // safari
      alert('Please press CTRL+B (or Command+D for macs) to bookmark this page.');
    } else {
      alert('Your browser cannot add bookmarks using this link. Please add this link manually.')
    }
  };

  renderGuestDetails = (guest) => {
    return (
      <div className="columns">
        <div className="column">
          <p><strong>{guest.firstName + ' ' + guest.lastName}</strong></p>
          <p>{'Meal Preference: ' + guest.meal}</p>
          <p>{'Availability: ' + guest.availability}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="FullDetails">
        <StepHeader />
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
          <div className="final-details-label">Guest Details</div>
          {_.map(this.props.guests, x => this.renderGuestDetails(x))}
          {this.props.additionalNotes !== '' &&
            <p className="additional-notes">{this.props.additionalNotes}</p>
          }
        </div>
        <div className="divider" />
        <div className="columns">
          <div className="column">
            <div className="final-details-label">LOCATION</div>
            <div className="map-wrapper">
              <div className="mapouter">
                <div className="gmap_canvas">
                  <iframe title="Location Map" width="100%" height="224" id="gmap_canvas" src={this.props.mapUrl} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="final-details-label">OPTIONS</div>
            <button className="call-to-action long-cta" style={{ display: 'block' }}
              onClick={() => {this.props.stepManager(2)}}>
              <i className="fas fa-envelope-open-text"></i> Change RSVP</button>
            <a href="#!" className="call-to-action-hollow" onClick={() => {
              this.addBookmark('https://yichunjaredweds.com/', 'Yichun and Jared Ties the Knot');
              return false;
            }}>
              <i className="fas fa-bookmark"></i> Bookmark Confirmation
            </a>
            <a rel="noopener noreferrer" href="https://www.airbnb.com/s/Lake-de-la-vie--Kragga-Kamma-Road--Port-Elizabeth--South-Africa/homes?refinement_paths%5B%5D=%2Fhomes&query=Lake%20de%20la%20vie%2C%20Kragga%20Kamma%20Road%2C%20Port%20Elizabeth%2C%20South%20Africa&place_id=ChIJAwLuUKPbeh4RCgtILFk190A&allow_override%5B%5D=&s_tag=V_N2UZ35" target="_blank" className="call-to-action-hollow"><img width="16" height="16" alt="airbnb logo" src={AirbnbIcon} className="airbnb-icon" /> Book Airbnb Nearby</a>
            <div className="add-to-calendar-btn">
              <AddToCalendar event={event} buttonTemplate={{ 'calendar-plus-o': 'left' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FullDetails;