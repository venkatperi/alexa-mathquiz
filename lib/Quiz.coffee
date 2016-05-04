_ = require './util/string'
{SessionContext} = require( 'alexa-express' )
Provider = require './provider'

fields =
  started : undefined
  finished : undefined
  score : undefined
  valid : undefined
  current : undefined
  questions : undefined
  question : undefined
  answer : undefined
  prevAnswer : undefined
  count : undefined
  type : ( v ) -> if v? then _.capitalize( v.toLowerCase() ) else v
  size : (v) -> v?.toLowerCase()

sizes =
  small : 20
  medium : 40
  large : 60
  huge : 80

module.exports = class Quiz extends SessionContext

  init : =>
    @on "changed:size", @onSizeChanged
    @on "changed:current", @onCurrentChanged

    for own k,v of fields
      @fields[ k ] = v
    super()

    if @started()
      @createProvider()
      @provider.list = @questions()

  clear : =>
    @started false
    @finished false
    @current 1
    @score 0
    @answer 0
    @type 'addition'
    @size 'medium'

  onSizeChanged : ( value ) =>
    @count sizes[ value ]

  createProvider : =>
    @provider = new Provider[ @type() ]()

  start : =>
    return if @started()
    @createProvider()
    @questions @provider.generate @count()
    @current 1
    @started true

  next : =>
    c = @current() + 1
    count = @count()
    if c <= count
      @current c
    else
      @finished true

  onCurrentChanged : ( value ) =>
    return unless @provider?
    @question @provider.question value - 1
    @prevAnswer @answer()
    @answer @provider.answer value - 1

  validate : ( ans ) =>
    return if @finished()
    @valid ans is @answer()
    @score @score() + 1 if @valid()
    @next()
    
