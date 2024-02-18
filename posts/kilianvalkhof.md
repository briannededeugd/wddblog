# Kilian Valkhof

_February 7th, 2024_

Kilian Valkhof develops computerapplications with Elektron. He's best known for Polypane, a browser for developers to test their sites in - this application is free for students. Polypane was written in Javascript, but the thing is, Kilian believes it could have been done in CSS because of _the rule of least power_, which means: "choose the least powerful language suitable for a given purpose". In this case, he's referring to the order HTML -> CSS -> JavaScript, as JavaScript is the most fragile and the most big-sized-file-prone (or, it's easiest to do way too much). Luckily, browsermakers are listening to developers' needs more and more.  
  
A very important lesson Kilian wanted us to go home with was this: _once you learn something, you don't learn it again_. Code functionalities have the advantage of always remaining functional; but that doesn't mean that better ways to achieve the same things don't pop up in the meantime. Technically, you don't have to learn new methods. But you should, and you should want to!

## Custom Toggles Without the Hassle

Toggles are a staple in user interfaces, allowing users to switch between two states. Modern browsers offer a built-in checkbox that handles most of the heavy lifting, making it unnecessary to build functionality from scratch. Wrapping a checkbox inside a label element allows users to click anywhere on the label to toggle the checkbox. However, styling checkboxes can be challenging due to their nature as "replaced content" — content whose appearance is outside the scope of CSS. To overcome this, use the `appearance: none` property to customize checkboxes. This removes the default styling, allowing you to add your own with pseudo-elements like `::after` for custom thumb and track appearances. Remember to maintain accessibility by avoiding disabling focus styles (`outline-none`) and instead opt for `focus-visible` to aid keyboard and non-mouse users.  
Example for Safari: `input type="checkbox" switch /> ` 

## Enhanced Input with Datalist and Color Picker

Datalists enhance text input by providing suggestions as the user types. While limited in customization (icons, for example, require JavaScript), datalists are a powerful tool for improving user experience. For a more tailored experience, especially in dark mode, the color picker input type `input type="color"` allows users to select colors. CSS can adjust to the preferred color scheme, ensuring the picker aligns with the overall theme of the user's device.

## Smooth Page Transitions

Gone are the days of relying on jQuery for smooth scrolling effects. CSS now offers `scroll-behavior: smooth;` for seamless in-page transitions. This can be enhanced with JavaScript for finer control, and accessibility considerations can ensure a smooth experience for all users.

## Layout and Navigation

Sticky positioning (`position: sticky;`) offers a middle ground between fixed and relative positioning, allowing elements to "stick" upon reaching a certain threshold during scrolling. This is invaluable for headers, navigation bars, and sidebars that require visibility throughout page interaction. For more dynamic interfaces, CSS Scroll Snap points simplify the creation of carousels and sliders, ensuring a clean, user-friendly navigation experience.

## Organizing Content with Accordions

HTML's details and summary elements provide a native way to create expandable and collapsible sections without JavaScript. This is perfect for FAQs, product descriptions, and any content you wish to initially hide from view.

## Dialogs and Modals

With minimal JavaScript, dialog elements can create modals for alerts, forms, and confirmations, offering a layer of interaction atop your content. Custom styling can enhance these dialogs, making them integrate seamlessly with your design.

## Advanced Styling and Layout

Container queries, the parent selector (`:has()`), and future CSS features like field sizing and masonry layouts promise even more control over responsive design and user interface elements.

## Embracing Future Trends

While JavaScript remains a powerful tool for dynamic content and complex interactions, emerging CSS features suggest a future where more can be accomplished with less scripting. This aligns with the web's evolution towards faster, more accessible, and user-friendly experiences.

## Conclusion

As web standards evolve, so do the opportunities for designers and developers to create more engaging, efficient, and accessible websites. By embracing these modern HTML and CSS features, you can enhance your projects, improve performance, and deliver a superior user experience. Whether you're building forms, navigational elements, or complex layouts, the future of web design is bright and increasingly within reach through CSS alone. For those interested in scroll-driven animations and more advanced topics, resources like Bramus's blog offer in-depth discussions and tutorials on leveraging CSS to its fullest potential.