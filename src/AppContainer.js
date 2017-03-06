import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchData, goToPage, submitResponse, prevQuestion, nextQuestion } from './actions'

import './styles/App.css';

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
    questions: state.questions,
    categories: state.categories,
    candidates: state.candidates,
    races: state.races,

    currentQuestion: state.currentQuestion,
    results: {
      raw_scores: state.raw_scores,
      responses: state.responses
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => {
      dispatch(fetchData(url))
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
