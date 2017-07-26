function arrToDict (xs, key) {
  return xs.reduce(function (acc, e) {
    var obj = {}
    obj[e[key]] = e
    return Object.assign({}, acc, obj)
  }, {})
}

function mergeEntities (db, entityArr, key) {
  db.get(key, function (err, entitiesExisting) {
    if (err) entitiesExisting = {}

    var entitiesDict = arrToDict(entityArr, 'address')
    var entitiesMerged = Object.assign({}, entitiesExisting, entitiesDict)

    db.put([], {
      [key]: entitiesMerged
    }, function (err) {
      if (err) console.err(err)
    })
  })
}

module.exports = { arrToDict: arrToDict, mergeEntities: mergeEntities }
