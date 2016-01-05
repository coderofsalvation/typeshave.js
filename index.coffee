clone     = (o) -> JSON.parse JSON.stringify o

module.exports = ( () ->
    
  typeshave = @
      
  @tv4 = require('tv4-node').tv4
  @validate = (data,schema) -> 
    _data = data
    _data = Array.prototype.slice.call(data) if data.callee?
    if not schema.type? # for inline function wrappers only (simple args and not phat object)
      objdata = {}; i=1; objdata[k] = data[i++] for k,v of schema ; _data = objdata
      schema = { type: "object", required: Object.keys(schema),  properties: schema }
    return typeshave.tv4.validate _data, schema 

  @verbose = 0

  @onError = (err) =>
    console.dir {'typeshave exception': err} if @.verbose > 0
    throw "TYPESAFE_FAIL"

  @typesafe = (schema,method) ->
    validated = () ->
      if not schema.type? # for inline function wrappers only (simple args and not phat object)
        args = {}; i=0; args[k] = arguments[i++] for k,v of schema
        v = typeshave.validate args, { type: "object", required: Object.keys(schema),  properties: schema }
      else
        v = typeshave.validate arguments[0], schema
      if not v
        dump = { data: arguments, errors: jv.error, schema: schema }
        typeshave.onError dump
      return method.apply @, arguments
    return validated

  @

).apply({})
