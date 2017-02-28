import { createStore } from 'redux'

import * as types from './actionTypes'

import LandingPage from './pages/LandingPage'
import SurveyPage from './pages/SurveyPage'
import ResultsPage from './pages/ResultsPage'

const appPages = {
  landing: LandingPage,
  survey: SurveyPage,
  results: ResultsPage
}

const surveyQuestions = [
  {
    body: 'The AMS should reduce the price of food in the Nest.',
    category: 'cat-1'
  },
  {
    body: 'The AMS should reduce the price of food in the Nest 1.',
    category: 'cat-2'
  },
  {
    body: 'The AMS should reduce the price of food in the Nest 2.',
    category: 'cat-1'
  }
]

const initialState = {
  page: appPages.landing,
  questions: surveyQuestions,
  currentQuestion: 0,
  answers: {}
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GO_TO_PAGE:
      return Object.assign({}, state, { page: appPages[action.page] })
    case types.SUBMIT_RESPONSE:
      var category = state.questions[state.currentQuestion].category
      var answers = state.answers
      answers[category] = (answers[category] || 0) + action.value
      return Object.assign({}, state, { answers: answers })
    case types.PREV_QUESTION:
      return Object.assign({}, state, { currentQuestion: Math.max(0, state.currentQuestion - 1) })
    case types.NEXT_QUESTION:
      if (state.currentQuestion + 1 < state.questions.length) {
        return Object.assign({}, state, { currentQuestion: state.currentQuestion + 1 })
      } else {
        return Object.assign({}, state, { page: appPages.results })
      }
    default:
      return state
  }
}

export default createStore(reducer)
