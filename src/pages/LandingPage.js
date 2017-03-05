import React, { Component } from 'react';

class LandingPage extends Component {
  render() {
    return (
  			
      <div className='c-ec-landing'>
        	<div className='landing-container'> 
        		<div  className='landing-text-container'>
	        		<div id='landing-topline-text'><h2>2017 AMS ELECTIONS</h2></div> 
	         		<div id='landing-middleline-text'><h1>VOTE COMPASS</h1></div>     		
	           		<div id='landing-lastline-text'>Not sure who to vote for? Let us help you out!</div>
       				<button id='call-to-quiz-button' onClick={e => this.props.goToPage('survey')}>START THE SURVEY</button></div>
        		<div id="landing-footer"> Produced by your friends at <i>The Ubyssey</i></div>
           	</div>
     	</div>

    )
  }
}

export default LandingPage;

///}

