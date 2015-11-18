tjv       = require 'tiny-json-validator'
clone     = (o) -> JSON.parse JSON.stringify o

module.exports = ( () ->
    
  typeshave = @

  @.verbose = 0

  @.onError = (err) =>
    console.dir {'typeshave exception': err} if @.verbose > 0
    throw "TYPESAFE_FAIL"
  
  @.typesafe = (schema,method) ->
    validated = () ->
      if not schema.type? # for inline function wrappers only (simple args and not phat object)
        args = {}; i = 0;
        args[k] = arguments[String(i++)] for k,v of schema
        console.dir args 
        v = tjv { type: "object", required: Object.keys(schema),  properties: schema }, args
      else
        v = tjv schema, arguments[0]
        console.dir arguments[0]
      if not v.isValid 
        dump = { data: arguments, errors: v.errors, schema: schema }
        typeshave.onError dump
      return method.apply @, arguments
    return validated

  @

).apply({})
