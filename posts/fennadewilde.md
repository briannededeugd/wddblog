# Fenna de Wilde

_February 14th, 2024_

Fenna de Wilde is a Communication & Multimedia Design alumn and now works as a creative frontend developer at a Norwegian tech-driven agency. She has some very impressive websites under her belt, of which [Moooi](moooi.com) is a prime example. Her most recent pride and topic of the day is _Phantom_, a cryptowallet intended to look friendly, approachable and accessible. Fenna has thought out and designed a website that embodies the playfulness of the logo (a purple 'phantom' ghost), and will lecture us on accessibility in web design using Phantom as an example and good practice.

## Accessibility in Phantom

Accessibility is often not taken seriously in the business world, yet it's a critical aspect for developers. Implementing accessibility practices is not just a moral obligation but also enhances the user experience for a wide range of users.

## The Stack

The technology stack used for projects includes:

*   `NextJS` + `TypeScript` for the front-end framework and language.
*   `Emotion` for CSS-in-JS styling.
*   `Vercel` for deployment.
*   `Sanity` as the content management system.
*   `Framer Motion` as the animation library.

## Always Apply

### Focus State

Focus states are essential because not all users use a mouse. They provide visual feedback on which element is currently focused. The `:focus-visible` pseudo-class is recommended over `:focus`, as it only registers keyboard focus, which is useful for accessibility.

### ARIA Attributes

Accessible Rich Internet Applications (ARIA) attributes provide essential information to assistive technologies. Examples include:

*   `aria-label`: Provides descriptive text to an element that doesn't have descriptive text or a visible label of its own.
*   It's also possible to change based on states, for example, `aria-label={isPlaying ? “Pause” : “Play”}`.
*   `aria-controls` links the control element to the element it controls: provide the controlled element's ID, so screen readers understand the connection and can offer more context to users.
*   `aria-expanded` indicates the status of elements that can be expanded or collapsed, such as hamburger menus, dropdowns, etc. Switches between “true” and “false” states.
*   `aria-live` instructs the screen reader to announce dynamic changes (JS) immediately.
    *   `off`: if something changes, no update to the screen reader.
    *   `polite`: if the screen reader is busy, finish first then announce.
    *   `assertive`: if the screen reader is busy, stop and announce immediately.
*   `aria-live` is often used together with `aria-atomic`.
    *   `false`: screen readers announce changed nodes.
    *   `true`: screen readers introduce the entire changed area as a whole.

### Accessible Carousels

For accessible carousels, the container must have a `role=”region”` or be a section, along with `aria-roledescription=”carousel”` and an `aria-labelledby` or `aria-label` (depending on whether a title is available, then you refer to the title with `aria-labelledby`; if there is no title, then `aria-label`).

The slide must have `role=”group”`, `aria-roledescription=”slide”`, and `aria-labelledby`. You can use `aria-label` to clarify which slide you are on. If a slide is not visible on the screen, hide it with `aria-hidden=”true”` on the slide's wrapper and `tabindex=”-1”` on all focusable children.

Avoid `li` elements, as hiding them will not match the announced number of li’s with the actual number. Carousel controls must have `role=”group”` with an `aria-label`, and the control button showing the current slide has `aria-disabled=”true”`.

### Focus Guards and ESC Key Configurations

Focus guards ensure that keyboard users can navigate without accidentally leaving the modal. Build the modal with dialog (dialog receives `aria-modal=”true”`). Focus is automatically sent to the close button; when the user closes, focus returns to the button that opened it. If you're not using the HTML element, use an npm package for the same effect.

### Color Contrast

Color contrast is vital for readability. Use a font size of at least 16px to prevent eye strain, and keep the line length between 50 - 75 characters. The CSS unit `ch` is the character unit, where 1 character is the width of the '0' character. The WAI color contrast formula assigns colors a value from 1 to 21, with a minimum ratio of 4:1 for standard text and 3:1 for large text. Tools like Figma or a Lighthouse audit can identify elements with poor contrast, and Chrome DevTools can inspect elements for contrast issues, providing warnings for accessibility > contrast.

### Alt Text

Alt text is essential for people who cannot see images, ensuring that they receive the information conveyed by images.

### Correct Semantics

Correct semantics helps screen readers understand the structure and meaning, reducing the need for ARIA attributes. Well-structured HTML improves the visibility of content.

## Further Applications:

*   Skip to content (skip navigation).
*   Prefers-reduced-motion.
*   All autoplay videos/carousels must be able to be paused.
*   Experience using a screen reader yourself.