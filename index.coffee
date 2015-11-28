clone     = (o) -> JSON.parse JSON.stringify o

module.exports = ( () ->
    
  typeshave = @

  @.verbose = 0

  @.onError = (err) =>
    console.dir {'typeshave exception': err} if @.verbose > 0
    throw "TYPESAFE_FAIL"
  
  @.typesafe = (schema,method) ->
    validated = () ->
      jv = require('tv4-node').tv4
      if not schema.type? # for inline function wrappers only (simple args and not phat object)
        console.dir arguments
        args = {}; i=0; args[k] = arguments[i++] for k,v of schema
        v = jv.validate args, { type: "object", required: Object.keys(schema),  properties: schema }
      else
        v = jv.validate arguments[0], schema
      if not v
        dump = { data: arguments, errors: jv.error, schema: schema }
        typeshave.onError dump
      return method.apply @, arguments
    return validated

  @

)()
