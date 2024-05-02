Kilian Valkhof develops computerapplications with Elektron. He's best known for Polypane, a browser for developers to test their sites in - this application is free for students. Polypane was written in Javascript, but the thing is, Kilian believes it could have been done in CSS because of _the rule of least power_, which means: "choose the least powerful language suitable for a given purpose". In this case, he's referring to the order HTML -> CSS -> JavaScript, as JavaScript is the most fragile and the most big-sized-file-prone (or, it's easiest to do way too much). Luckily, browsermakers are listening to developers' needs more and more.  
  
A very important lesson Kilian wanted us to go home with was this: _once you learn something, you don't learn it again_. Code functionalities have the advantage of always remaining functional; but that doesn't mean that better ways to achieve the same things don't pop up in the meantime. Technically, you don't have to learn new methods. But you should, and you should want to!

## Custom Toggles Without the Hassle

Toggles are a staple in user interfaces, allowing users to switch between two states. Modern browsers offer a built-in checkbox that handles most of the heavy lifting, making it unnecessary to build functionality from scratch. Wrapping a checkbox inside a label element allows users to click anywhere on the label to toggle the checkbox. However, styling checkboxes can be challenging due to their nature as "replaced content" — content whose appearance is outside the scope of CSS. To overcome this, use the **appearance: none** property to customize checkboxes. This removes the default styling, allowing you to add your own with pseudo-elements like **::after** for custom thumb and track appearances. Remember to maintain accessibility by avoiding disabling focus styles (**outline-none**) and instead opt for **focus-visible** to aid keyboard and non-mouse users.  
Example for Safari: **input type="checkbox" switch /> ** 

## Enhanced Input with Datalist and Color Picker

Datalists enhance text input by providing suggestions as the user types. While limited in customization (icons, for example, require JavaScript), datalists are a powerful tool for improving user experience.

```html
<input list="frameworks" />
<datalist id="frameworks">
	<option>Bootstrap</option>
	<option>Tailwind CSS</option>
	<option>Bulma</option>
	<option>Skeleton</option>
</datalist>
```

For a more tailored experience, especially in dark mode, the color picker input type **input type="color"** allows users to select colors. CSS can adjust to the preferred color scheme, ensuring the picker aligns with the overall theme of the user's device.

## Smooth Page Transitions

Gone are the days of relying on jQuery for smooth scrolling effects. CSS now offers **scroll-behavior: smooth;** for seamless in-page transitions. This can be enhanced with JavaScript for finer control, and accessibility considerations can ensure a smooth experience for all users.

```css
@media
	(
		prefers-reduced-motion:
			no-preference
	) {
		html {
		scroll-behavior: smooth;
	}
}
```

## Layout and Navigation

Sticky positioning (**position: sticky;**) offers a middle ground between fixed and relative positioning, allowing elements to "stick" upon reaching a certain threshold during scrolling. This is invaluable for headers, navigation bars, and sidebars that require visibility throughout page interaction. For more dynamic interfaces, CSS Scroll Snap points simplify the creation of carousels and sliders, ensuring a clean, user-friendly navigation experience.

```css
div {
    position: sticky;
    top: 50%;
}
```

The snippet above sticks the **div** in question when it reaches a height of 50% from the top. When this requirement is not met, the **div** honors its default behaviour.

## Organizing Content with Accordions

HTML's details and summary elements provide a native way to create expandable and collapsible sections without JavaScript. This is perfect for FAQs, product descriptions, and any content you wish to initially hide from view.

## Dialogs and Modals

With minimal JavaScript, dialog elements can create modals for alerts, forms, and confirmations, offering a layer of interaction atop your content. So they're usually used to ask the user a question with an overlay on your screen. And the best part? A dialog is a HTML-element:

```html
<dialog>
	<form method="dialog">
		<h1>This is a pretty dialog.</h1>
		<button type="submit">Close</button>
	</form>
</dialog>

<button onclick="$$('dialog').showModal()">
	Show the dialog
</button>
```

The **top layer** is a layer between your page and the screen where you can only show things, but you can't style them. In modals and dialogs, the provided **close**-button is essentially the same as a form's submit button, but you can have multiple of them. Think of "yes" and "no", or "correct" and "wrong", for example. The only way to somewhat style a dialog is with **::backdrop**:

```css
dialog::backdrop { /* the browser makes sure it covers the entire viewport */
	background: #fff;
	backdrop-filter: blur(4px);
}
```

## Advanced Styling and Layout

Container queries, the parent selector (**:has()**), and future CSS features like field sizing and masonry layouts promise even more control over responsive design and user interface elements. Container queries work in a similar manner to media queries, except instead of asking "_how wide is my screen?_" it poses the question "_how wide is my container?_" You use the size of the container to determine the size of its child:

- The parent (container): **.card-container { container-type: inline-size; }**;
- The child: **.card .img { flex: 0 0 5cqw; }** (_in this case, **cqw** is the container query width_);
- The query: **@container (min-width: 400px) { .card {} }**.

By using the **query**, you can specify that you want to consider the container regardless of any elements in betweeen the container and, in this case, the **.card** element.

The **:has()**-selector looks at each HTML-element and checks its state, which you can then base styles on. It's comparable to **if/else** in JavaScript, which [Polypane](https://polypane.app/where-is-has/) explains in more detail.

For example, the following code-snippet checks whether or not the **form**-element has a child with the ID "other" that is checked, and if yes, it shows the child with the ID "other-checked":

```css
form:has(#other:checked) #other-checked { 
	display: block;
}
```

## Embracing Future Trends

While JavaScript remains a powerful tool for dynamic content and complex interactions, emerging CSS features suggest a future where more can be accomplished with less scripting. This aligns with the web's evolution towards faster, more accessible, and user-friendly experiences.

### Field sizing

An example of this is _field sizing_ (available in Chrome), where the input-field scales along with the amount of input. A longer input automatically resizes the field to be wider. Though this automatic sizing takes a lot of scripting off of our hands, the responsible thing to do is to add **min-width**s and **max-width**s. To customize these even more, you can add padding to the elements.

```css
input { /* for inline-fields */
    field-sizing: content;
}

textarea { /* for block- and inline-directions */
    field-sizing: content;
}
```

### Masonry grids

We're also expected to be able to create masonry grid using **display: grid;**, but since this is still in the early stages of development, it's possible that the syntax changes in the future:

```css
.container {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: masonry;
}
```

### Select lists

Select lists have all the interactions that **select** does, except the dropdown list is now composed out of normal, stylable HTML-elements.

```html
<selectlist>
	<div slot="listbox" popover="auto">
		<option>Option 1</option>
		<option>Option 2</option>
		<option>Option 3</option>
	</div>
</selectlist>
```

```css
selectlist::part(button) {}
selectlist [popover] {}
selectlist option {}
```

## Conclusion

As web standards evolve, so do the opportunities for designers and developers to create more engaging, efficient, and accessible websites. By embracing these modern HTML and CSS features, you can enhance your projects, improve performance, and deliver a superior user experience. Whether you're building forms, navigational elements, or complex layouts, the future of web design is bright and increasingly within reach through CSS alone. For those interested in scroll-driven animations and more advanced topics, resources like Bramus's blog offer in-depth discussions and tutorials on leveraging CSS to its fullest potential.