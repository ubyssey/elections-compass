import React, { Component } from 'react';

import '../styles/landing.css';

import compass from '../images/compass.svg'

class LandingPage extends Component {
  render() {
    return (
      <div className='c-ec-landing'>
      	<div className='landing-container'>
    		<div className='landing-text-container'>
      		<h2 className='c-ec-landing__subheading'>2017 AMS Elections</h2>
       		<h1 className='c-ec-landing__heading'><img src={compass} alt="Compass" /><span>Vote Compass</span></h1>
       		<div className='c-ec-landing__blurb'>Not sure who to vote for? Let us help you out!</div>
   				<button
            className='c-ec-landing__start'
            onClick={e => this.props.goToPage('survey')}>Start the survey</button>
        </div>
    		<div id="landing-footer"> Produced by your friends at <i>The Ubyssey</i></div>
       	</div>
     	</div>
    )
  }
}

export default LandingPage;

///}
