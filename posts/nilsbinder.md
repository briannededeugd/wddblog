We all know the world of technology and creativity to be big and growing in size in interest, but individuals like Nils Binder remain to stand out as both artisans of code and champions of design. Hailing from Germany, Nils is a frontend developer at his company 9elements, where his passion for CSS collaborates with his love for origami, he tells us.

At 9elements, a dynamic company with diverse units, Nils finds himself in a large team of creatives that dedicate themselves to innovative projects. The company's structure encompasses several units, each contributing distinctively to its identity.

## The creative system within 9elements

Nils introduces us to the units within 9elements. The _Communication Design_ unit, consisting of four people, focuses on shaping brand identities and crafting visual elements, from logos to patterns. This unit is also responsible for aspects of design like copyright identity and print work. Nils calls this unit the _noncoding designers_-- creative, but not programmers-- and it brings a creative touch to the company's endeavors.

The largest unit, _Product Developers_, with its team of 30 members, spearheads projects ranging from photobook software to data visualizations and mobile applications, which shows just how committed they are to innovation across various domains.

Meanwhile, Nils leads the _Web Development_ unit, a tight-knit team of six members dedicated to building websites for clients, spanning from politicians to local businesses like 'the ice cream shop around the corner.'

Despite their distinct focuses, these units prioritize a seamless collaboration, which of course includes the cross-pollination of ideas. Nils fondly mentions the occasional exchange with the _Cybersecurity_ unit (which handles firmware), highlighting the interconnectedness within 9elements.

## The wrapper element

Nils shares insights into modern web development practices, emphasizing the evolution of techniques like the wrapper element. Traditionally, this element served as a container for website content, defining parameters such as max-width and padding.

He delineates the transition from the old way of CSS to more contemporary approaches, like in the snippet below that demonstrates this evolution:

```css
/* OLD WAY */
.wrapper {
	max-width: ;
	margin: ; 
	padding: ;
}

/* NEW WAY */
.wrapper {
	width: min(100% - 3rem, 75rem);
	margin-inline: auto; // sets both left and right to auto
}

/* NEWER WAY */
.wrapper {
	margin-inline: max(1.5rem, ((100% -75rem)) / 2);
}
```

In just a few years' time, web developers have gone from setting explicit dimensions to leveraging dynamic sizing based on viewport dimensions, as Nils illustrates here by showing us the the adaptability of modern CSS.

## Bridging the gap between design and development

Reflecting on the evolution of design tools, Nils underscores the shift from static platforms like Photoshop to dynamic environments like Figma. Programs like these have made a real effort to enhance the seamless integration of design and development workflows, which we can see in the way they use common namings. For example, take a look at Figma: they utilize the very same properties like those in defining the drop-shadow. Designers can set a drop-shadow's **X-axis, Y-axis, blur, spread and color** (which also comes with the **opacity**).

With this nod to Figma's unit system, predominantly featuring pixels, percentages, and rems, Nils points us to the importance of consistency across design and development realms. This convergence helps with smoother collaboration and ensures coherence throughout the project lifecycle from idea generation to actual development.

As John Allsop said in _A Dao of Web Design (2000)_: "The control which designers know in the print medium, and often desire in the web medium, is simply a function of the limitation of the printed page. We should embrace the fact that the web doesn't have the same constraints, and design for this flexibility."

## A deep-dive into Figma-units and its correspondence with CSS

If we look at Figma units, it mostly seems to utilize pixels, percentages and rem (or, ). Figma also offers designers the optionality of customizing the line-height of a text-element, but like in CSS, this doesn't have units.

If we then switch our gazes to the world of CSS, it's clear that its options are more expansive. We use pixels (px), percentages (%), rem (root em), ch (character width), ex (x-height), and em (font size of the element). Of these, the last four are relative units, dynamically adjusting based on the context.

Additionally, CSS introduces _viewport units_, such as **vw** (viewport width), **vh** (viewport height), **vmin** (minimum of viewport’s height and width), and **vmax** (maximum of viewport’s height and width). These units provide flexibility in designing layouts that respond fluidly to different screen sizes and resolutions.

Furthermore, _container units_ offer another dimension to responsive design. They refer to relative measurements derived from the size of their containing element. This includes options like **qh** (1% of query container's height), **qw** (1% of query container's width), **qi** (1% of query container's inline size), **qb** (1% of query container's block size), **qmin** (the smaller value of qi or qb) and **qmax** (the larger value of qi or qb). We might also consider **min-content**, **max-content**, and **fit-content**, which adapt dynamically to the content they hold, ensuring optimal utilization of available space.

In the intricate communication between design tools like Figma and CSS, understanding the nuances of units empowers designers and developers to create fluid, responsive experiences that transcend the boundaries of device and screen size.

## Use whitespace properly

Nils advocates for the strategic utilization of whitespace, citing examples from 9elements' projects like 'high on code,' where whitespace enhances readability and aesthetics. He directs attention to websites like [dasruhrgebiet.de](http://dasruhrgebiet.de) and [bryck.com](http://bryck.com), showcasing exemplary usage of columns and whitespace for responsive design.

## Conclusion

In the dynamic realm of technology and creativity, people like Nils Binder epitomize the fusion of code and design, bridging different domains to create cohesive digital experiences. Through his journey at 9elements, Nils underscores the importance of collaboration, innovation, and adaptability in navigating web development, which is always changing.

Nils' talk can serve as an inspiration, to remind us of the possibilities that emerge when creativity and technology come together.