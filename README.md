# Full-stack Intern Take Home
This repository contains the base code for our standard take home assignment for a full-stack development intern, usually given out after the initial phone screen.

This take home aims to test:
- If the intern can put together a functioning project within the allotted time.
- If the intern has a basic familiarity with Git, JavaScript, HTML, CSS and server interaction.
- If the intern can solve most of the basic problems associated with developing static sites and writing front end components for the web.*

**For a full list of expectations, see below in the Expectations section.*

## Getting Started
1. Download your free trial of sketch [here.](https://www.sketchapp.com/)
2. If necessary, create a GitHub account [here.](https://github.com/)
3. Using your terminal, clone this repository, if necessarry follow [this guide](https://services.github.com/on-demand/github-cli/clone-repo-cli). All work should be done on your own repo.
4. If necessary, review basic Git commands [here](https://www.atlassian.com/git/tutorials/learn-git-with-bitbucket-cloud)
5. All the code you write should go in the `src` folder.

## Assignment Spec and Instructions
Your main task is to build out an admin panel, for a fictitious company, that tracks metrics and can send an email. The motivation behind this task is that it mirrors a lot of the work we end up doing for clients: a clean, responsive front end that interacts with some API.

### Designs
Below are screenshots of the designs that you need to implement, along with your email containing this assignment. You should've gotten a `.sketch` file containing the file that actually contains all of these assets, use this file to ensure that you're copying the designs. The goal is to have the final product look as close to the designs as possible.

<img src="https://s3.us-east-2.amazonaws.com/klyxxpublicassets/DesktopWindow.png"></img>
<img src="https://s3.us-east-2.amazonaws.com/klyxxpublicassets/MobileWindow.png"></img>

### Behavior and Functionality
Most of the behavior lies in the panels. For each panel:
- We want all the data to be populated on page load.
- We want a progress bar that fills up depending on the data returned, so for example if the data says we have 10 out of 100 as the goal, we should see a progress bar that is *roughly* 10% of the way filled up with rectangles.
- We want the form to send an email using Formspree.io.
- We want the page to be fully responsive, as seen below in the desktop design and the mobile design, the panels are either side-to-side or stacked depending on the screen width. The design for the bottom panel on mobile is left to be done at your discretion (I would probably stack the Click-through Today section above the form while keeping it in the same panel).
- We want there to be a fully functional mobile and desktop menu, with typical slide down/up toggle-able behavior, [see here for an example.](https://codepen.io/jo_Geek/pen/xgbaEr)

### Data
In your assignment email you received a special endpoint link to hit for data. On document load, you want perform a `GET` request to the endpoint (which will return JSON) and then populate all the data on the page.

I'd recommend handling this first, that way you can base the calculations you have to do (such as the progress bar) around a single model of data. The code to accomplish a basic `GET` request is below:

Plain JavaScript
```javascript

document.addEventListener('DOMContentLoaded', main);

// main function
function main() {
    // Hit endpoint
    let httpRequest = new XMLHttpRequest()
    httpRequest.open('GET', '<YOUR SPECIAL ENDPOINT>')
    httpRequest.send()

    // Once the requests state changes, we execute this function
    httpRequest.onreadystatechange = function(){
      // Handle the server response here
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          console.log(httpRequest);
          // Logic to populate page with data here using DOM manipulations.
        }
        else {
          alert('There was some problem with the request.');
        }
      }
    }
}

```

Using jQuery
```javascript

// Run this function when the document loads
$(document).ready(function() {
  // Send GET request
  $.get('<YOUR SPECIAL ENDPOINT>', {}, function(data) {
    console.log(data);
    // Logic to populate page with data here using DOM manipulations.
  });
});
```

### Using JS Frameworks / CSS Libraries
Feel free to use any CSS library you wish to use to accomplish the desired behavior, the same goes for JS frameworks.

## Expectations
When evaluating take home assignments, we take into consideration the following.
- **We expect clean and legible code.**
- **We expect a strong understanding HTML, specifically:**
  - Using the appropriate tag when necessary.
  - Properly formatted HTML with a `<head>` and `<body>` tags.

- **We expect a strong understanding CSS**
  - At the minimum, an understanding of the following CSS properties is required:
    - `position`
    - `display`
    - `float`
  - We also expect an understanding of `media queries` and `selector priority`.
  - A great resource for all of this information is the [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference).

- **We expect a basic understanding of JavaScript, specifically:**
  - It's use for DOM interaction.
    - jQuery and other libraries that handle DOM manipulation are *definitely allowed*, if not encouraged, however using vanilla JS to interact with the DOM API is the bare minimum.
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
