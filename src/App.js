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
import ReactGA from 'react-ga';

// css
import './utils/styles/boilerplate.css';

// images
import backgroundImg from './utils/images/OGDRWX0.jpg';
import _ from 'lodash';
ReactGA.initialize('UA-126489005-1');
ReactGA.pageview(window.location.pathname + window.location.search);

// variables
const mapUrl = 'https://maps.google.com/maps?q=lake%20de%20la%20vie&t=&z=13&ie=UTF8&iwloc=&output=embed';
const schedule = [
  {
    time: '14:45',
    description: 'Seating For Ceremony Begins'
  },
  {
    time: '15:00',
    description: 'Ceremony'
  },
  {
    time: '15:45',
    description: 'Photos'
  },
  {
    time: '16:30',
    description: 'Welcome Drinks'
  },
  {
    time: '18:00',
    description: 'Reception'
  },
  {
    time: '20:30',
    description: 'Celebrations Starts'
  },
  {
    time: '23:30',
    description: 'Last Call / Carriages'
  }

];
const details = [
  { detail: 'Please RSVP By 31 October' },
  {
    detail: 'Transportion',
    list: [
      'Transportion can be arranged to and from Lake de la Vie.',
      'Shuttle will depart from pickup point 14:00 an 14:30.',
      'The shuttle will make return trips every hour after 21:00.',
      'The Final trip will be at 23:30'
    ]
  },
  { detail: 'Pickup Point: Kings Court Parking Lot' },
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

  componentDidMount(){
    if(this.props.match && this.props.match.params && this.props.match.params.rsvpCode){
      this.getRspv(this.props.match.params.rsvpCode);
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
      if(!invitationDetails){
        return;
      }
      if (_.isEmpty(invitationDetails.guests)) {
        if (invitationDetails && invitationDetails.party) {
          this.setState({ numberAttending: invitationDetails.party },
            () => this.stepManager(1));
        }
      }
      else {
        this.setState({
          numberAttending: invitationDetails.party,
          emailAddress: invitationDetails.email,
          guests: invitationDetails.guests,
          additionalNotes: invitationDetails.customNote,
          rsvpCode: invitationDetails.rsvpCode
        },
          () =>{ 
            ReactGA.event({
              category: 'User',
              action: 'ALREADY_RSVPED',
            });
            ReactGA.set({ rsvpCode: invitationDetails.rsvpCode });
            ReactGA.event({
              category: 'User',
              action: 'ENTERED_RSVP_CODE',
              value: invitationDetails.rsvpCode
            });
            ReactGA.pageview('/fullDetails');
            this.stepManager(4);})
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
                ReactGA.set({ rsvpCode: rsvpCode });
                ReactGA.event({
                  category: 'User',
                  action: 'ENTERED_RSVP_CODE',
                  value: rsvpCode
                });
                ReactGA.pageview('/emailAddress');
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
                ReactGA.event({
                  category: 'User',
                  action: 'ENTERED_EMAIL_ADDRESS',
                  value: emailAddress
                });
                ReactGA.set({ emailAddress });
                ReactGA.pageview('/guests');
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
              ReactGA.event({
                category: 'User',
                action: 'FINISHED_GUESTS_ENTERING',
              });
              ReactGA.pageview('/additionalNotes');
            }}
          />
        );
      case 3:
        return (
          <StepThree
            callToAction={(additionalNotes) => {
              this.setState({ additionalNotes: additionalNotes }, () => {
                RsvpService.updateInvitation(this.state).then(result => {
                  ReactGA.event({
                    category: 'User',
                    action: 'INVITATION_UPDATED',
                  });
                  ReactGA.pageview('/fullDetails');
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
            rsvpCode={this.state.rsvpCode}
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