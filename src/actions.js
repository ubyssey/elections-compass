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
