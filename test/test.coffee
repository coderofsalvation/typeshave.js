typeshave = require('../.')
typeshave.verbose = 1
typesafe = typeshave.typesafe 

mydata =
  type:"object"
  properties:
    foo: type:"string"  ,regex:'/abc/' ,required:true
    bar: type:"integer" ,minimum:0     ,maximum:100
    records:
      type:"array"
      required: true
      items:{
        type: "object"
        properties:
          name: type:"string",minLength:2
          age:{type:"integer"}
      }
                                                      
foo = typesafe mydata, ( data ) ->                    
  process.exit 1 if data.foo is not "flop"
  process.exit 1 if data.records[0].age is not 5
  process.exit 1 if data.records[0].name is not "flop"

caught = false
try
  foo { }
catch TYPESAFE_FAIL
  caught = true
  console.log "ok"

process.exit 1 if not caught

foo {
  foo: "flop"
  records: [{name:"flop",age:5}]
  unknown:true
}

foo = typesafe
  foo: { type: "string"  }
  bar: { type: "integer" }
, ( foo, bar ) ->
  console.log "foo()"
  process.exit 1 if foo is not "123"
  process.exit 1 if bar is not 234

foorev = typesafe
  bar: { type: "integer" }
  foo: { type: "string"  }
, ( bar, foo ) ->
  console.log "foo()"
  process.exit 1 if bar is not 234
  process.exit 1 if foo is not "123"

bar = typesafe
  one: { type:"integer" }
  two: { type:"integer" }
, ( one, two ) ->
  console.log "bar()"
  process.exit 1 if one is not 456
  process.exit 1 if two is not 567

try 
  foo "123", 234
  foorev 234, "123" 
  bar 456, 567
  console.log "everything ok"
catch err 
  process.exit 1
  

process.exit 0
