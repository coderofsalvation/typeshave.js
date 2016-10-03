clone     = (o) -> JSON.parse JSON.stringify o

module.exports = ( () ->
    
  typeshave = @
      
  @tv4 = require('tv4-node').tv4
  @validate = (data,schema) -> 
    _data = data
    _data = Array.prototype.slice.call(data) if data and data.callee?
    if not schema.type? # for inline function wrappers only (simple args and not phat object)
      objdata = {}; i=1; objdata[k] = data[i++] for k,v of schema ; _data = objdata
      schema = { type: "object", required: Object.keys(schema),  properties: schema }
    return typeshave.tv4.validate _data, schema 

  @verbose = 0

  @onError = (err) =>
    console.log JSON.stringify {'typeshave exception': err},null,2 if @.verbose > 0
    throw "TYPESAFE_FAIL"

  @typesafe = (schema,method) ->
    validated = () ->
      args = {} ; _schema = clone schema
      if not _schema.type? # for inline function wrappers only (simple args and not phat object)
        i=0; args[k] = arguments[i++] for k,v of schema
        _schema = { type: "object", required: Object.keys(schema),  properties: schema }
      else args = arguments[0]
      v = typeshave.validate args, _schema
      if not v
        dump = { data: args, errors: v.error, schema: _schema }
        typeshave.onError dump
      return method.apply @, arguments
    return validated

  @

).apply({})
