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
    if (data && (data.callee != null)) {
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
        console.log(JSON.stringify({
          'typeshave exception': err
        }, null, 2));
      }
      throw "TYPESAFE_FAIL";
    };
  })(this);
  this.typesafe = function(schema, method) {
    var validated;
    validated = function() {
      var _schema, args, dump, i, k, v;
      args = {};
      _schema = clone(schema);
      if (_schema.type == null) {
        i = 0;
        for (k in schema) {
          v = schema[k];
          args[k] = arguments[i++];
        }
        _schema = {
          type: "object",
          required: Object.keys(schema),
          properties: schema
        };
      } else {
        args = arguments[0];
      }
      v = typeshave.validate(args, _schema);
      if (!v) {
        dump = {
          data: args,
          errors: v.error,
          schema: _schema
        };
        typeshave.onError(dump);
      }
      return method.apply(this, arguments);
    };
    return validated;
  };
  return this;
}).apply({});
