
# squish.js
A useless tool to pin a page's width and height and then css transform the window to stretch to fill it.

# Help me
```javascript

// by default the affected element is document.body
var squish = new Squish()

// pro tip: advanced
var squish = new Squish({
  element: '#squishy', // CSS selector or HTML element
  transition: 0.2 // CSS transition duration
})

// pin and stretch at the current window width and height
squish.pin()
// or supply a width and height to pin at
squish.pin(700, 500)
// let it go
squish.unpin()

```
