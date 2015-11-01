tv4       = require 'tv4'
clone     = (o) -> JSON.parse JSON.stringify o

module.exports = ( () ->

  @.onError = (err) ->
    console.log "typesafe error: "+String(e.dataPath).replace(/\//g,'.')+" "+e.message for e in err.errors
    throw "TYPESAFE_FAIL"
  
  @.typesafe = (schema,method) ->
    typeshave = me = @
    validated = () ->
      if not schema.type? # for inline function wrappers only (simple args and not phat object)
        args = {}; i = 0;
        args[k] = arguments[String(i++)] for k,v of schema
        v = tv4.validateMultiple args, { type: "object", required: Object.keys(schema),  properties: schema }
      else
        v = tv4.validateMultiple arguments[0], schema
      if not v.valid 
        dump = { data: arguments, errors: v.errors, schema: schema }
        if process.env.DEBUG
          console.log JSON.stringify dump, null, 2
        typeshave.onError dump
      return method.apply @, arguments
    return validated

  return @

)()
