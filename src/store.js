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

const surveyCategories = {
  'student-involvement': {
    name: 'Student Involvement',
    type: 'simple'
  },
  'spending': {
    name: 'Spending',
    type: 'binary',
    options: ['increase', 'decrease']
  }
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
        name: 'Matthew Morton',
        answers: {}
      },
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
        name: 'Maja Dziok',
        answers: {}
      },
      {
        name: 'Ian Sapollnik',
        answers: {}
      }
    ]
  }
]

const surveyQuestions = [
  {
    body: 'The AMS should reduce the price of food in the Nest.',
    category: 'spending.increase'
  },
  {
    body: 'The AMS should reduce the price of food in the Nest 1.',
    category: 'student-involvement'
  },
  {
    body: 'The AMS should reduce the price of food in the Nest 2.',
    category: 'spending.decrease'
  }
]

const initialState = {
  page: appPages.landing,
  questions: surveyQuestions,
  categories: surveyCategories,
  races: races,
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
