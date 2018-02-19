'use strict'

const store = require('../store')
const loadSurveysTemplate = require('../templates/load-surveys.handlebars')
const loadEditTemplate = require('../templates/edit-survey.handlebars')
const loadTakeablesTemplate = require('../templates/takeable-surveys.handlebars')
const loadRefreshTemplate = require('../templates/refresh-survey-button.handlebars')
const loadCreateSurveyFormTemplate = require('../templates/create-survey-form.handlebars')
const loadCreateButtonTemplate = require('../templates/create-survey-button.handlebars')

const addMessage = function (element, message) {
  $(element).html('')
  $(element).show()
  $(element).html(message)
  $(element).fadeOut(4000)
}

const createSurveySuccess = function (data) {
  addMessage('.feedback-message', 'Survey Created!!')
}

const createSurveyFailure = function () {
  addMessage('.feedback-message', 'Error. Please try again.')
}

const loadSurveyForm = function () {
  const showSurveyFormHtml = loadCreateSurveyFormTemplate()
  $('.main').html('')
  $('.main').append(showSurveyFormHtml)
}

const rButton = function () {
  const showRButtonHtml = loadRefreshTemplate()
  if ($('.refresh-survey').html('')) {
    $('.refresh-survey').append(showRButtonHtml)
  }
}

const crButton = function () {
  const showCrButtonHtml = loadCreateButtonTemplate()
  if ($('.create-survey').html('')) {
    $('.create-survey').append(showCrButtonHtml)
  }
}

const dashboard = function (data) {
  const mySurveys = []
  const otherSurveys = []
  const takenIdList = []
  const takeableSurveys = []
  data.surveys.forEach((survey) => {
    if (survey._owner === store.user._id) {
      mySurveys.push(survey)
    } else {
      otherSurveys.push(survey)
    }
  })
  otherSurveys.forEach(survey => {
    for (let i = 0; i < survey.submissions.length; i++) {
      if (survey.submissions[i]._submitter === store.user._id) {
        return takenIdList.push(survey._id)
      }
    }
  })
  otherSurveys.forEach(survey => {
    if (takenIdList.includes(survey._id)) {
      return
    } else {
      takeableSurveys.push(survey)
    }
  })
  mySurveys.forEach(survey => {
    survey.stats = {
      truth: 0,
      falsey: 0,
      total: 0
    }
    survey.submissions.forEach(submission => {
      if (submission.answer === true) {
        survey.stats.truth++
      } else {
        survey.stats.falsey++
      }
      survey.stats.total++
    })
  })
  return { mySurveys, takeableSurveys }
}

const getAllSurveysSuccess = function (data) {
  $('.my-surv').html('')
  $('.take-surv').html('')

  const surveyDisplay = dashboard(data)

  const showSurveysHtml = loadSurveysTemplate({
    surveys: surveyDisplay.mySurveys
  })
  $('.my-surv').append(showSurveysHtml)
  const showTakeablesHtml = loadTakeablesTemplate({
    surveys: surveyDisplay.takeableSurveys
  })
  $('.take-surv').append(showTakeablesHtml)
  rButton()
  crButton()
}

const getAllSurveysFailure = function () {
  addMessage('.feedback-message', 'Error. Please try again.')
}

const getASurveySuccess = function (data) {
  $('.main').html('')
  const showEditHtml = loadEditTemplate({
    survey: data.survey
  })
  $('.main').append(showEditHtml)
  // console.log('editable survey ', data)
}

const getASurveyFailure = function () {
  addMessage('.feedback-message', 'Error. Please try again.')
}

const updateSurveySuccess = function (data) {
  addMessage('.feedback-message', 'Your survey has been updated')
}

const updateSurveyFailure = function () {
  addMessage('.feedback-message', 'Error. Please try again')
}

const deleteSurveySuccess = function (data) {
  const surveyDiv = $(data).parents('div')[0]
  $(surveyDiv).html('')
  addMessage('.feedback-message', 'The survey has been deleted')
}

const deleteSurveyFailure = function () {
  addMessage('.feedback-message', 'Error. Please try again')
}

module.exports = {
  createSurveySuccess,
  createSurveyFailure,
  getAllSurveysSuccess,
  getAllSurveysFailure,
  getASurveySuccess,
  getASurveyFailure,
  updateSurveySuccess,
  updateSurveyFailure,
  deleteSurveySuccess,
  deleteSurveyFailure,
  loadSurveyForm,
  addMessage
}
