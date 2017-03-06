import React, { Component } from 'react';

import '../styles/results.css';

import Header from '../components/Header'
import Footer from '../components/Footer'

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function percentDiff(a, b) {
  return Math.abs(a - b) / 5;
}

function computeSimilarity(answersA, answersB) {

  let total = 0;
  let count = 0;
  let nullCount = 0;

  for (var i = 0; i < answersA.length; i++) {
    if (answersA[i] !== null && answersB[i] !== null) {
      total += percentDiff(answersA[i], answersB[i])
      count++
    } else {
      nullCount++;
    }
  }

  if (count === 0) {
    return 0
  }

  return Math.max(round(1 - (total / count), 2) - (nullCount / answersA.length / 2), 0)

}

const ResultsRaceCandidates = (props) => {

  const candidates = props.race.candidates
    .map((id) => props.candidates[id])
    .map((candidate) => {
      candidate.scoresDiff = computeSimilarity(candidate.answers, props.answers)
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
        answers={props.answers}
        scores={props.scores}
        candidates={props.candidates}
        maxScores={props.maxScores} />
    </div>
  )
}

const ResultsCandidateBar = (props) => {
  const style = {width: (props.percent * 100) + '%' }
  const empty = (<div className='c-ec-candidate__bar__empty'>Insufficient data</div>)
  const bar = (<div className='c-ec-candidate__bar__fill' style={style}></div>)
  return (
    <div className='c-ec-candidate__bar'>
      {props.percent === 0 ? empty : bar}
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

  componentWillMount() {
    this.props.submitAnswers('1FAIpQLSdxHdZJAuVaRBUK0ZDJcUGx95bP9O6yw8xJAeji8LpKScQgMQ', this.props.questions, this.props.rawAnswers)
  }

  getScores() {

    var n = Object.keys(this.props.categories).length

    var rawScores = new Array(n).fill(0)
    var responses = new Array(n).fill(0)

    this.props.questions.forEach(question => {

      if (this.props.answers.hasOwnProperty(question.id)) {

        let score = this.props.answers[question.id]

        let cat = this.props.categories[question.category]

        if (score !== null) {
          rawScores[cat.id] += score
          responses[cat.id] += 1
        }

      }

    })

    var scores = rawScores.map((score, i) => {
      if (responses[i] > 0) {
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
        <ResultsRace key={i} race={race} candidates={this.props.candidates} answers={this.props.answers} scores={scores} maxScores={n} />
      )
    })

    return (
      <div>
        <Header goToPage={this.props.goToPage} />
        <h2>Your results</h2>
        <h4>These are the issues you care about most</h4>
        {categories}
        {races}
        <Footer />
      </div>
    );
  }
}

export default ResultsPage;
