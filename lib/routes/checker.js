'use strict'

const Joi = require('joi')

const routes = []

routes.push({
  method: 'GET',
  path: '/api/check',
  config: {
    tags: ['api'],
    validate: {
      query: Joi.object({
        user: Joi.string().required(),
      }).required()
    },
    pre: [
      { method: 'checker.canBuild(query.user)', assign: 'result' }
    ],
    handler: function (request, reply) {
      reply({
        canBuild: request.pre.result
      })
    },
    description: 'Check if user can build'
  }
})

module.exports = routes
