'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require(`./api`)
const ui = require('./ui')
const authUi = require('../auth/ui')

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

const onCreateSurvey = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.createSurvey(data)
    .then(data => {
      ui.createSurveySuccess(data)
      onGetAllSurveys()
      return data
    })
    .catch(ui.createSurveyFailure)
}

const onGetAllSurveys = function () {
  $('.main').html('')
  authUi.surveyContent()
  api.getAllSurveys()
    .then(ui.getAllSurveysSuccess)
    .catch(ui.getAllSurveysFailure)
}

const onGetASurvey = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.getASurvey(data)
    .then(ui.getASurveySuccess)
    .catch(ui.getASurveyFailure)
}

const onUpdateSurvey = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.updateSurvey(data)
    .then(data => {
      ui.updateSurveySuccess(data)
      onGetAllSurveys()
      return data
    })
    .catch(ui.updateSurveyFailure)
}

const onDeleteSurvey = function (event) {
  event.preventDefault()
  const surveyDiv = $(this).parent('.my-surveys')
  api.deleteSurvey(surveyDiv)
    .then(() => ui.deleteSurveySuccess(surveyDiv))
    .catch(ui.deleteSurveyFailure)
}

const onEditSurvey = function (event) {
  event.preventDefault()
  const surveyDiv = $(this).parent('.my-surveys')
  api.getASurvey(surveyDiv)
    .then(ui.getASurveySuccess)
    .catch(ui.getASurveyFailure)
}

const onLoadSurveyForm = function () {
  ui.loadSurveyForm()
}

const addHandlers = function () {
  $('.main').on('click', '.close-form', onGetAllSurveys)
  $('.user-actions').on('click', '.create-survey-button', throttle(onLoadSurveyForm, 1000))
  $('.user-actions').on('click', '.refresh-survey-button', onGetAllSurveys)
  $('.test-survey-crud').on('submit', '#get-survey-form', onGetASurvey)
  $('.main').on('submit', '#update-survey-form', onUpdateSurvey)
  $('.main').on('click', '.delete-survey', onDeleteSurvey)
  $('.main').on('click', '.edit-survey', onEditSurvey)
  $('.main').on('submit', '#create-survey-form', onCreateSurvey)
}

module.exports = {
  addHandlers,
  onGetAllSurveys
}
