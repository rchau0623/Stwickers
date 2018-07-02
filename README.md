# Full-stack Intern Take Home
This repository contains the base code for our standard take home assignment for a full-stack development intern, usually given out after the initial phone screen.

This take home aims to test:
- If the intern can put together a functioning project within the allotted time.
- If the intern has a basic familiarity with Git, JavaScript, GatsbyJS, React.js, Node.js and server interaction.
- If the intern can set up a basic Node.js server to function as a REST API for the client application they build out.
- If the intern can utilize a framework they're perhaps unfamiliar with to meet the requirements of the spec.

**For a full list of expectations, see below in the Expectations section.*

## Getting Started
1. If necessary, create a GitHub account [here.](https://github.com/)
3. Using your terminal, clone this repository, if necessarry follow [this guide](https://services.github.com/on-demand/github-cli/clone-repo-cli). All work should be done on your own repo.
4. If necessary, review basic Git commands [here](https://www.atlassian.com/git/tutorials/learn-git-with-bitbucket-cloud)

## Assignment Spec and Instructions
Your task is to create a very simple storefront for a fictitious product, printable versions of [Twitch Stickers](https://www.redbubble.com/shop/twitch+emote+stickers). .

There are few pieces that this will require, but ultimately the two biggest pieces will be:
1. The client website, which will be built with  [GatsbyJS](https://www.gatsbyjs.org/)
2. The server, which should just be a simple [ExpressJS](https://expressjs.com/) set up. 

The requirements for both are detailed below.

### The Client Website
The aesthetic qualities of the user interface of your GatsbyJS site won't be taken into consideration. 
The important qualities that **will** be considered are the following:
- Your use of components to create an intuitive, easy to work with hierarchy.
- Understanding separation of concerns, (for example, don't have "dumb" child components making API calls that change the overall data of the application, in this contrived example where we're not using a data store, you'd want to pass that data down via `props`.)

#### User Interface Specifications
For this online storefront, we'll be creating the equivalent of a Single Page Application, but with Gatsby. Luckily, GatsbyJS makes this pretty easy and doesn't force you to set up `react-router`.  You'll be using modules like `gatsby-link`  to navigate between pages.

Your GatsbyJS site will have 4 mandatory pages:
- `Home`: Where the user can see all the product offerings.
- `Cart`: Where the user can see the items they've put into their cart.
- `Checkout`: Where the user submits a form with (fake) payment information and hits an endpoint on your server.
<img src="https://s3.us-east-2.amazonaws.com/klyxxpublicassets/CheckoutWindow.png"></img>


### Server

## Expectations
When evaluating take home assignments, we take into consideration the following.
- **We expect clean and legible code.**
- **We expect a basic understanding of JavaScript and React.js, specifically:**
  - It's use within GatsbyJS, e.g. using component when necessary and not having a monolothic `index.js` file.
  - It's use to send HTTP requests and handle a response.
    - We want to ensure that the intern is comfortable with the very basics of asynchronous programming, handling a callback, chaining callbacks, etc.
  - It's use as a programming language:
    - Appropriate use of variable declaration, i.e. `let` vs `const`
    - Use of `for` loops when it makes sense.
    - Using comments to explain behavior and rationale.

## Rules
- Take home assignments are to be turned in on time.
- While we're certainly happy to see people who are good at using Google to find the solution to their problems (copy and pasting code is okay too), we want to see clean code that legible and easy to follow.
- Final versions of the take home are to be pushed to the intern's own public GitHub repository.
