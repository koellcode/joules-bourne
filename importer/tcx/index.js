#!/usr/bin/env node
"use strict"

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const request = Promise.promisify(require('request'))

const program = require('commander');
const deserialize = require('./tcx-to-dto')

program
  .version('0.0.1')
  .option('-p, --path', 'specify folder for tcx files')
  .parse(process.argv)

const readData = Promise.coroutine(function * () {
  return yield fs.readFileAsync('samples/2015-09-19_Running.tcx', 'utf8')
})


if (program.path) {
  readData().then(Promise.coroutine(function * (content) {
    deserialize(content).map(Promise.coroutine(function * (dto) {
      const response = yield request({
        method: 'POST',
        uri: 'http://localhost:3000/api/v1/activity',
        json: true,
        body: dto
      })
      console.log(response.body)
    }))

  }))
}