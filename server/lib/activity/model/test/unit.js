'use strict'

const expect = require('chai').expect

describe('model', () => {
  const model = require('../index')

  describe('serialize', () => {
    it('should return an object with a property type activity', () => {
      const serialized = model.serialize({})
      expect(serialized.get('type')).to.equal('activity')
    })

    it('should defaults the source property to unknown', () => {
      const serialized = model.serialize({})
      expect(serialized.get('source')).to.equal('unknown')
    })

    it('should serialize the source property', () => {
      const serialized = model.serialize({
        source: 'mock'
      })
      expect(serialized.get('source')).to.equal('mock')
    })

    it('should defaults the sport property to unknown', () => {
      const serialized = model.serialize({})
      expect(serialized.get('sport')).to.equal('unknown')
    })

    it('should serialize the sport property', () => {
      const serialized = model.serialize({
        sport: 'mock'
      })
      expect(serialized.get('sport')).to.equal('mock')
    })

    describe('laps', () => {
      it('should defaults the laps property to an empty array', () => {
        const serialized = model.serialize({})
        expect(serialized.get('laps')).to.deep.equal([])
      })

      it('should defaults nothing in a lap', () => {
        const serialized = model.serialize({
          laps: [{}]
        })
        expect(serialized.get('laps')).to.deep.equal([{}])
      })
    })
  })
})
