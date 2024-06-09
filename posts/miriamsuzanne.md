Miriam Suzanne is an author, artist and teacher based in Denver, Colorado. She is also a co-founder of the OddBird web agency. Recently, Miriam was one of two speakers at this year's _Pre CSS Day_, an event hosted by my minor Web Design & Development a day before the actual _CSS Day_ with talks and a dinner that us students aren't invited to. She has come to speak to us about container queries in CSS, a topic that has generated a lot of interest (and debate!) within the web development community.

## The evolution of media queries

Back in 2010, media queries were first introduced. These allowed developers to apply CSS rules based on the characteristics of the device or the viewport. This innovation was met with enthusiasm as it enabled responsive web design, adapting layouts to different screen sizes and orientations. However, it also had its limitations. Media queries are effective only when measuring the viewport, not individual elements within a page. This gap sparked immediate interest in container queries, which became one of the most requested features in CSS development.

## So, why did it take so long?

Despite the high demand, browser developers were initially skeptical about the feasibility of container queries. Around 2020, a common sentiment echoed among browsers was,

> Container queries will never be possible on the web. They would cause infinite layout loops.

"_And they weren't wrong,_" Miriam tells us. "_It's a big problem_." Implementing container queries poses a significant challenge because it requires the browser to recalibrate layouts dynamically based on the size of individual containers, rather than the viewport. This could potentially lead to complex and infinite reflows, where the layout keeps adjusting in an endless loop.

The web's ability to adapt is both its strength and its challenge. Unlike print, where designers have total control over the layout, the web must cater to a diverse range of devices and screen sizes. This necessary adaptability is evident in the **W3C**'s mantra,

> Web for all, web on everything.

The default layout mechanism of the web, known as normal flow, involves content pushing outwards on a box, which in turn pushes back inwards, leading to changes in the box's size based on the content. This dynamic nature of web layouts means that a solution is necessary that can handle both those fluid _and_ fixed layouts seamlessly.

### The reality of container queries

Despite the initial skepticism, progress has been made. Container queries allow developers to apply styles based on the size of a container, rather than the viewport. This means that elements can adapt to the dimensions of their parent containers, enabling more modular and flexible designs. The challenge of infinite layout loops has been addressed by implementing strict rules and constraints within the CSS specifications, ensuring that container queries are both functional and performant.

### Conclusion

In summary, container queries represent a significant advancement in CSS, addressing a long-standing demand within the web development community. They offer a way to create more adaptive and responsive designs by allowing elements to respond to the size of their containers. As Miriam Suzanne says, 

> Do containers know stuff? Yes. But it’s complicated.

This complexity is a testament to the innovative characteristics of web developers and the web itself, both of whom are constantly pushing the boundaries to create a more flexible and inclusive web.