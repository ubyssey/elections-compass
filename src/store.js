import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import * as types from './actionTypes'

import LandingPage from './pages/LandingPage'
import SurveyPage from './pages/SurveyPage'
import ResultsPage from './pages/ResultsPage'

const appPages = {
  landing: LandingPage,
  survey: SurveyPage,
  results: ResultsPage
}

const initialState = {
  page: appPages.landing,

  isLoaded: false,
  questions: [],
  categories: {},
  races: [],
  currentQuestion: 0,

  answers: {},
  rawAnswers: {}
}

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array;
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GO_TO_PAGE:
      return Object.assign({}, state, { page: appPages[action.page] })
    case types.SUBMIT_RESPONSE:
      var question = state.questions[state.currentQuestion]
      var direction = question.direction || 'up'
      var value = direction === 'down' ? 4-action.value : action.value
      var answers = state.answers
      var rawAnswers = state.rawAnswers
      if (action.value == null) {
        value = null
      }
      rawAnswers[question.id] = action.value
      answers[question.id] = value
      return Object.assign({}, state, { rawAnswers: rawAnswers, answers: answers })
    case types.RESET_SURVEY:
      return Object.assign({}, state, {
        rawAnswers: {},
        answers: {},
        currentQuestion: 0,
        questions: shuffle(state.questions)
      })
    case types.PREV_QUESTION:
      return Object.assign({}, state, { currentQuestion: Math.max(0, state.currentQuestion - 1) })
    case types.NEXT_QUESTION:
      if (state.currentQuestion + 1 < state.questions.length) {
        return Object.assign({}, state, { currentQuestion: state.currentQuestion + 1 })
      } else {
        return Object.assign({}, state, { page: appPages.results })
      }
    case types.FETCH_DATA:
      var data = action.data
      data.questions = shuffle(data.questions)
      data.isLoaded = true;
      return Object.assign({}, state, data)
    default:
      return state
  }
}

export default createStore(reducer, applyMiddleware(thunk))
