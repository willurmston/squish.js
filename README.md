
# squish.js
A useless tool to freeze a page's width and height and then css transform the window to stretch to fill it.

# Help me
```javascript

// by default the affected element is document.body
var squish = new Squish()
// pro tip: you can also supply an element or selector to the constructor
var squishyText = new Squish('.text')

// freeze and stretch at the current window width and height
squish.freeze()
// or supply a width and height to freeze at
squish.freeze(700, 500)
// let it go
squish.unfreeze()

```
