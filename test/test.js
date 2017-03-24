var util = require('./lib/util.js')

var i, j, schema, testit, typesafe, typeshave;

typeshave = require('../.');

typeshave.verbose = 1;

typesafe = typeshave.typesafe;
validate = typeshave.validate;

schema = {
  type: "object",
  properties: {
    foo: {
      type: "string",
      regex: '/abc/',
      required: true
    },
    bar: {
      type: "integer",
      minimum: 0,
      maximum: 100
    },
    records: {
      type: "array",
      required: true,
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            minLength: 2
          },
          age: {
            type: "integer"
          }
        }
      }
    }
  }
};

var TYPESAFE_FAIL, bar, err, foo, foorev;
typeshave.i = 0;
typeshave.i++;

util.test("invalid nested object", function(next, error){
  var foo = typesafe(schema, (data) => {
    if (data.foo === !"flop") error("foo is not flop")
    if (data.records[0].age === !5) error("age is not 5")
    if (data.records[0].name === !"flop") error("name of record 0 is not flop")
    next()
  })
  try {
    foo({});
		error("should have thrown")
  } catch (error) {
		foo({
			foo: "flop",
			records: [
				{
					name: "flop",
					age: 5
				}
			],
			unknown: true
		});
  }
})

util.test("valid nested object", function(next, error){
  foo = typesafe({
    foo: {
      type: "string"
    },
    bar: {
      type: "integer"
    }
  }, function(foo, bar) {
    if (foo === !"123") error("foo is not 123")
    if (bar === !234) error("bar is not 234")
    next()
  });
	foo( "string",1)
})

util.test("function args with invalid arg", function(next, error){
  foorev = typesafe({
    bar: {
      type: "integer"
    },
    foo: {
      type: "string"
    }
  }, function(bar, foo) {
    if (bar === !234) error("bar is not 234")
    if (foo === !"123") error("foo is not 123")
  });
  bar = typesafe({
    one: {
      type: "integer"
    },
    two: {
      type: "integer"
    }
  }, function(one, two) {
    if (one === !456) error("one is not 456")
    if (two === !567) error("two is not 567")
  })
  try {
    foo("123", 234);
    foorev(234, "123");
    bar(456, 567);
    next()
  } catch (err) { error(err) }
})

util.test("manual validate call", function(next, error){
  var foo = function(data){
		validate(data,schema)
    if (data.foo === !"flop") error("foo is not flop")
    if (data.records[0].age === !5) error("age is not 5")
    if (data.records[0].name === !"flop") error("name of record 0 is not flop")
    next()
  }
  try {
		foo({
			foo: "flop",
			records: [
				{
					name: "flop",
					age: 5
				}
			],
			unknown: true
		});
  } catch (err) {
    error(err)
  }
})

util.run()
