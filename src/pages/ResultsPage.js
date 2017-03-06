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
    <ol>{candidates}</ol>
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

  getScores() {
    const raw_scores = this.props.results.raw_scores
    const responses = this.props.results.responses

    var n = Object.keys(raw_scores).length

    var scores = new Array(n)

    for (var slug in raw_scores) {

      if (raw_scores.hasOwnProperty(slug)) {
        let cat = this.props.categories[slug]

        if (raw_scores[slug] > 0) {
          scores[cat.id] = raw_scores[slug] / responses[slug]
        } else {
          scores[cat.id] = 0
        }
      }

    }

    return scores
  }

  computeDiff(scoresA, scoresB) {

    let total = 0;
    let count = 0;

    for (var i = 0; i < scoresA.length; i++) {
      if (scoresA[i] > 0 && scoresB[i] > 0) {
        total += Math.abs(scoresA[i] - scoresB[i])
        count++
      }
    }

    return total / count

  }

  render() {

    const scores = this.getScores()
    //
    // const races = this.props.races.map((race, i) => (
    //   <ResultsRace
    //     key={i}
    //     race={race}
    //     answers={this.props.answers} />
    // ))

    const candidates = this.props.candidates
      .map((candidate) => {
        candidate.scoresDiff = this.computeDiff(candidate.scores, scores)
        return candidate
      })
      .sort((a, b) => {
        if (a.scoresDiff < b.scoresDiff) {
          return -1;
        }
        if (a.scoresDiff > b.scoresDiff) {
          return 1;
        }
        return 0;
      })
      .map((candidate, i) => (
        <h3>{candidate.name} - {candidate.scoresDiff}</h3>
      ))

    return (
      <div>
        {candidates}
      </div>
    );
  }
}

export default ResultsPage;
