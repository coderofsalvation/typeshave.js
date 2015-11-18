TYPESHAVE 
=========

Prevent functions from exploding with garbage-in garbage-out.

<center><img src="https://raw.githubusercontent.com/coderofsalvation/typeshave/gh-pages/logo.png"/></center>

Guard your function's incoming data using typeshave wrappers in JS & PHP ([typeshave website](http://typeshave.isvery.ninja)).

    npm install typeshave

Usage:   

    typeshave         = require("typeshave").typesafe;
    typesafe          = typeshave.typesafe 

    COFFEESCRIPT                          JAVASCRIPT
    ============                          ==========
    foo = typesafe                        var foo = typesafe({
      foo: { type: "string"  }              foo: { type: "string" }
      bar: { type: "integer" }              bar: { type: "integer" }
    , ( foo, bar ) ->                     }, function(foo, bar) {
      console.log "arguments are valid"     return console.log("arguments are valid");
                                          });
    
    foo(); # fail please?                 foo(); // fail please?

> typeshave uses the establish [jsonschema](http://jsonschema.net) validation-format. Re-usable 
in many other areas (database-, restpayload-, form-validation and so on). For usage in the browser usage below

## Ohoh..now what?

By specifying a jsonschema like above, running foo() would result in 2 warnings + an TYPESAFE_FAIL exception : 

    typesafe error:  Missing required property: foo
    typesafe error:  Missing required property: bar 
    TYPESAFE_FAIL

so we can gracefully deal with this using `try` `catch` and `finally` blocks

## Overrule default behaviour

    require("typeshave").onError = yourfunction;

## What about type-safe nested structures?

Passing around big-ass nested data?
You better police that data upfront:

     typesafe = require('typeshave').typesafe              
 
     mydata =                                              
       type: "object"
       properties:                                         
         required: ["foo","records"]                       
         foo: { type: "string", regex: /abc/ }             
         bar: { type: "integer", minimum: 0, maximum: 100 }
         records:                                          
           type: "array"                                   
           items: {                                        
             type:"object"
             properties: "
              name: { type: "string", minLength: 2 }       
              age:  { type: "integer"              }       
           ]                                               
                                                           
     foo = typesafe mydata, ( data ) ->                    
       console.log "valid data passed!"                    
       # do something with data                            

## Get full punishment!

do this:

    typeshave.verbose = 1

open your console, and accept reality:

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

## why non-typesafe is ok, except not with nested data 

For example:

* REST payloads 
* objects which represent configs or options 
* datastructures and resultsets for html-rendering or processing purposes

Are you still passing nested data around `fingers-crossed`-style?
Still wondering why functions like this explode once in a while? :D

    foo( { foo:"bar", bar: 123, records: [ 1, 2 ] } );

Did you try to 'fix' your code with if/else checks?

    if( data == undefined data.bar == undefined || bar == undefined || Argh this is a big PITA 
    // omg how do I even check properties recursively?

## In the browser 

    <script src="typeshave.min.js"></script>
    <script>
      typeshave = require("typeshave").typesafe;

      var foo = typeshave({
        foo: { type: "string" },
        bar: { type: "boolean" }
      }, function(foo,bar){
        alert("ok data passed!");
      });

      foo( "string", true );
    </script>


## Conclusion

No more :

* functions going out of control
* assertions-bloat inside functions 
* complaining about javascript not being typesafe
* unsafe nested datastructures 
* verbose unittests doing typesafe stuff 

Typeshave deals with problems immediately when they occur to prevent this:

<center><img src="http://www.gifbin.com/bin/102009/1256553541_exploding-trash.gif"/></center>
