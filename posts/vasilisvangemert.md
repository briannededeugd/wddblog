As a developer, your role extends beyond merely implementing a designer's vision. You still need to engage in design aspects because developers often spot what works best or what could be improved. Here's a breakdown of essential tools and practices in web development, particularly focusing on accessibility:

## Your responsibilities as a developer

As a developer, your role isn't just taking a designer's vision and making it. You should have the ability to look at a design with a critical and mindful eye, which means that you play a crucial role in the design process. One of the responsibilities you have is to familiarize yourself with the _Web Content Accessibility Guidelines_ (the WCAGs), as all websites are required to comply to these legal standards. But what do the _WCAGs_ say?

- _Keyboard navigation_: Ensure all elements can be navigated via keyboard, maintaining proper sequencing and preventing navigation traps;
- _Screen Readers_: Utilize screen readers like VoiceOver, NVDA, Narrator, and TalkBack to understand how visually impaired users experience your website.
- _Zooming_: Test your website's usability at various zoom levels to ensure content remains accessible and functional (recommended zoom levels are **200x** and **500x**);
- _Motion Reduction_: Make animations optional to accommodate users with motion sensitivity;
- _Light/Dark Mode and High Contrast_: Offer users the option to switch between light and dark themes, as well as high-contrast modes.

By implementing these practices, you've already covered 90% of accessibility requirements. Remember, understanding your actions and maintaining an accessibility-oriented attitude are crucial.

## HTML validation
Another important step and responsibility is to validate your HTML code to ensure compliance with standards and proper structuring. There are various tools you can use to quickly, easily and fairly validate your code, like the [W3C validator]() and browser plugins such as [Headingsmap]() to analyze the structure of your content and its clarity.

## Additional helpful tools

**Sim Daltonism**     
A useful tool for testing color blindness scenarios, available on Mac via the App Store.

**Contrast Checker**  
Helps assess color contrast for readability.

**Oogharen**  
Nope, _Oogharen_ is not a clever name for an existing tool. Vasilis meant our literal eyehairs, our eyelashes, and meant to tell us that squeezing your eyes to blur your vision is also a trusty and easy method to check just how accessible your site is visually.

_Oh, and here's a tip_   
Enhance tab order with CSS using **:focus-within**.

## Browser Tools
While browser tools can aid accessibility evaluation, remember they are automated and may not catch all issues. Use them as aids but maintain a critical understanding.

- Wave Evaluation Tool
- EX Dev Tools
- Accessibility Insights
- Arc
- Visbug

_Caution_:
Don't let tools overshadow the human-centric aspect of design. Your focus should be on creating accessible experiences for users, not just achieving high tool scores. Tools like **Lighthouse** and **Pagespeed Insights** allow you to analyze your site and return a percentage of accessibility. Naturally, the closer the number is to a hundred, the more accessible your site is. Unfortunately, this score-system (while being a clear indicator) often distracts people from the real goal. The goal being to ensure accessibility for _all_, not reaching a high score like you're playing _Just Dance_ and calling it a day. As Vasilis puts it,

> It's not about reaching that 100%; it's about ensuring accessibility for the people who use your product.

## Above All
Design thoughtfully, conduct real testing, think before you act, understand your actions and stay informed.