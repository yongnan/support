# CSS

[source](https://www.w3schools.com/css/default.asp)

# Colors

RGB, HEX, HSL, RGBA, HSLA 

## RGB

**rgb(***red,* *green***,** *blue***)**

## RGBA

**rgba(***red,* *green***,** *blue, alpha***)**

The alpha parameter is a number between 0.0 (fully transparent) and 1.0 (not transparent at all):

## HEX

Where rr (red), gg (green) and bb (blue) are hexadecimal values between 00 and ff (same as decimal 0-255).

For example, #ff0000 is displayed as red, because red is set to its highest value (ff) and the others are set to the lowest value (00).

To display black, set all values to 00, like this: #000000.

To display white, set all values to ff, like this: #ffffff.  

## 3 Digit HEX

**#***rgb*

The 3-digit hex code can only be used when both the values (RR, GG, and BB) are the same for each components. So, if we have #ff00cc, it can be written like this: #f0c.

## HSL

**hsl(***hue***,** *saturation***,** *lightness***)**

**Hue** is a degree on the color wheel from 0 to 360. 0 is red, 120 is green, and 240 is blue.

**Saturation** is a percentage value, 0% means a shade of gray, and 100% is the full color.

**Lightness** is also a percentage, 0% is black, 50% is neither light or dark, 100% is white

### Saturation

Saturation can be described as the intensity of a color.

100% is pure color, no shades of gray

50% is 50% gray, but you can still see the color.

0% is completely gray, you can no longer see the color.

### Lightness

The lightness of a color can be described as how much light you want to give the color, where 0% means no light (black), 50% means 50% light (neither dark nor light) 100% means full lightness (white).

### Shades of Gray

Shades of gray are often defined by setting the hue and saturation to 0, and adjust the lightness from 0% to 100% to get darker/lighter shades:

## HSLA Value

HSLA color values are an extension of HSL color values with an alpha channel - which specifies the opacity for a color.

An HSLA color value is specified with:

hsla(*hue,* *saturation*, *lightness, alpha*)

# Backgrounds

In these chapters, you will learn about the following CSS background properties:

- `background-color`
- `background-image`
- `background-repeat`
- `background-attachment`
- `background-position`
- `background` (shorthand property)

## Opacity

```
div {
 background-color: green;
 opacity: 0.3;
}
```

---
**NOTE**

 When using the `opacity` property to add transparency to the background of an element, all of its child elements inherit the same transparency. This can make the text inside a fully transparent element hard to read.

## Transparency using RGBA

If you do not want to apply opacity to child elements, like in our example above, use **RGBA** color values.

```
div {
  background: rgba(0, 128, 0, 0.3) /* Green background with 30% opacity */
}
```

## background-attachment

background-attachment: scroll|fixed|local|initial|inherit;

## Property Values

| Value   | Description                                                  |
| :------ | :----------------------------------------------------------- |
| scroll  | The background image will scroll with the page. This is default |
| fixed   | The background image will not scroll with the page           |
| local   | The background image will scroll with the element's contents |
| initial | Sets this property to its default value. [Read about *initial*](https://www.w3schools.com/cssref/css_initial.asp) |
| inherit | Inherits this property from its parent element. [Read about *inherit*](https://www.w3schools.com/cssref/css_inherit.asp) |

## CSS Syntax

background: *bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment* initial|inherit;

# Borders

## Border Style

The `border-style` property specifies what kind of border to display.

The following values are allowed:

- `dotted` - Defines a dotted border
- `dashed` - Defines a dashed border
- `solid` - Defines a solid border
- `double` - Defines a double border
- `groove` - Defines a 3D grooved border. The effect depends on the border-color value
- `ridge` - Defines a 3D ridged border. The effect depends on the border-color value
- `inset` - Defines a 3D inset border. The effect depends on the border-color value
- `outset` - Defines a 3D outset border. The effect depends on the border-color value
- `none` - Defines no border
- `hidden` - Defines a hidden border

Demonstration of the different border styles:

```
p.dotted {border-style: dotted;}
p.dashed {border-style: dashed;}
p.solid {border-style: solid;}
p.double {border-style: double;}
p.groove {border-style: groove;}
p.ridge {border-style: ridge;}
p.inset {border-style: inset;}
p.outset {border-style: outset;}
p.none {border-style: none;}
p.hidden {border-style: hidden;}
p.mix {border-style: dotted dashed solid double;}
```

## Border Width

Example:

```
p.one {
  border-style: solid;
  border-width: 5px;
}

p.two {
  border-style: solid;
  border-width: medium;
}

p.three {
  border-style: dotted;
  border-width: 2px;
}

p.four {
  border-style: dotted;
  border-width: thick;
}
```

## Shorthand Property

Like you saw in the previous page, there are many properties to consider when dealing with borders.

To shorten the code, it is also possible to specify all the individual border properties in one property.

The `border` property is a shorthand property for the following individual border properties:

- `border-width`
- `border-style` (required)
- `border-color`

Example:

```
p {
  border: 5px solid red;
}
```

## Rounded Borders

Example:

```
p {
  border: 2px solid red;
  border-radius: 5px;
}
```

# Margins

Example:

```
p {
  margin-top: 100px;
  margin-bottom: 100px;
  margin-right: 150px;
  margin-left: 80px;
}
```

##  Shorthand Property

- margin: 25px 50px 75px 100px;
  - top margin is 25px
  - right margin is 50px
  - bottom margin is 75px
  - left margin is 100px

example:

```
p {
  margin: 25px 50px 75px 100px;
}
```

## The auto Value

You can set the margin property to `auto` to horizontally center the element within its container.

The element will then take up the specified width, and the remaining space will be split equally between the left and right margins.

Example:

```
div {
  width: 300px;
  margin: auto;
  border: 1px solid red;
}
```

## The inherit Value

This example lets the left margin of the <p class="ex1"> element be inherited from the parent element (<div>):

## Margin Collapse

Top and bottom margins of elements are sometimes collapsed into a single margin that is equal to the largest of the two margins.

# Padding

Padding is used to create space around an element's content, inside of any defined borders.

CSS has properties for specifying the padding for each side of an element:

- `padding-top`
- `padding-right`
- `padding-bottom`
- `padding-left`

Example

Use the padding shorthand property with four values:

```
div {
 padding: 25px 50px 75px 100px;
}
```



# Outline

An outline is a line that is drawn around elements, OUTSIDE the borders, to make the element "stand out".

> **Note**
> Outline differs from [borders](https://www.w3schools.com/css/css_border.asp)! Unlike border, the outline is drawn outside the element's border, and may overlap other content. Also, the outline is NOT a part of the element's dimensions; the element's total width and height is not affected by the width of the outline.

CSS has the following outline properties:

- `outline-style`
- `outline-color`
- `outline-width`
- `outline-offset`
- `outline`

# Text

## Text Alignment and Text Direction

- `text-align`
- `text-align-last`
- `direction`
- `unicode-bidi`
- `vertical-align`

| Property                                                     | Description                                                  |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [direction](https://www.w3schools.com/cssref/pr_text_direction.asp) | Specifies the text direction/writing direction               |
| [text-align](https://www.w3schools.com/cssref/pr_text_text-align.asp) | Specifies the horizontal alignment of text                   |
| [text-align-last](https://www.w3schools.com/cssref/css3_pr_text-align-last.asp) | Specifies how to align the last line of a text               |
| [unicode-bidi](https://www.w3schools.com/cssref/pr_text_unicode-bidi.asp) | Used together with the [direction](https://www.w3schools.com/cssref/pr_text_direction.asp) property to set or return whether the text should be overridden to support multiple languages in the same document |
| [vertical-align](https://www.w3schools.com/cssref/pr_pos_vertical-align.asp) | Sets the vertical alignment of an element                    |

## Text Decoration

| Property                                                     | Description                                                  |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [text-decoration](https://www.w3schools.com/cssref/pr_text_text-decoration.asp) | Sets all the text-decoration properties in one declaration   |
| [text-decoration-color](https://www.w3schools.com/cssref/css3_pr_text-decoration-color.asp) | Specifies the color of the text-decoration                   |
| [text-decoration-line](https://www.w3schools.com/cssref/css3_pr_text-decoration-line.asp) | Specifies the kind of text decoration to be used (underline, overline, etc.) |
| [text-decoration-style](https://www.w3schools.com/cssref/css3_pr_text-decoration-style.asp) | Specifies the style of the text decoration (solid, dotted, etc.) |
| [text-decoration-thickness](https://www.w3schools.com/cssref/pr_text_text-decoration-thickness.asp) | Specifies the thickness of the text decoration line          |

## Text Transformation

 is used to specify uppercase and lowercase letters in a text.

## Text Spacing

- `text-indent`
- `letter-spacing`
- `line-height`
- `word-spacing`
- `white-space`

| Property                                                     | Description                                                 |
| :----------------------------------------------------------- | :---------------------------------------------------------- |
| [letter-spacing](https://www.w3schools.com/cssref/pr_text_letter-spacing.asp) | Specifies the space between characters in a text            |
| [line-height](https://www.w3schools.com/cssref/pr_dim_line-height.asp) | Specifies the line height                                   |
| [text-indent](https://www.w3schools.com/cssref/pr_text_text-indent.asp) | Specifies the indentation of the first line in a text-block |
| [white-space](https://www.w3schools.com/cssref/pr_text_white-space.asp) | Specifies how to handle white-space inside an element       |
| [word-spacing](https://www.w3schools.com/cssref/pr_text_word-spacing.asp) | Specifies the space between words in a text                 |

#  Layout - The display Property

The `display` property specifies if/how an element is displayed.

Every HTML element has a default display value depending on what type of element it is. The default display value for most elements is `block` or `inline`.

## Block-level Elements

A block-level element always starts on a new line and takes up the full width available (stretches out to the left and right as far as it can).

Examples of block-level elements:

	- <div>
	- <h1> - <h6>
	- <p>
	- <form>
	- <header>
	- <footer>
	- <section>

## Inline Elements

An inline element does not start on a new line and only takes up as much width as necessary.

Examples of inline elements:

- <span>
- <a>
- <img>

`display` property to `none`. The element will be hidden, and the page will be displayed as if the element is not there:

`visibility:hidden;` also hides an element.

However, the element will still take up the same space as before. The element will be hidden, but still affect the layout:

# Layout - width and max-width

a block-level element always takes up the full width available (stretches out to the left and right as far as it can).

Setting the `width` of a block-level element will prevent it from stretching out to the edges of its container. Then, you can set the margins to auto, to horizontally center the element within its container. The element will take up the specified width, and the remaining space will be split equally between the two margins

**Note:** The problem with the `<div>` above occurs when the browser window is smaller than the width of the element. The browser then adds a horizontal scrollbar to the page.

Using `max-width` instead, in this situation, will improve the browser's handling of small windows. This is important when making a site usable on small devices

# Layout - The position Property

There are five different position values:

- `static`
- `relative`
- `fixed`
- `absolute`
- `sticky`

## position: static;

HTML elements are positioned static by default.

Static positioned elements are not affected by the top, bottom, left, and right properties.

## position: relative;

An element with `position: relative;` is positioned relative to its normal position.

## position: fixed;

An element with `position: fixed;` is positioned relative to the viewport, which means it always stays in the same place even if the page is scrolled. The top, right, bottom, and left properties are used to position the element.

## position: absolute;

An element with `position: absolute;` is positioned relative to the nearest positioned ancestor (instead of positioned relative to the viewport, like fixed).

However; if an absolute positioned element has no positioned ancestors, it uses the document body, and moves along with page scrolling.

**Note:** Absolute positioned elements are removed from the normal flow, and can overlap elements.

## position: sticky;

An element with `position: sticky;` is positioned based on the user's scroll position.

A sticky element toggles between `relative` and `fixed`, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it "sticks" in place (like position:fixed).

> **Note**
>  Internet Explorer does not support sticky positioning. Safari requires a -webkit- prefix (see example below). You must also specify at least one of `top`, `right`, `bottom` or `left` for sticky positioning to work.

## Positioning Text In an Image



# Box Model

Explanation of the different parts:

- **Content** - The content of the box, where text and images appear
- **Padding** - Clears an area around the content. The padding is transparent
- **Border** - A border that goes around the padding and content
- **Margin** - Clears an area outside the border. The margin is transparent

## Width and Height of an Element

In order to set the width and height of an element correctly in all browsers, you need to know how the box model works.

---

**Important:** 

When you set the width and height properties of an element with CSS, you just set the width and height of the **content area**. To calculate the full size of an element, you must also add padding, borders and margins.

---

Total element width = width + left padding + right padding + left border + right border + left margin + right margin

Total element height = height + top padding + bottom padding + top border + bottom border + top margin + bottom margin

