import React from 'react'

import '../styles/header.css';

import compass from '../images/compass.svg'

export default (props) => (
  <div className='c-ec-header'>
    <h2 className='c-ec-header__subheading'>2017 AMS Elections</h2>
    <h1
      className='c-ec-header__heading'
      onClick={e => props.goToPage('landing')}><img src={compass} alt="Compass" /><span>Vote Compass</span></h1>
  </div>
)
