'use strict'

const expect = require('chai').expect

describe('model', function () {
  const model = require('../index')

  describe('serialize', function () {
    it('should return an Immutable object with a property type activity', function () {
      const serialized = model.serialize({})
      expect(serialized.get('type')).to.equal('activity')
    })
  })
})
