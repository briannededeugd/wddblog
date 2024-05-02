_Sidenote: When JavaScript is mentioned in this blog, we're referring to client-side JavaScript in a web-browser._

Jeremy Keith tells us that in the world of music, composition can take on various forms, each reflecting a distinct approach to creativity. There's the classical approach, in which musicians write down which notes to play, how to play them and for how long to do so. And there's the jazz approach, where there's no sheet music but merely a sketch, a single interval, and one key defined to record with.

This feels quite similar to programming languages. The choice between imperative and declarative approaches can profoundly shape the outcome of digital experiences. Drawing parallels between these two domains offers insights into the fundamental principles that underpin both artistic expression and technological innovation. _Imperative_ programming means that developers specify explicit instructions for the computer to follow, much like composing with detailed notation. On the other hand, _declarative_ programming focuses on describing the desired outcome without prescribing the exact steps to achieve it, similar to the improvisational nature of jazz.

An example of declarative programming is _SQL_. Behind the scenes, the computer decides what to do and how to do it. You just get the result.

## Declarative vs imperative

Translating this analogy to the world wide web, we'll how various web technologies embody these contrasting philosophies. HTML and CSS are examples of declarative languages, defining the structure and style of web documents. In HTML, elements such as **div** and **button** provide semantic meaning, while CSS rules specify visual presentation. CSS can feel imperative because you're customizing elements yourself, but all of these customizations are mere suggestions. The web has its own styles and rules.

JavaScript (JS), however, adopts an imperative approach, which allows developers to dictate precise sequences of actions for the browser to execute. Unlike HTML and CSS, which delegate some control to the browser, JS commands offer more precise manipulation of web elements and behavior. Which brings Jeremy to a very important characteristic of declarative languages: its error-handling is top-tier, because it just skips over mistakes you make. In JS, if you make a mistake, the browser stops parsing. This means that yes, there's more restrain to what you can do, but it's easy to learn and more forgiving.

### Mindset

In imperative programming, developers wield significant control over the execution flow, but this control comes with responsibilities, particularly in error handling. A single mistake can halt the script's execution, necessitating thorough error management.

In web development, JavaScript's imperative nature grants developers unparalleled power but also imposes strict constraints. Mistakes can disrupt the browsing experience, leading to abrupt termination or unexpected behavior.

Adopting a declarative mindset challenges traditional notions of control and precision. Consider the humble button component: in an imperative workflow, developers might create a **div** element and attach functionality through JS. However, embracing HTML's native **button** element aligns with the ethos of declarative design, leveraging built-in browser features and error handling. In this case, it's a *good* thing to not use JavaScript. Jeremy says, "JavaScript should only do what JavaScript can do."

CSS further reinforces this shift, especially with units like rem and vw. By relinquishing pixel-perfect control in favor of responsive, user-centric design principles, developers engage in a dialogue with the browser rather than dictating every aspect. rem for example is dependent on the user-set font-size.

```css
.example {
    padding-inline-start: 1rem;
    font-size: calc(.5rem + 0.666vw);
}
```

But using **vw** in this example is dangering, because it's always going to be the same r egardless of font-size. That's why Jeremy advises us to use it in rombination with **calc** and **rem**, like below:

```css
.example {
    padding-inline-start: 1rem;
    font-size: clamp(1rem, 0.5rem + 0.666vw, 1.5rem);
}
```

In this case, the use of **clamp** is taking back even more control. You'd probably use it on elements like the entire body. Additionally, this single line ensures that the font-size will always be handled, even if you don't know what it is.

And we can take it even further:
- [Utopia.FYI](utopia.fyi): This website demonstrates the interpolation between two typographic scales. _You_ design the small and large designs, while the computer defines and calculates everything in between.
- [Layout Land](youtube.com/layoutland): Explanations on intrinsic webdesign, in regards to a more declarative approach of designing with the user and the browser.
- [Every Layout](every-layout.dev): Every Layout offers you as the designer the power to set the bounding conditions of your product.
- [Build Excellent Websites](buildexcellentwebsit.es): Encourages you to be the browser’s mentor, not its micromanager. Give hints, it says, and let IT figure out the rest.

All of these are using _Declarative design approaches_. This might make you wonder, does this mean that declarative design is better? Jeremy Keith tells us that it depends. "FYI, this is a bullshit answer," he adds, "It depends on WHAT?" Well, the culture of the environment, for one. How are people managing it? You can divide it on a spectrum from imperative to declarative. The more specific the environment is managed, the more imperative it is. Alternatively, the looser the rules and the more the outcome is prioritized, the more declarative it is.
    
## Design systems


In the world of design, there's something we often feel but don't always talk about directly: culture. Culture is mostly unset, implicit instead of explicit. But how do we clarify the rules that make up this culture? That's where design systems come in. They're like a guidebook, showing us "the way we do things around here." They help us understand two main ways of thinking: breaking things down into smaller parts (_analytical thinking_) and seeing the big picture first (_systems thinking_).

Think of analytical thinking like looking at something under a microscope. It's all about zooming in and understanding the details. On the other hand, systems thinking is more like stepping back to see how everything fits together as a whole. But even though design systems sound like they're all about seeing the big picture, they often focus more on the details—like specific bits of code or modules.

However, there's more to it than just that. Take colors, for example. Some people might say, "Use these exact colors," while others might give guidelines, like "Make sure the border is a bit lighter than the background." And it also depends on where you're working—whether it's on print, apps, or the web. Each has its own rules, but the web is especially complicated because of its ever-changing nature. Jeremy says, 

> The more you tighten your grip, the more the world wide web slips through your fingers.

## Conclusion

The inherent fluidity to the web forces us to relinquish control. It's a _conversation_ with the end user, not a rule you're setting for them. Maybe it's time to let go a bit and see where the conversation takes us. We might be entering a new era where being flexible is key. But we'll see, only time will tell.