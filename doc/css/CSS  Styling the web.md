# [**CSS — Styling the web**](https://developer.mozilla.org/en-US/docs/Learn/CSS)

# CSS first steps

## [Adding CSS to our document](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Getting_started#adding_css_to_our_document)

To link `styles.css` to `index.html`, add the following line somewhere inside the [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head) of the HTML document:

```
<link rel="stylesheet" href="styles.css" />
```

## [Styling things based on their location in a document](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Getting_started#styling_things_based_on_their_location_in_a_document)

```
li em {
  color: rebeccapurple;
}
```

```
h1 + p {
  font-size: 200%;
}
```

## [Styling things based on state](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Getting_started#styling_things_based_on_state)

```
a:link {
  color: pink;
}

a:visited {
  color: green;
}
a:hover {
  text-decoration: none;
}
```

## [Combining selectors and combinators](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Getting_started#combining_selectors_and_combinators)

```
/* selects any <span> that is inside a <p>, which is inside an <article>  */
article p span {
}

/* selects any <p> that comes directly after a <ul>, which comes directly after an <h1>  */
h1 + ul + p {
}
```

# How CSS is structured

## [Applying CSS to HTML](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured#applying_css_to_html)

### [External stylesheet](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured#external_stylesheet)

```html
<!DOCTYPE html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <title>My CSS experiment</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This is my first CSS example</p>
  </body>
</html>
```

```html
<!-- Inside a subdirectory called styles inside the current directory -->
<link rel="stylesheet" href="styles/style.css" />

<!-- Inside a subdirectory called general, which is in a subdirectory called styles, inside the current directory -->
<link rel="stylesheet" href="styles/general/style.css" />

<!-- Go up one directory level, then inside a subdirectory called styles -->
<link rel="stylesheet" href="../styles/style.css" />
```

### [Internal stylesheet](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured#internal_stylesheet)

```html
<!DOCTYPE html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <title>My CSS experiment</title>
    <style>
      h1 {
        color: blue;
        background-color: yellow;
        border: 1px solid black;
      }

      p {
        color: red;
      }
    </style>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This is my first CSS example</p>
  </body>
</html>
```

### [Inline styles](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured#inline_styles)

```html
<!DOCTYPE html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <title>My CSS experiment</title>
  </head>
  <body>
    <h1 style="color: blue;background-color: yellow;border: 1px solid black;">
      Hello World!
    </h1>
    <p style="color:red;">This is my first CSS example</p>
  </body>
</html>
```

### [Functions](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured#functions)

#### The calc() function

```
<div class="outer"><div class="box">The inner box is 90% - 30px.</div></div>
```

```css
.outer {
  border: 5px solid black;
}

.box {
  padding: 10px;
  width: calc(90% - 30px);
  background-color: rebeccapurple;
  color: white;
}
```

#### Transform functions

```css
.box {
  margin: 30px;
  width: 100px;
  height: 100px;
  background-color: rebeccapurple;
  transform: rotate(0.8turn);
}
```

## [@rules](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured#rules)

```css
@import "styles2.css";
```

```css
body {
  background-color: pink;
}

@media (min-width: 30em) {
  body {
    background-color: blue;
  }
}
```

## [Shorthands](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured#shorthands)

Some properties like [`font`](https://developer.mozilla.org/en-US/docs/Web/CSS/font), [`background`](https://developer.mozilla.org/en-US/docs/Web/CSS/background), [`padding`](https://developer.mozilla.org/en-US/docs/Web/CSS/padding), [`border`](https://developer.mozilla.org/en-US/docs/Web/CSS/border), and [`margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin) are called **shorthand properties**

 set several values in a single line.

For example, this one line of code:

```css
/* In 4-value shorthands like padding and margin, the values are applied
   in the order top, right, bottom, left (clockwise from the top). There are also other
   shorthand types, for example 2-value shorthands, which set padding/margin
   for top/bottom, then left/right */
padding: 10px 15px 15px 5px;
```

is equivalent to these four lines of code:

``` css
padding-top: 10px;
padding-right: 15px;
padding-bottom: 15px;
padding-left: 5px;
```

This one line:

```css
background: red url(bg-graphic.png) 10px 10px repeat-x fixed;
```

is equivalent to these five lines:

```css
background-color: red;
background-image: url(bg-graphic.png);
background-position: 10px 10px;
background-repeat: repeat-x;
background-attachment: fixed;
```

# How CSS works

![Rendering process overview](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_works/rendering.svg)

# Styling a biography page

```html
<h1>Jane Doe</h1>
<div class="job-title">Web Developer</div>
<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>

<p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. </p>

<h2>Contact information</h2>
<ul>
    <li>Email: <a href="mailto:jane@example.com">jane@example.com</a></li>
    <li>Web: <a href="http://example.com">http://example.com</a></li>
    <li>Tel: 123 45678</li>
</ul>
```

css

```css
body {
  font-family: Arial, Helvetica, sans-serif;
}
h1{
  font-size: 2rem;
  color: pink;
  border-bottom: 10px dotted #375e97;
}
.job-title {
  padding: 35px 0 10px 0;
  color: rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;
  font-weight: 700;
}
p{
  line-height: 1.4rem;
  color: rgba(0, 0, 0, 0.8);
}

h2{
  font-style: italic;
  font-size: 1.5rem;
}

ul {
  border: 3px solid rebeccapurple;
  background-color: rgba(255, 255, 255, 0.325);
}

a:link, a:visited {
  color: #fb6542;
}

a:hover {
  text-decoration: none;
}
```

# CSS building blocks

## CSS selectors

For a complete list of selectors, see our [CSS selectors reference](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

## [Types of selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors#types_of_selectors)

### [Type, class, and ID selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors#type_class_and_id_selectors)

 target an HTML element 

```
h1 {
}
```

It also includes selectors which target a class:

```
.box {
}
```

or, an ID:

```
#unique {
}
```

### [Attribute selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors#attribute_selectors)

based on the presence of a certain attribute on an element:

```
a[title] {
}
```

an attribute with a particular value:

```
a[href="https://example.com"]
{
}
```

### [Pseudo-classes and pseudo-elements](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors#pseudo-classes_and_pseudo-elements)

style certain states of an element. 

**pseudo-class**

```
a:hover {
}
```

**pseudo-element**

```
p::first-line {
}
```

### [Combinators](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors#combinators)

direct children of

```
article > p {
}
```

## Type, class, and ID selectors

### [Type selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#type_selectors)

an HTML tag/element

```
span {
    background-color: yellow;
}

strong {
    color: rebeccapurple;
}

em {
    color: rebeccapurple;
}
```

### [The universal selector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#the_universal_selector)

an asterisk (`*`). It selects everything in the document (or inside the parent element if it is being chained together with another element and a descendant combinator). 

```
* {
    margin: 0;
}
```

#### [Using the universal selector to make your selectors easier to read](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#using_the_universal_selector_to_make_your_selectors_easier_to_read)

```
article :first-child {
  font-weight: bold;
}
```

However, this selector could be confused with `article:first-child`, which will select any `<article>` element that is the first child of **another element**.

To avoid this confusion, 

so it is more obvious what the selector is doing. It is selecting *any* element which is the first-child of an `<article>` element, or the first-child of any descendant element of `<article>`:

```
article *:first-child {
  font-weight: bold;
}
```

### [Class selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#class_selectors)

It starts with a dot (`.`) character.  

It will select everything in the document with that class applied to it. 

```
.highlight {
    background-color: yellow;
}
```

#### [Targeting classes on particular elements](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#targeting_classes_on_particular_elements)

```css
span.highlight {
    background-color: yellow;
}

h1.highlight {
    background-color: pink;
}
```

```html
<h1 class="highlight">Class selectors</h1>
<p>Veggies es bonus vobis, proinde vos postulo essum magis <span class="highlight">kohlrabi welsh onion</span> daikon amaranth tatsoi tomatillo
    melon azuki bean garlic.</p>

<p class="highlight">Gumbo beet greens corn soko <strong>endive</strong> gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard
    greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.</p>
```

#### [Target an element if it has more than one class applied](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#target_an_element_if_it_has_more_than_one_class_applied)

```css
.notebox {
  border: 4px solid #666;
  padding: .5em;
}

.notebox.warning {
  border-color: orange;
  font-weight: bold;
}

.notebox.danger {
  border-color: red;
  font-weight: bold;
}
```

```html
<div class="notebox">
    This is an informational note.
</div>

<div class="notebox warning">
    This note shows a warning.
</div>

<div class="notebox danger">
    This note shows danger!
</div>

<div class="danger">
    This won't get styled — it also needs to have the notebox class
</div>
```

### [ID selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#id_selectors)

 begins with a `#` 

```css
#one {
    background-color: yellow;
}

h1#heading {
    color: rebeccapurple;
}
```

```html
<h1 id="heading">ID selector</h1>
<p>Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo
    melon azuki bean garlic.</p>

<p id="one">Gumbo beet greens corn soko <strong>endive</strong> gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard
    greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.</p>
```

## Attribute selectors

| Selector        | Example                         | Description                                                  |
| :-------------- | :------------------------------ | :----------------------------------------------------------- |
| `[attr]`        | `a[title]`                      | Matches elements with an *attr* attribute (whose name is the value in square brackets). |
| `[attr=value]`  | `a[href="https://example.com"]` | Matches elements with an *attr* attribute whose value is exactly *value* — the string inside the quotes. |
| `[attr~=value]` | `p[class~="special"]`           | Matches elements with an *attr* attribute whose value is exactly *value*, or contains *value* in its (space separated) list of values. |
| `[attr|=value]` | `div[lang|="zh"]`               | Matches elements with an *attr* attribute whose value is exactly *value* or begins with *value* immediately followed by a hyphen. |

### [Substring matching selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Attribute_selectors#substring_matching_selectors)

| Selector        | Example             | Description                                                  |
| :-------------- | :------------------ | :----------------------------------------------------------- |
| `[attr^=value]` | `li[class^="box-"]` | Matches elements with an *attr* attribute, whose value begins with *value*. |
| `[attr$=value]` | `li[class$="-box"]` | Matches elements with an *attr* attribute whose value ends with *value*. |
| `[attr*=value]` | `li[class*="box"]`  | Matches elements with an *attr* attribute whose value contains *value* anywhere within the string. |

### [Case-sensitivity](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Attribute_selectors#case-sensitivity)

If you want to match attribute values case-insensitively you can use the value `i` before the closing bracket.

```css
li[class^="a"] {
    background-color: yellow;
}

li[class^="a" i] {
    color: red;
}
```

```html
<h1>Case-insensitivity</h1>
<ul>
    <li class="a">Item 1</li>
    <li class="A">Item 2</li>
    <li class="Ab">Item 3</li>
</ul>
```

> **Note:** There is also a newer value `s`, which will force case-sensitive matching in contexts where matching is normally case-insensitive, however this is less well supported in browsers and isn't very useful in an HTML context.

## Pseudo-classes and pseudo-elements

## [What is a pseudo-class?](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#what_is_a_pseudo-class)

selects elements that are in a specific state

start with a colon. For example, `:hover`

```css
article p:first-child {
    font-size: 120%;
    font-weight: bold;
}   
```

```html
<article>
    <p>Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo
            melon azuki bean garlic.</p>

    <p>Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard
            greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.</p>
</article>
```

