import React, { Component } from 'react';

import '../styles/landing.css';

const compass = 'https://s3-us-west-1.amazonaws.com/ubyssey/static/images/compass.svg'

import Spinner from '../components/Spinner'

class LandingPage extends Component {

  componentWillMount() {
    this.props.resetSurvey()
  }

  renderStart() {
    return (
      <button
        className='c-ec-landing__start'
        onClick={e => this.props.goToPage('survey')}>
        Start the survey
      </button>
    )
  }

  renderLoading() {
    return (
      <button
        className='c-ec-landing__start c-ec-landing__start--loading'>
        <span>Loading</span>
        <Spinner />
      </button>
    )
  }

  render() {
    return (
      <div className='c-ec-landing'>
      	<div className='landing-container'>
      		<div className='landing-text-container'>
        		<h2 className='c-ec-landing__subheading'>2018 AMS Elections</h2>
         		<h1 className='c-ec-landing__heading'><img src={compass} alt="Compass" /><span>Elections Compass</span></h1>
         		<div className='c-ec-landing__blurb'>Not sure who to vote for? Let us help you out!</div>
            <div className='c-ec-landing__button'>
     				   {this.props.isLoaded ? this.renderStart() : this.renderLoading()}
            </div>
          </div>
       	</div>
     	</div>
    )
  }
}

export default LandingPage;

///}
