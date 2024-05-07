Julia Miocene is a product designer and pure CSS animator based in Amsterdam. Her work as a pure CSS animator is what she came to our classroom for on March 18th, 2024. We were in the process of finishing up our course _CSS to the Rescue_, in which we were challenged to create interactive apps using absolutely no JavaScript, and as a pioneer in the CSS world, Julia was the perfect person to come and inspire us.

## Just CSS?

Let's admit it: animating with just CSS is kind of insane. At least, that's what my mind was saying right before Julia took the stage and showcased her projects. She has imitated videogames, created detailed animated scenes and designed her own characters, each of them livelier than the one before.

She couldn't help but notice our awestruck expressions, and was of course armed with an explanation and brief break-down of what she made, exactly.

One thing that really stood out to me in her explanations was the fact that generally, she makes use of concepts that I'm already familiar with. A character's body, she explained, is really just a **div** inside of a **div** inside of a **div**. The head is a **div**, then inside of the head the eyes are **div**'s, and inside of the eyes the pupils are **div**s as well. Additionally, Julia uses absolute positioning to 'draw' each of these elements exactly where they are supposed to be, relative to their parents. When she explained it like this, something admittedly clicked in my head.

```html
<!-- HEAD -->
<div>
    <div> <!-- EYES -->
        <div> <!-- EYE 1 -->
            <div></div> <!-- PUPIL-->
        </div>
        <div> <!-- EYE 2 -->
            <div></div> <!-- PUPIL -->
        </div>
    </div>

    <div></div> <!-- NOSE -->
    ...
<div>
```

Additionally, Julia clarified that we could also make use of CSS's features like **::before** and **::after**, gradients, and **transform-origin**.

## Transform-origin

**Transform-origin** allows you to specify where an element should "transform from" in CSS. Coincidentally, at the time of this talk, I had just used this for the first time in my assignment for _CSS to the Rescue_. I had a pin needle (a long, vertical element) that was meant to turn to the left and right from a fixed spot, but when I used the plain old **rotate**, the entire element would spin around. **Transform-origin** allowed me to say,

```css
div {
    transform-origin: bottom center;
}
```

which meant that when it rotated, the bottom of the pin needle would stay fixed, and the top would transform, kind of like a windshield wiper.

### When animating
Julia spoke of **transform-origin** like a _joint_. In the same way that my pin needle wiped from a fixed spot, it could be used to make arms move from shoulders and hands from wrists. This might scare you a bit, but you really don't need an extensive understanding of the human body. All you have to do is define where these elements should transform from.

## Conclusion
I humbly admit that I spent the most of this talk with my eyes glued to the screen, so these notes (recollected from my memory) is all I have to offer. I think that what this all comes down to, is that the possibilities of CSS are limitless - which doesn't necessarily mean that I have a limitless amount of things yet to learn. In fact, Julia challenges us to rediscover that what we already know (or, _think_ we know) and create new things with them.