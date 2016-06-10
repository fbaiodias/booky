'use strict'

const Boom = require('boom')

let methods = []

function canBuild (user, callback) {
  callback(null, true)
}

methods.push({ name: 'checker.canBuild', method: canBuild })

module.exports = methods
