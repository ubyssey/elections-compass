import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchData, submitAnswers, resetSurvey, goToPage, submitResponse, prevQuestion, nextQuestion } from './actions'

class App extends Component {

  componentWillMount() {
    this.props.fetchData('https://s3-us-west-1.amazonaws.com/ubyssey/media/data/elections-compass/data.json')
  }

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

    // Data
    isLoaded: state.isLoaded,
    questions: state.questions,
    categories: state.categories,
    candidates: state.candidates,
    races: state.races,

    currentQuestion: state.currentQuestion,
    rawAnswers: state.rawAnswers,
    answers: state.answers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => {
      dispatch(fetchData(url))
    },
    submitAnswers: (formId, questions, answers) => {
      dispatch(submitAnswers(formId, questions, answers))
    },
    resetSurvey: () => {
      dispatch(resetSurvey())
    },
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
    skipQuestion: () => {
      dispatch(submitResponse(null))
      dispatch(nextQuestion())
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
