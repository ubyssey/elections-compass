import React, { Component } from 'react';

import Header from '../components/Header'

const SurveyQuestion = (props) => (
  <div className='c-ec-survey__question'>{props.question.body}</div>
)

const SurveyResponse = (props) => (
  <div className='c-ec-survey__response'>
    <button
      className='c-ec-survey__response__option c-ec-survey__response__option--1'
      onClick={e => props.submitResponse(1)}>Strongly Disagree</button>
    <button
      className='c-ec-survey__response__option c-ec-survey__response__option--2'
      onClick={e => props.submitResponse(2)}>Somewhat Disagree</button>
    <button
      className='c-ec-survey__response__option c-ec-survey__response__option--3'
      onClick={e => props.submitResponse(3)}>Neutral</button>
    <button
      className='c-ec-survey__response__option c-ec-survey__response__option--4'
      onClick={e => props.submitResponse(4)}>Somewhat Agree</button>
    <button
      className='c-ec-survey__response__option c-ec-survey__response__option--5'
      onClick={e => props.submitResponse(5)}>Strongly Agree</button>
  </div>
)

const SurveyProgress = (props) => (
  <ul className='c-ec-survey__progress'>
      <li className='c-ec-survey__progress__previous'
        onClick={e => props.prevQuestion()}>Previous</li>
    {
      props.questions.map((question, i) => (
        <li className={`c-ec-survey__progress${i === props.index ? ' c-ec-survey__progress--active' : ''}`} key={i}>{i + 1}</li>
      ))
    }
    <li className='c-ec-survey__progress__skip'
        onClick={e => props.nextQuestion()}>Skip</li>
  </ul>
)

class SurveyPage extends Component {
  render() {

    const question = this.props.questions[this.props.currentQuestion]

    return (
      <div>
        <Header />
        <SurveyQuestion question={question} />
        <SurveyResponse submitResponse={i => this.props.submitResponse(i)} />
        <SurveyProgress
          index={this.props.currentQuestion}
          questions={this.props.questions}
          prevQuestion={this.props.prevQuestion}
          nextQuestion={this.props.nextQuestion} />
      </div>
    );
  }
}

export default SurveyPage
