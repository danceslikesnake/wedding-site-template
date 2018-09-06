import React, {Component} from 'react';

import './DetailDrawer.css';

class DetailDrawer extends Component {

  renderList = (list) => {
    return(
      <ul>
        {list.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <div id="DetailDrawer" style={this.props.revealDrawer ? {right: 0} : {right: -400}}>
        <div className="detail-wrapper">
          <div className="wedding-date has-text-centered">FRIDAY, SEPTEMBER 7, 2018 @ 15:00</div>
          <div className="detail-header">Schedule</div>
          <ul className="schedule">
            {this.props.schedule.map((event, idx) => (
              <li key={idx} className="schedule-row clearfix">
                <span className="time">{event.time}</span>
                <span className="description">{event.description}</span>
              </li>
            ))}
          </ul>
          <div className="detail-header">Details</div>
          <div className="detail-list">
            {this.props.details.map((deet, idx) => {
              return(
                <div key={idx}>
                  <p className="detail-p">{deet.detail}</p>
                  {deet.list ? this.renderList(deet.list) : null}
                </div>
              );
            })}
          </div>
          <div className="detail-header">Location</div>
          <div className="map-wrapper">
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe width="100%" height="224" id="gmap_canvas" src={this.props.mapUrl} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailDrawer;