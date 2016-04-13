'use strict'

const expect = require('chai').expect

describe('model', () => {  
  const model = require('../index')

  describe('serialize', () => {
    it('should return an Immutable object with a property type activity', () => {
      const serialized = model.serialize({})
      expect(serialized.get('type')).to.equal('activity')
    })
  })
})
