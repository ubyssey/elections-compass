import React from 'react'

import compass from '../images/compass.svg'

export default (props) => (
  <div className='c-ec-header'>
    <h2 className='c-ec-header__subheading'>2017 AMS Elections</h2>
    <h1 className='c-ec-header__heading'><img src={compass} alt="Compass" /><span>Vote Compass</span></h1>
  </div>
)
