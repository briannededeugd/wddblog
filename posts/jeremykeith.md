*Sidenote: When he mentions JS, he’s talking about client-side JS in a web-browser*

### Musical composition

- begins by talking about musical composition approach
    - classical approach: can note down which notes, how to play, how long to play them, etc
    - jazz approach: no sheet music, a sketch, one interval, one key to record with
- Feels similar to programming languages
    - one approach is imperative programming: tell the computer what to do step by step
    - another approach is: declarative programming: don’t tell exactly, just specify the output, example is SQL. behind the scenes, the computer decides what/how to do, you get the result

### Declarative vs imperative

- How this relates to the world wide web
    - HTML is declarative, for structuring documents. Domain specific.
    - CSS is declarative, feels imperative BUT you’re giving a SUGGESTION, the web also has its own styles, rules etc. Domain specific.
    - JavaScript is imperative, you have power, you tell the domain what to do step-by-step.
- Imperative language: if you make a mistake, it skips over it, error-handling is toptier. In JS, if you make a mistake, the browser stops parsing. Imperative there’s more restrain to what you can do, is easy to learn, but it is more forgiving.

### Mindset

- Difference in mindset, imperative vs declarative mindset.
    - Let’s take a button-component:
        - Imperative approach: Div in HTML → functionality in JS
        - Declarative: HTML button
            - It’s a GOOD THING to not use JS: “JS should only do what only JS can do”.
            - Because of the error-handling in HTML and CSS.
                - (It’s mostly about control: you might use a html function/element like a button because of all the free things like states, functions etc. But giving up control can feel like a bug when you’re used to controlling things exactly. It’s about desire for control.)
        - Using CSS with things like REM turns the styling into a conversation with the user, because REM is dependent on the user-set font-size.
        - `padding-inline-start: 1rem;`
        - `font-size: calc(.5rem + 0.666vw)`
            - vw is dangerous because it’s always gonna be the same regardless of the font-size, so mixing it with calc and rem makes it better.
        - `font-size: clamp(1rem, 0.5rem + 0.666vw, 1.5rem);`
            - clamp = taking back even more control. You’d probably use clamp on elements like the entire body.
            - You don’t know what the font-size is, but you know it’s always going to be handled.
            - TAKE IT FURTHER:
                - utopia.fyi, this interpolates between two typographic scales. So you design the small and large designs, while the computer defines/calculates everything in between.
                - youtube.com/layoutland: intrinsic webdesign, a more declarative of designing with the user and the browser.
                - every-layout.dev: layouts, you as the designer should set the bounding conditions
                - buildexcellentwebsit.es: be the browser’s mentor, not its micromanager. give hints and let IT figure out the rest
                - All of these are using DECLARATIVE DESIGN APPROACHES
            - Is declarative design better? It depends. FYI, this is a bullshit answer → it depends on WHAT? Well:
                - The culture of the environment: how are people managing it? You can divide it on a spectrum from imperative to declarative.
                    - Imperative: specific
                    - Declarative: loose rules, the outcome matters, good luck to the computer!
    
    ### DESIGN SYSTEMS
    
    - Culture is mostly unset, implicit instead of explicit.
        - This can be determined with design systems: what’s the PROCESS behind components: “a design system is the way we do things around here”.
    - How we think
        - Analytical thinking: break something down, scientific, understand the whole by breaking it down into individual bits and understanding the parts, zoom in
        - Systems thinking: understand the parts by understanding the whole, zoom out
    - Design system, it’s in the name you think, systems thinking? NO. Analytical thinking! Look at modules, parts, bits of code. Imperative.
    - But there are more ways to think when we’re making design systems.
        - When you’re using colors:
            - Imperative — values like 10 different colors in HEX-codes.
            - Declarative — Guidelines, like: the border should be ten percent lighter than the background color.
        - Also depends on: the medium you’re working in (print, native apps, os-specific). You know more about the user environment for os-specific things, for example, but this would clash with the world wide web, where you want to be a bit more flexible.
        - Once again, it’s about CONTROL:
            - “the more you tighten your grip, the more the world wide web slips through your fingers”
            - There’s an inherent fluidity to the web. Relinquish control. It’s a conversation with the end user, not a rule.
            - Are we in the end era of imperative design? We’ll see. Time will tell.