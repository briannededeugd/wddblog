Nils Binder is a frontend developer at 9elements in Germany. He has an obvious passion for all things code - CSS in particular -, but there's more to him: he also _really_ likes origami, he tells us.

The company where he works at, 9elements, has a few different units. The **Communication Design** unit consists of four people. This unit is responsible for aspects of design like copyright identity and print work, like logos and patterns. Nils calls this unit the _noncoding designers_, creative, but not programmers. Then there's the biggest unit: The **Product Developers**. This group of 30 people is responsible for products like 9element's photobook software, data visualisations and mobile applications. They also handle the banking. Lastly, there's Nils' unit, the **Web Development** unit. Nils is one of six team members and acts as head of the department, which produces small to medium sized websites for politians as well as 'the ice cream shop around the corner'.

Despite there being different units in 9elements, these three work closely together. They even sometimes say hi to their separate unit, the **Cybersecurity** unit, which handles firmware!

## The wrapper element

The wrapper element: A container for a website sets a maxwidth for the content, adds padding and centers te content.

### How do we do this?

```css
OLD WAY
.wrapper {
	max-width: ;
	margin: ; 
	padding: ;
}

NEW WAY
.wrapper {
	width: min(100% - 3rem, 75rem);
	margin-inline: auto; // sets both left and right to auto
}

NEWER WAY
.wrapper {
	margin-inline: max(1.5rem, ((100% -75rem)) / 2);
}
```

Back in the day, websites were designed in Photoshop. But these days, we have tools like Figma, which uses the same properties as CSS, like drop-shadow: `X-axis → Y-axis → blur → spread → color (+opacity)` .

> QUOTE (foto in tellie).
> 

If we look at figma units, it’s mostly pixels (sidenote, lineheight with no units), % and rem.

css: px, %, rem, ch, ex, em (last four are relative to the fontsize)

viewport units: …

container units: …

Use whitespace properly

> See image (ask, harry and meghan article)
> 

also used on 9elements ‘high on code’.

[dasruhrgebiet.de](http://dasruhrgebiet.de) & [bryck.com](http://bryck.com) to see how they use whitespace and columns for responsiveness.