import * as types from './actionTypes'
import fetch from 'isomorphic-fetch'

export function goToPage(page) {
  return {
    type: types.GO_TO_PAGE,
    page: page
  }
}

export function submitResponse(value) {
  return {
    type: types.SUBMIT_RESPONSE,
    value: value
  }
}

export function prevQuestion() {
  return {
    type: types.PREV_QUESTION
  }
}

export function nextQuestion() {
  return {
    type: types.NEXT_QUESTION
  }
}

export function resetSurvey() {
  return {
    type: types.RESET_SURVEY
  }
}

const ANSWERS = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree'
]

export function submitAnswers(formId, questions, answers) {
  return function(dispatch) {

    var body = ['fvv=1', 'pageHistory=0']

    questions.forEach(question => {
      if (answers.hasOwnProperty(question.id) && answers[question.id] !== null) {
        body.push(`entry.${question.formId}=${encodeURIComponent(ANSWERS[answers[question.id]])}`)
      }
    })

    const url = `https://docs.google.com/forms/d/e/${formId}/formResponse`

    return fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: body.join('&')
    })

  }
}

export function fetchData(url) {
  return function(dispatch) {
    return fetch(url, { method: 'GET', headers: {'Content-Type': 'text/plain'} })
      .then(response => {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response
      })
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: types.FETCH_DATA,
          data: json
        })
      })
  }
}
