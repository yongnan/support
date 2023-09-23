# CSS

[Source](https://medium.com/@AmanPawasker/8-essential-css-tips-every-web-developer-must-know-5991a8ca929e)

## Essential CSS Tips

## 1. CSS Box Shadow.

→ The box-shadow property is used to apply a shadow to HTML elements.

Syntax:

→ box-shadow: none I h-offset v-offset blur spread color | inset initial | inherit;

```css
div{
  box-shadow: 15px 15px 10px 20px #fff;
}
```

## 2. Resize Images to fit a div Container.

→ You can resize an image to fit a div container using the height, width, and object-fit properties.

```css
img{
	height: 100%;
	width: 100%;
	object-fit: contain;
}
```

## 3: Truncate Text With Ellipsis.

→ You can truncate the overflowing text with an ellipsis (…) using the text-overflow CSS property.

```css
.text {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 300px;	
}
```

## 4. Hover Effects.

→ You can add a hover effect to an HTML element using the : hover selector. Example: Adding hover effect to a button element.

```css
button:hover {
	color: #0352FF;
	border: #0435FF solid 1px;
	background: #cc2219;
}
```

## 5. CSS Text Shadow.

→ The text-shadow CSS property adds shadows and layers to the text. The textshadow property accepts a comma-separated list of shadows to be applied to the text.

Syntax of the text-shadow CSS Property

Note: The color and blur-radius arguments are optional↓

```css
// offset-x / offset-y i blur-radius I color
	text-shadow: 2px 2px 4px red;

// color / offset-x / offset-y i blur-radius */
	text-shadow: #ff23ed 1px 2px 10px;


```

## 6: Using Single-Line Property Declaration.

→ You can use the shorthand properties in CSS to make your code concise and easily readable.

→ For example, the background is a shorthand property that allows you to define the values of background-color, background-image, background-repeat, and background-position.

```css
div {
	background: black url(images/xyz.png) no-repeat right top;
}
```

## 7. Using text-transform.

→ You can force text to be uppercased, lowercased, or capitalized using the text-transform CSS property.

```css
.uppercase{
	text-transform: uppercase;
}
.lowercase{
	text-transform: lowercase;
}
.capitalize{
	text-transform: capitalize;
}
```

## 8. Overriding all the Styles

→ In CSS, the !important means that “this is important”, ignore all the subsequent rules, and apply !important rule and the !important keyword must be placed at the end of the line, immediately before the semicolon.

```css
element {
	color: saffron !important;
	font-size: 20px !important;
}
```

→ You can override all other style declarations of an attribute (including inline styles) using the !important directive at the end of a value.