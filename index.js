let clone     = o => JSON.parse(JSON.stringify(o));

module.exports = function() {

  let typeshave = this;

  this.tv4 = require('tv4-node').tv4;
  this.validate = function(data,schema) { 
    let _data = data;
    if (data && (data.callee != null)) { _data = Array.prototype.slice.call(data); }
    if (!(schema.type != null)) { // for inline function wrappers only (simple args and not phat object)
      let objdata = {}; let i=1; for (let k in schema) { let v = schema[k];       objdata[k] = data[i++];  _data = objdata; }
      schema = { type: "object", required: Object.keys(schema),  properties: schema };
    }
    return typeshave.tv4.validate(_data, schema); 
  };

  this.verbose = 0;

  this.onError = err => {
    if (this.verbose > 0) { console.log(JSON.stringify({'typeshave exception': err},null,2)); }
    throw new Error("TYPESAFE_FAIL");
  };

  this.typesafe = function(schema,method) {
    let validated = function() {
      let args = {};  let _schema = clone(schema);
      if (!(_schema.type != null)) { // for inline function wrappers only (simple args and not phat object)
        let i=0; for (let k in schema) { var v = schema[k];         args[k] = arguments[i++]; }
        _schema = { type: "object", required: Object.keys(schema),  properties: schema };
      } else { args = arguments[0]; }
      var v = typeshave.validate(args, _schema);
      if (!v) {
        let dump = { data: args, errors: v.error, schema: _schema };
        throw new Error(dump);
      }
      return method.apply(this, arguments);
    };
    return validated;
  };

  return this;

}.apply({});
