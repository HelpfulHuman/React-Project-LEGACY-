# React

This project acts as a template for front-end application's using Facebook's React and Flux libraries, along with several other tools and technologies.

It embodies a rather extensive amount of research into this style of architecture and attempts to create an opinionated structure for building on.  Additionally, our hope is that this can act as a kicking off point for beginners of React or as a solid base to those who already have some experience.

##### What's Being Used?

* [React](http://facebook.github.io/react/) + [Flux](http://facebook.github.io/flux/) for the client application.
* [React-Router](https://rackt.github.io/react-router/) for handling client-side routing.
* [Gulp](http://gulpjs.io) for automating tasks.
* [WebPack](http://webpack.github.io/) for bundling client-side Javascript.
* [Express](http://expressjs.com) for serving up the application.
* [Portals](https://www.npmjs.com/package/portals) for making AJAX calls.
* [Mocha](http://mochajs.com) + [Chai](http://chaijs.com) for testing.

## Why not Browserify / Jest / etc...?

#### Jest

The idea of Jest is great, however, the execution so far has been poor.  One look at [#jestjs on Twitter](https://twitter.com/search?q=jestjs) tells you all you really need to know about Jest's current state of (in)operation.  Additionally, though mocking everything automatically sounds good on paper, being explicit with your mocks/stubs is ultimately a wiser decision.

#### Browserify

We may actually switch back to Browserify from WebPack as the latter has been extremely finnicky.

## File Structure

### Client

The client folder houses the client application for your project.  This is where your app-specific Js and React components (and their directly accompanying styles) live.

* **Actions/** stores your Flux action creators.
* **Components/** is for your React _elements_ - the smaller, compose-able blocks.
* **Contexts/** are essentially React components that act as route handlers or pages.
* **Services/** houses various libraries used by your application.
* **Stores/** contains your Flux stores.
* **main.jsx** bootstraps your application and initiates the router.
* **routes.jsx** is how you wire up your application's routes.

### Resources

Resources are for assets, like images and generic styles, server-side templates and any other components needed by either piece of your application.

* **images/** is where, you guessed it, your images go.
* **styles/** is for your base styles that don't belong to a specific context or component.
* **templates/** contains any templates needed by the server.
* **testing/** support files for running tests.

### Server

The server folder houses the Express server files need to serve up the client application and support the web pack hot loader.  We're currently working on adding [isomorphic React](http://bensmithett.github.io/going-isomorphic-with-react/#/) support as well as some other helpful utilities.

* **main.js** is the Express server.

### Tests

Rather than shoving all of the tests into a single folder, we decided to keep tests in closer proximity to what they're testing.  To mark something as a test, simply suffix the file with `.test`.

Below is an example of ideal test organization:

```
Components/
  ExampleComponent.jsx
  tests/
    ExampleComponent.test.jsx
```
