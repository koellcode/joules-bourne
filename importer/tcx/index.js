#!/usr/bin/env node
"use strict"

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const request = Promise.promisify(require('request'))

require('co-mmander')
const program = require('commander')
const deserialize = require('./tcx-to-dto')

const readData = ( fileName => {
  return fs.readFileAsync(fileName, 'utf8')
})

const postAction = function * (path) {
  const content = yield readData('samples/2015-09-19_Running.tcx')
  const requestPromises = deserialize(content).map(function (dto) {
    return request({
      method: 'POST',
      uri: 'http://localhost:3000/api/v1/activity',
      json: true,
      body: dto
    })
  })
  yield Promise.all(requestPromises)
}

program
  .version('0.0.1')
  .option('-p, --path', 'specify folder for tcx files')
  .action(postAction)
  .parse(process.argv)