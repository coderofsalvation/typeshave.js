{spawn} = require 'child_process'
{print} = require 'util'
fs      = require 'fs'

spawnAndRun = (command, args, callback) ->
  subproc = spawn(command, args)
  subproc.stderr.on 'data', (data) ->
  process.stderr.write data.toString()
  subproc.stdout.on 'data', (data) ->
  print data.toString()
  subproc.on 'exit', (code) ->
  callback?() if code is 0

test = (callback) ->
  woof = '''
                          ___                       ___ __ 
   .--.--.--.-----.-----.'  _.--.--.--.-----.-----.'  _|  |
   |  |  |  |  _  |  _  |   _|  |  |  |  _  |  _  |   _|__|
   |________|_____|_____|__| |________|_____|_____|__| |__|
                                                         
  '''
  console.log woof
  require './test/test.coffee'

task 'test', 'Run all tests', ->
  test()
