TYPESHAVE 
=========

Prevent functions from exploding with garbage-in garbage-out.

![Build Status](https://travis-ci.org/coderofsalvation/typeshave.js.svg?branch=master)

<center><img src="https://raw.githubusercontent.com/coderofsalvation/typeshave/gh-pages/logo.png"/></center>

Typecheck functionguards for function arguments and (nested) objects when it matters (REST payloads etc):

Usage:   

    typeshave         = require("typeshave")
    typesafe          = typeshave.typesafe

    var foo = typesafe({
      foo: { type: "string" }
      bar: { type: "integer", required:true }
    }, (foo, bar) => {
      return console.log("arguments are valid");
    });

    foo(1); // throws typesafe exception

> NOTE: typeshave is built on the shoulders of the [jsonschema](http://jsonschema.net) standard. 

Output:
  
    Error: 
    {
      "data": 1,
      "errors": {
        "errors": [
          {
            "message": "Argument foo should be string"

## Why should I use this? 

Ever ran into this situation? :

    foo( { foo:"bar", bar: 123, records: [ 1, 2 ], cbs: [myfunction] } );

    function foo(data){
      if( data == undefined data.bar == undefined || bar == undefined || Argh this is a big PITA 
      // omg how do I even check properties recursively?
      // argh..forget about it? YOLO?
      // *wait until disaster happens*

Say bye bye to 

* the temptation of typescript?
* functions going out of control
* assertions-bloat inside functions 
* complaining about javascript not being 
* unsafe nested datastructures 
* verbose unittests doing typesafe stuff 

## Recover from errors:

The `typeshave.error(errors)` function is triggered in case of errors, you can define your own like so:

    typeshave.error = (errors) => {
      console.error(errors)
      return new Error(errors)
    }

## What about type-safe nested structures?

Passing around big-ass nested data?
You better police that data upfront:

     schema = {                                             
       type: "object", 
       properties:{                                         
         foo: { type: "string", regex: /abc/, required:true }, 
         bar: { type: "integer", minimum: 0, maximum: 100 }, 
         records:{
           type: "array", 
           required:true, 
           items: {
             type:"object", 
             properties: {
              name: { type: "string", minLength: 2 }, 
              age:  { type: "integer"              }       
             }
           } 
         }, 
         cbs: { type: "array", items: { type: "function", required :true } }
      }
                                                           
     function foo = typesafe( schema, ( data ) => {                    
       console.log "valid data passed!"                    
       # do something with data                            
     }


Then obviously at some point this happens:

<center><img src="http://www.gifbin.com/bin/102009/1256553541_exploding-trash.gif"/></center>

> Well not anymore with typeshave :)

## Usecases

* REST payloads 
* payment transaction payloads
* objects which represent configs or options 
* datastructures and resultsets for html-rendering or processing 

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

## Manual validation

Manual validation is always at your fingertips as well:

      var typeshave = require('typeshave)
      var validate  = typeshave.validate

      var foo = function(foo,bar)
         validate( arguments, {               // throws exception in case of error
          foo: { type: "string" },
          bar: { type: "boolean" }
        });
        // do stuff with data

> The example uses `arguments` as input, but passing an object would work as well.
