

;(function () {
  'use strict'
  // GLOBAL VARIABLES
  var windowW = getWindowWidth()
  var windowH = getWindowHeight()

  var scaleString = ' scale(1,1)'

  // UTILITIES
  function getWindowWidth() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth

    return x
  }

  function getWindowHeight() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        y = w.innerHeight || e.clientHeight || g.clientHeight

    return y
  }

  function remap(x, in_min, in_max, out_min, out_max) {
    if (x < in_min) {
      x = in_min
    }
    if (x > in_max) {
      x = in_max
    }
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
  }



  // CREATE CONSTRUCTOR
  function Squish(options) {
    var options = options || {}

    if (typeof options.element === 'string') {
      options.element = document.querySelector(element)
    }

    this.element = options.element || document.body
    this.element.style.transform = scaleString

    if (options.transition) this.element.style.transition = 'transform '+options.transition+'s'

    var _this = this
    window.addEventListener('resize', function() {
      resizeHandler(_this)
    }, false)
  }

  Object.assign(Squish.prototype, {
    scaleW: 1,
    scaleH: 1,
    isFrozen: false
  })

  // called on every resize
  function resizeHandler(squishInstance) {
    windowW = getWindowWidth()
    windowH = getWindowHeight()

    if (squishInstance.isFrozen) {

      // calculate scaleW
      squishInstance.scaleW =  windowW / squishInstance.frozenW
      // calculate scaleH
      squishInstance.scaleH = windowH / squishInstance.frozenH

      squishInstance.updateCSS()


    } else {

      squishInstance.scaleW = 1
      squishInstance.scaleH = 1
    }

  }

  Squish.prototype.updateCSS = function() {
    this.element.style.width = this.frozenW+'px'
    this.element.style.height = this.frozenH+'px'
    this.element.style['transform-origin'] = 'top left'
    var transformString = this.element.style.transform
    var newScaleString = ' scale('+this.scaleW+','+this.scaleH+')'
    // this.element.style.transform = transformString.replace(scaleString, newScaleString)
    this.element.style.transform = newScaleString
    scaleString = newScaleString
  }

  Squish.prototype.clearCSS = function() {
    var transformString = this.element.style.transform
    // do better parsing of transforms here, it shouldnt overwrite other transforms
    transformString = ''
    this.element.style.transform = transformString
  }

  // API
  Squish.prototype.pin = function(width, height) {
    this.isFrozen = true

    if (width && height) {
      this.frozenW = width
      this.frozenH = height
    } else {
      this.frozenW = windowW
      this.frozenH = windowH
    }

    // recalculate css
    resizeHandler(this)

    return this
  }

  Squish.prototype.unpin = function() {
    if (this.isFrozen) {
      this.isFrozen = false
      document.body.transform = ''

      this.clearCSS()
    }

    return this
  }

  // export constructor
  window.Squish = Squish


})();
