import React, { Component } from 'react';

import '../styles/results.css';

import Header from '../components/Header'
import Footer from '../components/Footer'

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function percentDiff(a, b) {
  return Math.abs(a - b) / ((a + b) / 2);
}

function computeDiff(scoresA, scoresB, maxScores) {

  let total = 0;
  let count = 0;

  for (var i = 0; i < scoresA.length; i++) {
    if (scoresA[i] > 0 && scoresB[i] > 0) {
      total += percentDiff(scoresA[i], scoresB[i])
    } else {
      total += 1
    }
  }

  // if (count === 0) {
  //   return 0
  // }

  return round(1 - (total / maxScores), 2)

}

const ResultsRaceCandidates = (props) => {

  const candidates = props.race.candidates
    .map((id) => props.candidates[id])
    .map((candidate) => {
      candidate.scoresDiff = computeDiff(candidate.scores, props.scores, props.maxScores)
      return candidate
    })
    .sort((a, b) => {
      if (a.scoresDiff < b.scoresDiff) {
        return 1;
      }
      if (a.scoresDiff > b.scoresDiff) {
        return -1;
      }
      return 0;
    })
    .map((candidate, i) => (
      <ResultsCandidate key={i} candidate={candidate} />
    ))

  return (
    <div>{candidates}</div>
  )

}

const ResultsRace = (props) => {
  return (
    <div className='c-ec-results__race'>
      <h2>{props.race.title}</h2>
      <ResultsRaceCandidates
        race={props.race}
        scores={props.scores}
        candidates={props.candidates}
        maxScores={props.maxScores} />
    </div>
  )
}

const ResultsCandidateBar = (props) => {
  const style = {width: (props.percent * 100) + '%' }
  return (
    <div className='c-ec-candidate__bar'>
      <div className='c-ec-candidate__bar__fill' style={style}></div>
    </div>
  )
}

const ResultsCandidate = (props) => {
  return (
    <div className='c-ec-candidate'>
      <div className='c-ec-candidate__name'>{props.candidate.name}</div>
      <ResultsCandidateBar percent={props.candidate.scoresDiff} />
    </div>
  )
}

const ResultsCategoryBar = (props) => {
  const style = {width: (props.scores[props.category.id] / 4 * 100) + '%' }
  return (
    <div className='c-ec-category__bar'>
      <div className='c-ec-category__bar__fill' style={style}></div>
    </div>
  )
}

const ResultsCategory = (props) => {
  return (
    <div className='c-ec-category'>
      <div className='c-ec-category__name'>{props.category.name}</div>
      <ResultsCategoryBar category={props.category} scores={props.scores} />
    </div>
  )
}

class ResultsPage extends Component {

  getScores() {

    var n = Object.keys(this.props.categories).length

    var rawScores = new Array(n).fill(0)
    var responses = new Array(n).fill(0)

    this.props.questions.forEach(question => {

      if (this.props.answers.hasOwnProperty(question.id)) {

        let score = this.props.answers[question.id]

        let cat = this.props.categories[question.category]

        rawScores[cat.id] += score
        responses[cat.id] += 1
      }

    })

    var scores = rawScores.map((score, i) => {
      if (score > 0) {
        return score / responses[i]
      } else {
        return 0
      }
    })

    return scores
  }

  render() {

    const scores = this.getScores()

    var n = Object.keys(this.props.categories).length
    var categoriesList = new Array(n)

    for (var slug in this.props.categories) {
      if (this.props.categories.hasOwnProperty(slug)) {
        categoriesList[this.props.categories[slug].id] = this.props.categories[slug]
      }
    }

    const categories = categoriesList
      .map((category, i) => (<ResultsCategory key={i} category={category} scores={scores} />))

    const races = this.props.races.map((race, i) => {
      return (
        <ResultsRace key={i} race={race} candidates={this.props.candidates} scores={scores} maxScores={n} />
      )
    })

    return (
      <div>
        <Header goToPage={this.props.goToPage} />
        <h2>Your results</h2>
        {categories}
        {races}
        <Footer />
      </div>
    );
  }
}

export default ResultsPage;
