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

const races = [
  {
    title: 'President',
    categories: ['spending', 'student-involvement'],
    candidates: [
      {
        name: 'James Cohen',
        answers: {}
      },
      {
        name: 'Sugar Brewer',
        answers: {}
      },
      {
        name: 'The Cairn',
        answers: {}
      },
      {
        name: 'Jesse Hooton',
        answers: {}
      },
      {
        name: 'Julian Del Balso',
        answers: {}
      }
    ]
  },
  {
    title: 'VP Administration',
    categories: ['spending', 'student-involvement'],
    candidates: [
      {
        name: 'Pooja Bhatti',
        answers: {}
      },
      {
        name: 'Julien Hart',
        answers: {}
      },
      {
        name: 'Faraz Nikzad',
        answers: {}
      }
    ]
  },
  {
    title: 'VP Academic & University Affairs',
    categories: ['spending', 'student-involvement'],
    candidates: [
      {
        name: 'Daniel Lam',
        answers: {}
      }
    ]
  },
  {
    title: 'VP External Affairs',
    categories: ['spending', 'student-involvement'],
    candidates: [
      {
        name: 'Dario Garousian',
        answers: {}
      },
      {
        name: 'Sally Lin',
        answers: {}
      }
    ]
  },
  {
    title: 'VP Finance',
    categories: ['spending', 'student-involvement'],
    candidates: [
      {
        name: 'Alim Lakhiyalov',
        answers: {}
      }
    ]
  },
  {
    title: 'UBC Board of Governors',
    categories: ['spending', 'student-involvement'],
    candidates: [
      {
        name: 'Louis Retief',
        answers: {}
      },
      {
        name: 'Jakob Gattinger',
        answers: {}
      },
      {
        name: 'Kevin Doering',
        answers: {}
      },
      {
        name: 'Sneha Balani',
        answers: {}
      },
      {
        name: 'Jeanie Malone',
        answers: {}
      }
    ]
  },
  {
    title: 'Senate',
    categories: ['spending', 'student-involvement'],
    candidates: [
      {
        name: 'Daniel Lam',
        answers: {}
      },
      {
        name: 'Simran Brar',
        answers: {}
      },
      {
        name: 'William Chen',
        answers: {}
      },
      {
        name: 'Kevin Doering',
        answers: {}
      },
      {
        name: 'Jakob Gattinger',
        answers: {}
      },
      {
        name: 'Ian Sapollnik',
        answers: {}
      }
    ]
  }
]

const initialState = {
  page: appPages.landing,

  isLoaded: false,
  questions: [],
  categories: {},
  races: races,
  currentQuestion: 0,

  raw_scores: {},
  responses: {}
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GO_TO_PAGE:
      return Object.assign({}, state, { page: appPages[action.page] })
    case types.SUBMIT_RESPONSE:
      var category = state.questions[state.currentQuestion].category
      var raw_scores = state.raw_scores
      var responses = state.responses
      raw_scores[category] = (raw_scores[category] || 0) + action.value
      responses[category] = (responses[category] || 0) + 1
      return Object.assign({}, state, { raw_scores: raw_scores, responses: responses })
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
      data.isLoaded = true;
      return Object.assign({}, state, data)
    default:
      return state
  }
}

export default createStore(reducer, applyMiddleware(thunk))
