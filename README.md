# React

This project acts as a template for front-end application's using React and Redux, along with several other tools and technologies.

It embodies a rather extensive amount of research into this style of architecture and attempts to create an opinionated structure for building on.  Additionally, our hope is that this can act as a kicking off point for beginners of React or as a solid base to those who already have some experience.

##### What's Being Used?

* [React](http://facebook.github.io/react/) for managing the presentation logic of your application.
* [Redux](http://redux.js.org/) for generating and managing your state model.
* [Portals](https://github.com/helpfulhuman/portals) for making AJAX calls to a server.
* [Stylus](http://stylus-lang.com/) + [Helpful UI](https://github.com/helpfulhuman/helpfului) for stylesheet compilation.
* [Gulp](http://gulpjs.io) for handling automated tasks.
* [Babel](https://babeljs.io/) for compiling ES2015+ down to ES5 compatible code.  Additionally, this project is set up to support type checking using [Flow](http://flowtype.org/) syntax.
* [WebPack](http://webpack.github.io/) for bundling code down to a single file and enabling hot module reloading.
* [Express](http://expressjs.com) for serving up the development server.
* [Mocha](http://mochajs.com) + [Chai](http://chaijs.com) for testing.

## File Structure

### build/

This is where your application will be compiled.  Assets, like images and fonts, should be placed directly within this folder.  Also in this folder is a default `index.html` file for serving up the application.

### src/

The client folder houses the client application for your project.  This is where your client-side Javascript components (and their directly accompanying styles) live.

### test/

Your unit and integration tests for components, reducers and services.  It is not really necessary to test action creators or contexts (unless you really want to).

## App Components

### Actions

These are your Redux action creators.  There are 2 styles of action creators: _direct_ and _deferred_.

##### Direct

```javascript
export function directAction (/* params */) {
  return { type: 'ACTION_NAME', ... };
}
```

##### Deferred

```javascript
export function deferredAction (/* params */) {
  return function (dispatch) {
    dispatch({ type: 'ACTION_NAME', ... });
  };
}
```

### Components

Your React components along with their accompanying Stylus files.  React components should be kept _"dumb"_ and have no knowledge of the Redux state model.  Build your React components to accept "hook" methods that can be passed in externally.

For example, if your component needs to dispatch an action when the user clicks a button, simply write this method to invoke a property that can be passed in.

```javascript
render () {
  return (
    <button onClick={this.props.onButtonClick}>Fire Some Action</button>
  );
}
```

### Contexts

Contexts allow you to hook up "dumb" components to your Redux state model.  This is essentially the glue between your state model and presentation logic.

### Reducers

Your Redux reducers that will generate your state model.

### Services

Singletons, classes and utilities that can be used by any part of your application.
