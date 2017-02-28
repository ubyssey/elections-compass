import React, { Component } from 'react';

class LandingPage extends Component {
  render() {
    return (
      <div className='c-ec-landing'>
        landing page
        <button onClick={e => this.props.goToPage('survey')}>Start</button>
      </div>
    )
  }
}

export default LandingPage;
