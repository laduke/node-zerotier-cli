function arrToDict (xs, key) {
  return xs.reduce(function (acc, e) {
    var obj = {}
    obj[e[key]] = e
    return Object.assign({}, acc, obj)
  }, {})
}

function mergeEntities (db, entityArr, path, id) {
  db.get(path, function (err, entitiesExisting) {
    if (err) entitiesExisting = {}

    var entitiesDict = arrToDict(entityArr, id)
    var entitiesMerged = Object.assign({}, entitiesExisting, entitiesDict)

    db.put(
      path,
      entitiesMerged,
      function (err) {
        if (err) console.err(err)
      }
    )
  })
}

module.exports = { arrToDict: arrToDict, mergeEntities: mergeEntities }
