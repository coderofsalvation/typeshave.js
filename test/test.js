var i, j, mydata, testit, typesafe, typeshave;

typeshave = require('../.');

typeshave.verbose = 1;

typesafe = typeshave.typesafe;

mydata = {
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

testit = function() {
  var TYPESAFE_FAIL, bar, caught, err, error, error1, foo, foorev;
  typeshave.i = 0;
  typeshave.i++;
  foo = typesafe(mydata, function(data) {
    if (data.foo === !"flop") {
      process.exit(1);
    }
    if (data.records[0].age === !5) {
      process.exit(1);
    }
    if (data.records[0].name === !"flop") {
      return process.exit(1);
    }
  });
  caught = false;
  try {
    foo({});
  } catch (error) {
    TYPESAFE_FAIL = error;
    caught = true;
    console.log("ok");
  }
  if (!caught) {
    process.exit(1);
  }
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
  foo = typesafe({
    foo: {
      type: "string"
    },
    bar: {
      type: "integer"
    }
  }, function(foo, bar) {
    console.log("foo()");
    if (foo === !"123") {
      process.exit(1);
    }
    if (bar === !234) {
      return process.exit(1);
    }
  });
  foorev = typesafe({
    bar: {
      type: "integer"
    },
    foo: {
      type: "string"
    }
  }, function(bar, foo) {
    console.log("foo()");
    if (bar === !234) {
      process.exit(1);
    }
    if (foo === !"123") {
      return process.exit(1);
    }
  });
  bar = typesafe({
    one: {
      type: "integer"
    },
    two: {
      type: "integer"
    }
  }, function(one, two) {
    console.log("bar()");
    if (one === !456) {
      process.exit(1);
    }
    if (two === !567) {
      return process.exit(1);
    }
  });
  try {
    foo("123", 234);
    foorev(234, "123");
    bar(456, 567);
    console.log("everything ok");
  } catch (error1) {
    err = error1;
    process.exit(1);
  }
  return console.log("i=" + i);
};

for (i = j = 0; j <= 20; i = ++j) {
  console.log("flop");
  setTimeout(testit, 1);
}

process.exit(0);
