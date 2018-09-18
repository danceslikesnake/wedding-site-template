import React, { Component } from 'react';

// components
import LandingPage from './components/LandingPage/LandingPage';
import StepOne from './components/StepOne/StepOne';
import StepTwo from './components/StepTwo/StepTwo';
import StepThree from './components/StepThree/StepThree';
import DetailDrawer from './components/DetailDrawer/DetailDrawer';
import FullDetails from './components/FullDetails/FullDetails';
import * as RsvpService from './services/RsvpService';
import validator from 'validator';

// css
import './utils/styles/boilerplate.css';

// images
import backgroundImg from './utils/images/4619.jpg';
import _ from 'lodash';

// variables
const mapUrl = 'https://maps.google.com/maps?q=lake%20de%20la%20vie&t=&z=13&ie=UTF8&iwloc=&output=embed';
const schedule = [
  {
    time: '15:00',
    description: 'This is the first rad thing.'
  },
  {
    time: '15:45',
    description: 'This is the second awesome thing.'
  },
  {
    time: '19:00',
    description: 'Finally, the main event has arrived and everything cool happens.'
  }
];
const details = [
  { detail: 'You must do this' },
  { detail: 'Guests must also do this' },
  {
    detail: 'If i were you, I\'d probably end up doing quite of few of these other things too',
    list: [
      'first thing',
      'second thing',
      'third thing'
    ]
  },
  { detail: 'Finally, brush your teeth' },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      revealDrawer: false,
      rsvpCode: '',
      emailAddress: '',
      numberAttending: null,
      additionalNotes: '',
      guests: []
    }
  }

  stepManager = (step) => {
    this.setState({
      step: step
    });
  };

  getRspv = (rsvpCode) => {
    this.setState({ rsvpCode: rsvpCode });
    RsvpService.getInvitation(rsvpCode).then(invitationDetails => {

      if (_.isEmpty(invitationDetails.guests)) {
        if (invitationDetails && invitationDetails.party) {
          this.setState({ numberAttending: invitationDetails.party },
            () => this.stepManager(1));
        }
      }
      else{
        this.setState({
          numberAttending: invitationDetails.party,
          emailAddress: invitationDetails.email,
          guests: invitationDetails.guests,
          additionalNotes: invitationDetails.customNote,
          rsvpCode: invitationDetails.rsvpCode,
          revealDrawer: true
        },
        () => this.stepManager(4))
      }
    });
  }

  renderStep = () => {
    switch (this.state.step) {
      case 0:
      default:
        return (
          <LandingPage
            callToAction={(rsvpCode) => {
              if (rsvpCode) {
                this.getRspv(rsvpCode)
              }
            }}
          />
        );
      case 1:
        return (
          <StepOne
            numberAttending={this.state.numberAttending}
            callToAction={(emailAddress, numberAttending) => {
              if (emailAddress !== '' && validator.isEmail(emailAddress) && numberAttending) {
                this.setState({ emailAddress: emailAddress, numberAttending: numberAttending });
                this.stepManager(2);
              }
            }}
          />
        );
      case 2:
        return (
          <StepTwo
            numberAttending={this.state.numberAttending}
            guests={this.state.guests}
            callToAction={(guestsAttending) => {
              if (guestsAttending) {
                this.setState(guestsAttending);
              }
              this.stepManager(3);
            }}
          />
        );
      case 3:
        return (
          <StepThree
            callToAction={(additionalNotes) => {
              this.setState({ additionalNotes: additionalNotes }, () => {
                RsvpService.updateInvitation(this.state).then(result => {
                  this.stepManager(4);
                }).catch(error => { console.log(error) })
              });
            }}
          />
        );
      case 4:
        return (
          <FullDetails
           stepManager={this.stepManager}
            mapUrl={mapUrl}
            guests={this.state.guests}
            additionalNotes={this.state.additionalNotes}
          />
        );
    }
  };

  render() {
    return (
      <div>
        <div className="detail-drawer-button is-hidden-mobile" style={this.state.revealDrawer ? { right: 320 } : { right: -80 }} onClick={() => { this.setState({ revealDrawer: !this.state.revealDrawer }) }}>Schedule &amp; Details</div>
        <div className="detail-drawer-button-mobile is-invisible-tablet" style={this.state.revealDrawer ? { bottom: '95%' } : { bottom: 0 }} onClick={() => { this.setState({ revealDrawer: !this.state.revealDrawer }) }}>Schedule &amp; Details</div>
        <section className="hero is-fullheight mainBG" style={{ backgroundImage: 'url(' + backgroundImg + ')' }}>
          <div className="mainBG-overlay" />
          <div className="hero-body" style={{ zIndex: 2 }}>
            <div className="container">
              <div className="columns">
                <div className="column is-8-desktop is-offset-2-desktop">
                  <div className="main-content-wrapper">
                    {this.renderStep()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DetailDrawer
            revealDrawer={this.state.revealDrawer}
            mapUrl={mapUrl}
            schedule={schedule}
            details={details}
          />
        </section>
      </div>
    );
  }
}

export default App;