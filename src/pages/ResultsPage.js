import React, { Component } from 'react';

import '../styles/results.css';

import Header from '../components/Header'

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

  return round(Math.max(1 - (total / count) - (nullCount / answersA.length / 2), 0), 2)

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
  const percent = props.percent * 100
  const style = {width: percent + '%'}
  const empty = (<div className='c-ec-candidate__bar__empty'>Insufficient data</div>)
  const bar = (
    <div className='c-ec-candidate__bar__fill' style={style}>
      <div className="c-ec-candidate__bar__text">{`${percent.toFixed()}% match`}</div>
    </div>
  )
  return (
    <div className='c-ec-candidate__bar'>
      {props.percent === 0 ? empty : bar}
    </div>
  )
}

const ResultsCandidate = (props) => {
  return (
    <div className='c-ec-candidate'>
      <div className='c-ec-candidate__name'><a href={props.candidate.profile} target='_blank'>{props.candidate.name}</a></div>
      <ResultsCandidateBar percent={props.candidate.scoresDiff} />
    </div>
  )
}

const ResultsCategoryBar = (props) => {
  const value = props.scores[props.category.id] - 2;
  const percent = (Math.abs(value) / 4 * 100)

  var left = 50 - percent
  var color = '#2f2fda'
  if (value > 0) {
    left = 50
    color = '#d00000'
  }

  const style = {marginLeft: left + '%', width: percent + '%', backgroundColor: color }
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

        console.log(this.props.categories)
        console.log(question.category)

        console.log(cat)

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

        <div className="c-ec-results__categories">
          <h2 className="c-ec-results__heading">Your results</h2>
          <h4 className="c-ec-results__subheading">These are the issues you care about most</h4>
          <div className='c-ec-category'>
            <div className='c-ec-category__name'></div>
            <div className='c-ec-category__bar-empty'>
              <div className='c-ec-category__bar__left'>Least important</div>
              <div className='c-ec-category__bar__middle'>Neutral</div>
              <div className='c-ec-category__bar__right'>Most important</div>
            </div>
          </div>
          {categories}
        </div>
        {races}
        <div style={{textAlign: 'center'}}>
          <a
            className='c-ec-vote-now'
            href='https://amsvoting.as.it.ubc.ca/'
            target='_blank'>
            Vote now!
          </a>
        </div>
      </div>
    );
  }
}

export default ResultsPage;
