'use strict'

const store = require('../store')
const loadSurveysTemplate = require('../templates/load-surveys.handlebars')

const createSurveySuccess = function (data) {
  console.log('successfully created survey', data)
}

const createSurveyFailure = function (error) {
  console.error(error)
}

const getAllSurveysSuccess = function (data) {
  const showSurveysHtml = loadSurveysTemplate({
    surveys: data.surveys
  })
  $('#survey-content').append(showSurveysHtml)
  console.log('these are surveys', data)
}

const getAllSurveysFailure = function (error) {
  console.log('not', error)
}

const getASurveySuccess = function (data) {
  console.log('this is working ', data)
}

const getASurveyFailure = function (error) {
  console.error(error)
}

const updateSurveySuccess = function (data) {
  console.log('this is working ', data)
}

const updateSurveyFailure = function (error) {
  console.error(error)
}

const deleteSurveySuccess = function (data) {
  console.log('this is working ', data)
}

const deleteSurveyFailure = function (error) {
  console.error(error)
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
  deleteSurveyFailure
}
