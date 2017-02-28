import * as types from './actionTypes'

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
