'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require(`./api`)
const ui = require('./ui')
const survApi = require('../survey/api')
const survEvents = require('../survey/events')

const throttle = function (func, interval) {
  let lastCall = 0
  return function () {
    const now = Date.now()
    if (lastCall + interval < now) {
      lastCall = now
      return func.apply(this, arguments)
    }
  }
}

const onCreateSubmission = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.createSubmission(data)
    .then(data => {
      ui.createSubmissionSuccess(data)
      survEvents.onGetAllSurveys()
      return data
    })
    .catch(ui.createSubmissionFailure)
}

const onTakeSurvey = function (event) {
  event.preventDefault()
  const takeableDiv = $(this).parent('div')
  survApi.getASurvey(takeableDiv)
    .then(ui.displaySurveySuccess)
    .catch(ui.displaySurveyFailure)
}

const addHandlers = function () {
  $('.main').on('submit', '#create-submission-form', throttle(onCreateSubmission, 1000))
  $('.main').on('click', '.take-survey', onTakeSurvey)
}

module.exports = {
  addHandlers
}
