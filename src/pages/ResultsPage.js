import React, { Component } from 'react';

function computeSimilarity(race, answers, candidate) {
  let total = race.categories
    .map((category) => candidate.answers[category] - (answers[category] || 0))
    .reduce((a, b) => a + b)

  return Math.abs(total) / race.categories.length
}

function sortCandidates(race, answers, candidates) {

  return candidates.sort((a, b) => {

    let aVal = computeSimilarity(race, answers, a)
    let bVal = computeSimilarity(race, answers, b)

    if (aVal < bVal) {
      return -1
    }

    if (aVal > bVal) {
      return 1
    }

    return 0

  })

}

const ResultsRaceCandidates = (props) => {

  const candidates =
    sortCandidates(props.race, props.answers, props.candidates)
    .map((candidate, i) => (<li key={i}>{candidate.name}</li>))

  return (
    <ul>{candidates}</ul>
  )

}

const ResultsRace = (props) => {
  return (
    <div>
      <h2>{props.race.title}</h2>
      <ResultsRaceCandidates
        race={props.race}
        answers={props.answers}
        candidates={props.race.candidates} />
    </div>
  )
}

class ResultsPage extends Component {
  render() {
    const races = this.props.races.map((race, i) => (
      <ResultsRace
        key={i}
        race={race}
        answers={this.props.answers} />
    ))

    return (
      <div>
        {races}
      </div>
    );
  }
}

export default ResultsPage;
