#!/usr/bin/env node
"use strict"

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const request = Promise.promisify(require('request'))

const program = require('commander');
const deserialize = require('./tcx-to-dto')

const readData = ( fileName => {
  return fs.readFileAsync(fileName, 'utf8')
})

const postAction = Promise.coroutine(function * (path) {
  const content = yield readData('samples/2015-09-19_Running.tcx')
  deserialize(content).map(Promise.coroutine(function * (dto) {
    yield request({
      method: 'POST',
      uri: 'http://localhost:3000/api/v1/activity',
      json: true,
      body: dto
    })
  }))
})

program
  .version('0.0.1')
  .option('-p, --path', 'specify folder for tcx files')
  .action(postAction)
  .parse(process.argv)