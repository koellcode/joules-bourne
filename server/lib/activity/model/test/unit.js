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

    describe('mapUrl', () => {
      it('should ignore the mapUrl property on serialization', () => {
        const serialized = model.serialize({
          mapUrl: 'mock'
        })
        expect(serialized.getMapUrl()).not.to.exist
      })

      it('should return a mapUrl property when trackpoints with Positions are available', () => {
        const serialized = model.serialize(
          {
            '_id': 'mockId',
            'laps': [
              {
                'Track': {
                  'Trackpoint': [
                    {
                      'Position': {
                        'LatitudeDegrees': 1,
                        'LongitudeDegrees': 2
                      }
                    }
                  ]
                }
              }
            ]
          }
        )
        expect(serialized.getMapUrl()).to.equal('/api/v1/activity/mockId/map')
      })

      it('should not return a mapUrl property when no trackpoints are available', () => {
        const serialized = model.serialize({_id: 'mockId'})
        expect(serialized.getMapUrl()).not.to.exist
      })
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

    describe('calories', () => {
      it('shoud aggregate all Calories across the laps', () => {
        const serialized = model.serialize({
          laps: [{
            Calories: 10
          }, {
            Calories: 20
          }]
        })
        expect(serialized.getCalories()).to.equal(30)
      })
    })

    describe('duration', () => {
      it('shoud aggregate all Calories across the laps', () => {
        const serialized = model.serialize({
          laps: [{
            TotalTimeSeconds: 10
          }, {
            TotalTimeSeconds: 20
          }]
        })
        expect(serialized.getDuration()).to.equal(30)
      })
    })

    describe('trackPoints', () => {
      it('should filter out trackpoints with faulty positions', () => {
        const serialized = model.serialize({
          'laps': [
            {
              'Track': {
                'Trackpoint': [
                  {
                    'lala': 'jaja'
                  }
                ]
              }
            }
          ]
        })
        expect(serialized.toJS().laps[0].Track.Trackpoint).to.have.length(0)
      })

      it('should ignore empty Track', () => {
        const serialized = model.serialize({laps: [{Track: undefined}]})
        expect(serialized.toJS().laps[0]).not.to.have.property('Track')
      })

      it('should ignore empty Trackpoint', () => {
        const serialized = model.serialize({laps: [{Track: {Trackpoint: undefined}}]})
        expect(serialized.toJS().laps[0]).not.to.have.property('Track')
      })

      it('should get a flat list of trackpoints from across different laps', () => {
        const serialized = model.serialize({
          'laps': [
            {
              'Track': {
                'Trackpoint': [
                  {
                    'Position': {
                      'LatitudeDegrees': 1,
                      'LongitudeDegrees': 2
                    }
                  }
                ]
              }
            },
            {
              'Track': {
                'Trackpoint': [
                  {
                    'Position': {
                      'LatitudeDegrees': 3,
                      'LongitudeDegrees': 4
                    }
                  }
                ]
              }
            }
          ]
        })
        expect(serialized.getFlatTrackPoints().toJS()).to.deep.equal([
          {
            LatitudeDegrees: 1,
            LongitudeDegrees: 2
          },
          {
            LatitudeDegrees: 3,
            LongitudeDegrees: 4
          }
        ])
      })
      it('should omit trackpoints with undefined Positions', () => {
        const serialized = model.serialize({
          'laps': [
            {
              'Track': {
                'Trackpoint': [
                  {

                  }
                ]
              }
            },
            {
              'Track': {
                'Trackpoint': [
                  {
                    'Position': {
                      'LatitudeDegrees': 3,
                      'LongitudeDegrees': 4
                    }
                  }
                ]
              }
            }
          ]
        })

        expect(serialized.getFlatTrackPoints().toJS()).to.deep.equal([
          {
            LatitudeDegrees: 3,
            LongitudeDegrees: 4
          }
        ])
      })
    })
  })
})
