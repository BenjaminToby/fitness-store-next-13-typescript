# Fitness Store with Nextjs 13 and Typescript.
This store is more like an ecommerce template which will likely see more improvements and expansion. But the main purpose is to put some modern frameworks to the test. Major focus on Next JS 13 and Typescript.
All in all, both performed well, with strengths and drawbacks.

Feel free to fork this repo or make pull requests.

## Next JS 13
The all new app router was used in this project, and as you can see, I still had to use the pages directory for API routes. There are improvements over Next 12 certainly, but the drawbacks are pretty severe. The most severe being the lack of access to the node js http request object. It's hard to tell yourself that you're running a node js http server when the http request object is inaccessible. That aside, Next JS 13 is good overall.

## Typescript
Very little to complain about, and a lot to admire. Type checking turns out to be more important than I thought. However, that is not the biggest advantage of typescript. The biggest advantage is how it handles type exports. Type checking can be activated in normal javascript with a simple // @ts-check directive. However making these types modular is a hassle. Typescript does this quite well. Only complain is there is no provision for descriptions. So I have to go back to JSDOcs syntax for this. Pretty stressful to have to define types twice.

## Other libraries
This project utilized a few other important libraries. Like:
- Tailwind css
- Radix UI
- Less CSS

## Conclusion
I still lean towards Next 12 over Next 13, but I might be using Next 13 a lot in the near future. And I'm pretty certain I'll be using typescript a lot more often.
