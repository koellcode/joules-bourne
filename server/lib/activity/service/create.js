'use strict'

const {deserialize} = require('../model')

const appendCreateDate = (model) => {
  return model.setCreatedDate(new Date().toISOString())
}

const mergeRev = (updatedDto, {_rev}) => {
  return Object.assign(updatedDto, {_rev})
}

const mergeId = (updatedDto, {_id}) => {
  return Object.assign(updatedDto, {_id})
}

module.exports = (db) => {
  return async (model) => {
    const id = `${model.getId()}`
    const localDocument = deserialize(appendCreateDate(model))
    let toPersistedDocument = null

    try {
      const remoteDocument = await db.get(id)
      // we want a proper merge here at some time
      toPersistedDocument = mergeRev(localDocument, remoteDocument)
    } catch (err) {
      // TODO: check on 404 here
      // document do not exist, use local one
      toPersistedDocument = localDocument
    }

    const toPersistedDocumentWithId = mergeId(toPersistedDocument, {_id: id})

    return await db.put(toPersistedDocumentWithId)
  }
}
