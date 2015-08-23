TYPESHAVE 
=========

Lightweight function wrapper to ensure typesafe data. Wrap functions,forms,api's and more with jsonschema.
Guard your function's incoming data using typesafe wrappers.
Prevent functions from exploding with garbage-in garbage-out.

<center><img src="http://www.gifbin.com/bin/102009/1256553541_exploding-trash.gif"/></center>

## Usage 

When passing around 'phat object' data-structure to functions:

    foo( { foo:"bar", bar: 123, records: [ 1, 2 ] } );

Typesafe will make sure your functions will only accept valid datastructures:

     COFFEESCRIPT                                            JAVASCRIPT
     ============                                            ==========
     
     typesafe = require('typeshave').typesafe                var foo, mydata, typeshave;
 
     mydata =                                                typesafe = require('typeshave').typesafe;
       type: "object"
       properties:                                           mydata = {
         required: ["foo","records"]                           type: "object",
         foo: { type: "string", regex: /abc/ }                 properties: {
         bar: { type: "integer", minimum: 0, maximum: 100 }      required: ["foo","records"] 
         records:                                                foo: {
           type: "array"                                           type: "string",
           items: [{                                               regex: /abc/
             name: { type: "string", minLength: 2 }              },
             age:  { type: "integer"              }              bar: {
           }]                                                      type: "integer",
                                                                   minimum: 0,
     foo = typesafe mydata, ( data ) ->                            maximum: 100
       console.log "valid data passed!"                          },
       # do something with data                                  records: {
                                                                   type: "array",
                                                                   items: [
                                                                     {
                                                                       name: {
                                                                         type: "string",
                                                                         minLength: 2
                                                                       },
                                                                       age: {
                                                                         type: "integer"
                                                                       }
                                                                     }
                                                                   ]
                                                                 }
                                                               }
                                                             };
 
                                                             foo = typeshave(mydata, function(data) {
                                                               return console.log("valid data passed!");
                                                             });

## Ready, set, go!

By specifying a jsonschema like above, passing incomplete data like this:

    foo {}

would result in 2 warnings + an TYPESAFE_FAIL exception : 

    typesafe error:  Missing required property: foo
    typesafe error:  Missing required property: records
    TYPESAFE_FAIL

so we can gracefully deal with this using `try` `catch` and `finally` blocks

## Get the full punishment!

or when environment variable 'DEBUG' is set you'll get *all* info:

    {
      "data": {},
      "errors": {
        "errors": [
          {
            "message": "Missing required property: foo",
            "params": {
              "key": "foo"
            },
            "code": 302,
            "dataPath": "",
            "schemaPath": "/required/0",
            "subErrors": null,
            "stack": "Error\n  at 
    ...

## Wrap functions into typesafe functions

    COFFEESCRIPT                          JAVASCRIPT
    ============                          ==========
    foo = typesafe                        var foo = typesafe({
      foo: { type: "string"  }              foo: { type: "string" }
      bar: { type: "integer" }              bar: { type: "integer" }
    , ( foo, bar ) ->                     }, function(foo, bar) {
      console.log "arguments are valid"     return console.log("arguments are valid");
                                          });

## Conclusion

No more :

* functions going out of control
* assertions-bloat inside functions 
* complaining about javascript not being typesafe
* unsafe recursive datastructures 
* verbose unittests doing typesafe stuff 

Typeshave deals with problems immediately when they occur
