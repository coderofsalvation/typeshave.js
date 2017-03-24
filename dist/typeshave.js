var clone     = function (o) { return JSON.parse(JSON.stringify(o)); };

var obj = function() {

  var typeshave = this;

  this.tv4 = require('tv4-node').tv4;
  this.validate = function(data,schema) { 
    var _data = data;
    if (data && (data.callee != null)) { _data = Array.prototype.slice.call(data); }
    if (!(schema.type != null)) { // for inline function wrappers only (simple args and not phat object)
      var objdata = {}; var i=1; for (var k in schema) { var v = schema[k];       objdata[k] = data[i++];  _data = objdata; }
      schema = { type: "object", required: Object.keys(schema),  properties: schema };
    }
    if( typeshave.tv4.validate(_data, schema) ) { return true }
    typeshave.error( typeshave.tv4.errors )
  };

  this.error = function (errors) {
    console.error(errors)
    return new Error(errors)
  }

  this.typesafe = function(schema,method) {
    var validated = function() {
      var arguments$1 = arguments;

      var args = {};  var _schema = clone(schema);
      if (!(_schema.type != null)) { // for inline function wrappers only (simple args and not phat object)
        var i=0; for (var k in schema) { var v = schema[k];         args[k] = arguments$1[i++]; }
        _schema = { type: "object", required: Object.keys(schema),  properties: schema };
      } else { args = arguments[0]; }
      var v = typeshave.validate(args, _schema);
      if (!v) {
        var dump = { data: args, errors: typeshave.tv4.error, schema: _schema };
        throw dump
      }
      return method.apply(this, arguments);
    };
    return validated;
  };

  return this;

}.apply({});

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = obj;
} else{
  window.typeshave = obj
	if( !console.error ) { console.error = console.log }
}

