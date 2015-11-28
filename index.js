// Generated by CoffeeScript 1.10.0
(function() {
  var clone;

  clone = function(o) {
    return JSON.parse(JSON.stringify(o));
  };

  module.exports = (function() {
    var typeshave;
    typeshave = this;
    this.verbose = 0;
    this.onError = (function(_this) {
      return function(err) {
        if (_this.verbose > 0) {
          console.dir({
            'typeshave exception': err
          });
        }
        throw "TYPESAFE_FAIL";
      };
    })(this);
    this.typesafe = function(schema, method) {
      var validated;
      validated = function() {
        var args, dump, i, jv, k, v;
        jv = require('tv4-node').tv4;
        if (schema.type == null) {
          console.dir(arguments);
          args = {};
          i = 0;
          for (k in schema) {
            v = schema[k];
            args[k] = arguments[i++];
          }
          v = jv.validate(args, {
            type: "object",
            required: Object.keys(schema),
            properties: schema
          });
        } else {
          v = jv.validate(arguments[0], schema);
        }
        if (!v) {
          dump = {
            data: arguments,
            errors: jv.error,
            schema: schema
          };
          typeshave.onError(dump);
        }
        return method.apply(this, arguments);
      };
      return validated;
    };
    return this;
  })();

}).call(this);
