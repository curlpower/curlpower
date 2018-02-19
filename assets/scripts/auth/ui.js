'use strict'

const store = require('../store')
const showMainTemplate = require('../templates/main-view.handlebars')
const showSignedInNavTemplate = require('../templates/signed-in-nav.handlebars')
const loadNavHeadTemplate = require('../templates/nav-header.handlebars')
const showNavTemplate = require('../templates/load-nav.handlebars')
const showSurveyContentTemplate = require('../templates/survey-content.handlebars')
const loadUserActionsTemplate = require('../templates/user-actions.handlebars')
const loadFeedbackMessageTemplate = require('../templates/feedback-message.handlebars')
const survUi = require('../survey/ui')

const clearFields = function () {
  $('input:text, input:password').val('')
}

// displays message to user on successful account creation and pushes the email used to the sign-in form
const signUpSuccess = function (data) {
  const email = $('#sign-up-email').val()
  clearFields()
  $('#sign-in-email').val(email)
  survUi.addMessage('.status-message-sign-up', 'Account Create. Please sign in.')
}

const signedInNav = function () {
  $('.account-nav').html('')
  const showSignedInNavHtml = showSignedInNavTemplate()
  $('.account-nav').append(showSignedInNavHtml)
}

const navHeader = function () {
  const showNavHeaderHtml = loadNavHeadTemplate()
  $('.navbar-header').prepend(showNavHeaderHtml)
}

const surveyContent = function () {
  const showSurveyContentHtml = showSurveyContentTemplate()
  $('.main').append(showSurveyContentHtml)
}

const userActions = function () {
  $('.user-actions').html('')
  const showUserActionsHtml = loadUserActionsTemplate()
  $('.user-actions').append(showUserActionsHtml)
}

const feedbackMessageDiv = function () {
  const showFeedbackMessageHtml = loadFeedbackMessageTemplate()
  if ($('.feedback-message-div').html('')) {
    $('.feedback-message-div').append(showFeedbackMessageHtml)
  }
}

const signInSuccess = function (data) {
  store.user = data.user
  clearFields()
  signedInNav()
  navHeader()
  $('#main-content').html('')
  surveyContent()
  userActions()
  feedbackMessageDiv()
  // console.log('store is, ', store)
}

const signInFailure = function (error) {
  const errorStatus = error.status.toString()
  if (errorStatus.startsWith('4') === true || errorStatus.startsWith('5') === true) {
    survUi.addMessage('.status-message-sign-in', 'Incorrect Email or Password.')
  } else if (errorStatus.startsWith('0') === true) {
    survUi.addMessage('.status-message-sign-in', 'Unable to contact server.')
  }
  clearFields()
}

const signUpFailure = function (error) {
  console.log(error)
  const errorStatus = error.status.toString()
  if (errorStatus.startsWith('4') === true) {
    survUi.addMessage('.status-message-sign-up', 'Invalid Email or Password.')
  } else if (errorStatus.startsWith('5') === true || errorStatus.startsWith('0') === true) {
    survUi.addMessage('.status-message-sign-up', 'Invalid Email or Password.')
  }
  clearFields()
}

const changePasswordSuccess = function (data) {
  survUi.addMessage('.status-message-change-password', 'Successfully changed password.')
  clearFields()
}

const changePasswordFailure = function (error) {
  const errorStatus = error.status.toString()
  // console.log('cp store is', store)
  if (errorStatus.startsWith('4') === true || errorStatus.startsWith('5') === true) {
    survUi.addMessage('.status-message-change-password', 'Incorrect password combination.')
  } else if (errorStatus.startsWith('0') === true) {
    survUi.addMessage('.status-message-change-password', 'Unable to contact server.')
  }
  clearFields()
}

const signOutSuccess = function () {
  $('.account-nav').html('')
  $('.user-buttons').html('')
  mainView()
  loadNav()
  $('.status-message-change-password').text('')
  $('.user-actions').html('')
  store.user = undefined
}

const loadNav = function () {
  $('.signed-in-nav').html('')
  const showNavHtml = showNavTemplate()
  $('.signed-in-nav').append(showNavHtml)
}

const mainView = function () {
  $('.main').html('')
  const showMainHtml = showMainTemplate()
  $('.main').append(showMainHtml)
}

module.exports = {
  signUpSuccess,
  signInSuccess,
  signUpFailure,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  loadNav,
  mainView,
  surveyContent
}
