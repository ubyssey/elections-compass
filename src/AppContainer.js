import React, { Component } from 'react';
import { connect } from 'react-redux'

import { goToPage, submitResponse, prevQuestion, nextQuestion } from './actions'

import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className='c-ec-container'>
        <this.props.page {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.page,
    questions: state.questions,
    currentQuestion: state.currentQuestion,
    answers: state.answers,
    races: state.races
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToPage: (page) => {
      dispatch(goToPage(page))
    },
    submitResponse: (value) => {
      dispatch(submitResponse(value))
      dispatch(nextQuestion())
    },
    prevQuestion: () => {
      dispatch(prevQuestion())
    },
    nextQuestion: () => {
      dispatch(nextQuestion())
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
