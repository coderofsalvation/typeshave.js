var clone;

clone = function(o) {
  return JSON.parse(JSON.stringify(o));
};

module.exports = (function() {
  var typeshave;
  typeshave = this;
  this.tv4 = require('tv4-node').tv4;
  this.validate = function(data, schema) {
    var _data, i, k, objdata, v;
    _data = data;
    if (data.callee != null) {
      _data = Array.prototype.slice.call(data);
    }
    if (schema.type == null) {
      objdata = {};
      i = 1;
      for (k in schema) {
        v = schema[k];
        objdata[k] = data[i++];
      }
      _data = objdata;
      schema = {
        type: "object",
        required: Object.keys(schema),
        properties: schema
      };
    }
    return typeshave.tv4.validate(_data, schema);
  };
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
      var args, dump, i, k, v;
      if (schema.type == null) {
        args = {};
        i = 0;
        for (k in schema) {
          v = schema[k];
          args[k] = arguments[i++];
        }
        v = typeshave.validate(args, {
          type: "object",
          required: Object.keys(schema),
          properties: schema
        });
      } else {
        v = typeshave.validate(arguments[0], schema);
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
}).apply({});
