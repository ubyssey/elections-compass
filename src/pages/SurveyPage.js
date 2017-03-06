import React, { Component } from 'react';

import Header from '../components/Header'

import '../styles/survey.css';

const SurveyQuestion = (props) => (
  <div className='c-ec-survey__question'><div>{props.question.body}</div></div>
)

const SurveyResponse = (props) => (
  <div className='c-ec-survey__response'>
    <div className='c-ec-survey__response__option c-ec-survey__response__option--1'>
      <button onClick={e => props.submitResponse(1)}>Strongly Disagree</button>
    </div>
    <div className='c-ec-survey__response__option c-ec-survey__response__option--2'>
      <button onClick={e => props.submitResponse(2)}>Somewhat Disagree</button>
    </div>
    <div className='c-ec-survey__response__option c-ec-survey__response__option--3'>
      <button onClick={e => props.submitResponse(3)}>Neutral</button>
    </div>
    <div className='c-ec-survey__response__option c-ec-survey__response__option--4'>
      <button onClick={e => props.submitResponse(4)}>Somewhat Agree</button>
    </div>
    <div className='c-ec-survey__response__option c-ec-survey__response__option--5'>
      <button onClick={e => props.submitResponse(5)}>Strongly Agree</button>
    </div>
  </div>
)

const SurveyProgress = (props) => (
  <div className='c-ec-survey__progress'>
    <div className='c-ec-survey__progress__previous'
      onClick={e => props.prevQuestion()}>Previous</div>
    <div className='c-ec-survey__progress__list'>
    {
      props.questions.map((question, i) => (
        <div className={`c-ec-survey__progress__item${i === props.index ? ' c-ec-survey__progress__item--active' : ''}`} key={i}>{i + 1}</div>
      ))
    }
    </div>
    <div className='c-ec-survey__progress__skip'
        onClick={e => props.nextQuestion()}>Skip</div>
  </div>
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
