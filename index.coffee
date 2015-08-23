tv4       = require 'tv4'

module.exports = {
  
  typesafe: (schema,method) ->
    validated = () ->
      if not schema.type? # for inline function wrappers only (simple args and not phat object)
        args = {}; i = 0;
        args[k] = arguments[String(i++)] for k,v of schema
        schema = { type: "object", required: Object.keys(schema),  properties: schema } 
        arguments[0] = args 
      v = tv4.validateMultiple arguments[0], schema
      if not v.valid 
        if process.env.DEBUG
          console.log JSON.stringify { data: arguments[0], errors: v, schema: schema }, null, 2
        else console.log "typesafe error: "+String(e.dataPath).replace(/\//g,'.')+" "+e.message for e in v.errors
        throw "TYPESAFE_FAIL"
      else console.log "all fine"
      
      return method.apply @, arguments
    return validated
}
