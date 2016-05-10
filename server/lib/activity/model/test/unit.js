'use strict'

const {expect} = require('chai')

describe('model', () => {
  const model = require('../index')

  describe('serialize', () => {
    it('should return an object with a property type activity', () => {
      const serialized = model.serialize({})
      expect(serialized.getType()).to.equal('activity')
    })

    it('should defaults the source property to unknown', () => {
      const serialized = model.serialize({})
      expect(serialized.getSource()).to.equal('unknown')
    })

    it('should serialize the source property', () => {
      const serialized = model.serialize({
        source: 'mock'
      })
      expect(serialized.getSource()).to.equal('mock')
    })

    it('should defaults the sport property to unknown', () => {
      const serialized = model.serialize({})
      expect(serialized.getSport()).to.equal('unknown')
    })

    it('should serialize the sport property', () => {
      const serialized = model.serialize({
        sport: 'mock'
      })
      expect(serialized.getSport()).to.equal('mock')
    })

    describe('laps', () => {
      it('should defaults the laps property to an empty array', () => {
        const serialized = model.serialize({})
        expect(serialized.getLaps().toJS()).to.deep.equal([])
      })

      it('should defaults nothing in a lap', () => {
        const serialized = model.serialize({
          laps: [{}]
        })
        expect(serialized.getLaps().toJS()).to.deep.equal([{}])
      })
    })
  })
})
