# Color-JS

*v1.0.0*

A JavaScript Color Prototype.

## Constructors

Each of the folowing constructors creates the same `Color` object.

```javascript
new Color(51, 102, 153);
new Color(51, 102, 153, 1);
new Color("rgb(51, 102, 153)");
new Color("rgba(51, 102, 153, 1)");
new Color("#369");
new Color("#336699");
new Color("#369F");
new Color("#336699FF");
new Color("hsl(210, 50%, 40%)");
new Color("hsla(210, 50%, 40%, 1)");
new Color("hsv(210, 67%, 60%)");
new Color("hsva(210, 67%, 60%, 1)");
new Color("cmyk(67%, 33%, 0%, 40%)");
new Color("cmyka(67%, 33%, 0%, 40%, 1)");
```

## Formats

### Getting a Color Format
Colors can be retrived in each of the following formats:

```javascript
var color = new Color(51, 102, 153);
console.log(color.rgb)  // rgb(51, 102, 153)
console.log(color.hex)  // #336699
console.log(color.hsl)  // hsl(210, 50%, 40%)
console.log(color.hsv)  // hsv(210, 67%, 60%)
console.log(color.cmyk) // cmyk(67%, 33%, 0%, 40%)
color = new Color(51, 102, 153, 0.6);
console.log(color.rgb)  // rgba(51, 102, 153, 0.6)
console.log(color.hex)  // #33669999
console.log(color.hsl)  // hsl(210, 50%, 40%, 0.6)
console.log(color.hsv)  // hsv(210, 67%, 60%, 0.6)
console.log(color.cmyk) // cmyk(67%, 33%, 0%, 40%, 0.6)
```

### Setting the Color by Format
After a color has been instantiated, you can reassign the color using any of the formats.

```javascript
var color = new Color(51, 102, 153);
color.rgb = "rgb(200, 0, 150)";
console.log(color.hex); // #c80096
color.hex = "#f90";
console.log(color.hex); // #ff9900
color.hsl = "hsl(210, 85%, 50%)";
console.log(color.hex); // #ff9900
color.hsv = "hsv(183, 40%, 90%)";
console.log(color.hex); // #8ae1e6
color.cmyk = "cmyk(20%, 40%, 60%, 80%)";
console.log(color.hex); // #8ae1e6
```

You can also set the alpha component by adding an "a" to the end of the fomat name and appending the alpha component, for example:

```javascript
color.hsl = "hsla(210, 85%, 50%, 0.45)";
console.log(color.hex); // #1380ec73
```

## Components
You can get or set the following components

### `red`
A number between `0` to `255`.

### `green`
A number between `0` to `255`.

### `blue`
A number between `0` to `255`.

### `alpha`
A number between `0` and `1`.

### `hue`
A number between `0` and `359`.

### `saturation`
A number between `0` and `100` (%).

### `lightness`
A number between `0` and `100` (%).

### `brightness`
A number between `0` and `100` (%).

### `black`
A number between `0` and `100` (%).

### `white`
A number between `0` and `100` (%).

### `cyan`
A number between `0` and `100` (%).

### `magenta`
A number between `0` and `100` (%).

### `yellow`
A number between `0` and `100` (%).

### `luminance`
A number between `0` and `100` (%). 
**This value is READ ONLY**

## Manipulation Methods
These methods create a copy of the color and manipulate that color and return it, the original color is not modified.

### `clone(): Color`
Returns a deep copy of the current color.

### `grayscale([string method]): Color`
Returns a grayscaled copy of the color using one of the following methods:
  - "average": Averages the RGB components
  - "max": Takes the maximum of the RGB components
  - "min": Takes the minimum of the RGB components
  - "desaturate": Sets the "saturation" component to `0`
  - "rec709": Finds the luminance using the "rec709" standard
  - "smpte249": Finds the luminance using the "smpte249" standard
  - "rec601"/"SMPTE-C": Finds the luminance using the "rec601" (aka "SMPTE-C") standard (this is the default value).

### `saturate(int percentage): Color`
Returns a copy of the color with its saturation increased by the specifed percentage.

### `desaturate(int percentage): Color`
Returns a copy of the color with its saturation decreased by the specifed percentage.

### `darken(int percentage): Color`
Returns a copy of the color with its "lightness" decreased by the specified percentage.

### `lighten(int percentage): Color`
Returns a copy of the color with its "lightness" increased by the specified percentage.

### `shift(int degrees): Color`
Returns a copy of the color with its "hue" shifted by the specified number of degrees.

### `blend(var color [, int percentage]): Color`
Returns a color which is a mixture of the current color and provided color. The provided color can be a `Color` object or a string in a format that the `Color`'s constructor accepts. The optional second argument is an integer (percentage) indicating how much of the provided color should be mixed into the current color, this is `50` by default making the results a perfect 50/50 mix.

### `compliment(): Color`
Returns a copy of the color with a 180 degree hue shift.

### `inverse(): Color`
Returns a copy of the color with each of its RBG components inverted (newRed = 255 - red, newGreen = 255 - green, newBlue = 255 - blue).

### `adjust(object values): Color`
Returns a copy of the color with the specified adjustments applied to it. The only argument should be an object whos keys are the components you wish to adjust with the adjustment values. The "luminance" component is immutable.
The adjustments are applied in the order they are specified.

```javascript
var color = new Color(51, 102, 153);
var newColor = color.adjust({
  hue: 15, // shift the hue up 15 degrees
  saturation: -10, // decrease the saturation by 10 degrees
  red: -20, // decrease the red component by 20 (out of 255)
  brightness: 20 // increase the brightness by 20%
});
console.log(newColor); // #386fc2
```
