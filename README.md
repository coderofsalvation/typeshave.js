TYPESHAVE 
=========

Prevent functions from exploding with garbage-in garbage-out.

<center><img src="https://raw.githubusercontent.com/coderofsalvation/typeshave/gh-pages/logo.png"/></center>

Guard your function's incoming data using typeshave wrappers in JS & PHP ([typeshave website](http://typeshave.isvery.ninja)).

    npm install typeshave

Usage:   

    typeshave         = require("typeshave").typesafe;
    typesafe          = typeshave.typesafe 

    COFFEESCRIPT                            JAVASCRIPT
    ============                            ==========
    foo = typesafe                          var foo = typesafe({
      foo: type: "string"                     foo: { type: "string" }
      bar: type: "integer",required:true      bar: { type: "integer", required:true }
    , ( foo, bar ) ->                       }, function(foo, bar) {
      console.log "arguments are valid"       return console.log("arguments are valid");
                                            });
    
    foo(1); # fail please?                  foo(1); // fail please?

> typeshave uses the establish [jsonschema](http://jsonschema.net) validation-format. Re-usable 
in many other areas (database-, restpayload-, form-validation and so on). For usage in the browser usage below

## Wow what is that?

By specifying a jsonschema like above, running foo() would result in 2 warnings + an TYPESAFE_FAIL exception : 

    typesafe error:  Wrong type, expected string: foo 
    typesafe error:  Missing required property: bar
    TYPESAFE_FAIL

so we can gracefully deal with this using `try` `catch` and `finally` blocks

## Why should I use this

> Thy shalt not pass around nested data without doing integrity-checks.

Ever ran into this situation? :

    foo( { foo:"bar", bar: 123, records: [ 1, 2 ] } );

    function foo(data){
      if( data == undefined data.bar == undefined || bar == undefined || Argh this is a big PITA 
      // omg how do I even check properties recursively?
      // argh..forget about it..YOLO..fingers crossed ?

Then obviously at some point this happens:

<center><img src="http://www.gifbin.com/bin/102009/1256553541_exploding-trash.gif"/></center>

> Well not anymore with typeshave :)

## Usecases

Use it when dealing with :

* REST payloads 
* objects which represent configs or options 
* datastructures and resultsets for html-rendering or processing purposes

## What about type-safe nested structures?

Passing around big-ass nested data?
You better police that data upfront:

     typesafe = require('typeshave').typesafe              
 
     mydata =                                              
       type: "object"
       properties:                                         
         foo: { type: "string", regex: /abc/, required:true }             
         bar: { type: "integer", minimum: 0, maximum: 100 }
         records:                                          
           type: "array"                                   
           required: true
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

## Overrule default behaviour

    require("typeshave").onError = yourfunction;

## Conclusion

No more :

* functions going out of control
* assertions-bloat inside functions 
* complaining about javascript not being typesafe
* unsafe nested datastructures 
* verbose unittests doing typesafe stuff 
