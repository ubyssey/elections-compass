import React from 'react'

import '../styles/spinner.css';

export default function Spinner(props) {
  return (
    <div className='c-spinner'>
      <div className='c-spinner__double-bounce1'></div>
      <div className='c-spinner__double-bounce2'></div>
    </div>
  )
}
