# REACT NOTES:

## COMPONENTS:
* Everything is a component in React
* Root(App) component is the parent to all component
* All the components join together to make a page
* A component can hhave multiple components
* ### How component code is placed inside a file?
    * Component code is placed in javascript file
    * App component is present in App.js
    * We can also add component with `.jsx` extensions

### COMPONENT TYPES:
1. Stateless function components : FUNCTIONAL COMPONENTS
* Javascript functions
* They return html which desribes thhe page
* They get the props are an argument to be used to build dynamic html content
 ```Javascript
    function Welcome(props) {
        return (<h1>Hello, {props.name}</h1>);
    }
```
2. Stateful class components : CLASS COMPONENTS
* They are classes that extends the Component class from react library
* They must contain a render method which return html code 
* `import React, { Component } from 'react';`
```Javascript
    class Welcome extends React.Component {
        render() {
            return (<h1>Hello, {this.props.name}</h1>);
        }
    }
```
#### `export default <component_name>` : 'default' allows us to change the name after importing

### FUNCTIONAL vs CLASS FUNCTIONAL:
* Always prefer to use functional components
* Advantage of functional component:
    * Absence of `this` keyword
    * Solution without state. Functional component need no states hence they are stateless
* Class component are for more rich features
* Manages their own private data - `State`
* Used for complex logics 
* Provides lifecycle hooks

**NOTE** : However after react 16.7 we have `HOOKS` Which helps to use states and other react features without using classes
`Hence functional components are not more stateless`

---

## JSX: Javascript XML

* JSX tags have tag name, attributes and chhildren
* JSX is not a necessity to create React apps
* We can use `React.createElement()` instead but JSX makes it look cleaner
```Javascript
    function App() {
        return React.createElement(
            'div',
            null,
            return React.createElement('h1', null, 'Hello Shinu')
        )
    }
```
* Some keywords change in JSX:
    * `class => className`
    * `for => htmlFor`
* Camel casing for few keywords and tags:
    * `onclick => onClick`
    * `tabIndex => tabIndex`
    * `background-color => backgroundColor`

---

## PROPS: Properties
* Optional input which we can pass to the component
* Allows components to be dynamic
* Props are specified as an attributes
* Passing a prop `name` over `Users` component
```Javascript
    class Welcome extends React.Component {
        render() {
            return (
            <div className="App">
                <Users name = "Shinu"/>
                <Users name = "Shibu"/>
                <Users name = "Sunil"/>
            </div>
            );
        }
    }
```
* Users component, recieving and using the prop `name`
    * Functional component:
        ```Javascript
        function Welcome(props) {
            return (
                <h1>Hello, {props.name}</h1>
                );
        }
        ```

### CHILDREN PROPS:
* We can pass children html/value as props as following
```Javascript
    class App extends React.Component {
        render() {
            return (
            <div className="App">
                <Users name = "Shinu">
                    <p>This is a child prop<p>
                </Users>
            </div>
            );
        }
    }
```
* To use this,
```Javascript
    class App extends React.Component {
        render() {
            return (
            <div className="App">
                <Users name = "Shinu">
                    <p>This is a child prop<p>
                </Users>
            </div>
            );
        }
    }
```
```Javascript
    function Users(props) {
        return (
            <h1>hello {props.name}</h1>
            {props.children}
        )
    }
```
* Properties which are known sure about to be passed we can pass them as `attributes`
* If we have no clue of whhat is going to passed as prop or if we want to pass dynamic html content, we can have it in between the tags and render the content using `{props.children}`. If nothing is passed, props.children renders nothing
* **Props are immutable**

---

# `PROPS AND STATES THE WAY TO CONTROL WHAT IS RENDERED ON THE PAGE`
## PROPS vs STATES:
|PROPS |STATES |
|--- |--- |
|Props get passed to the component | States are managed within the component |
|Props are function parameters | States are variables declared within the function body|
|Props get Immutable | States are mutable |
|**_Functional component_**: `props`, **_Class component_**: `this.props` | **_Functional component_**: `useState Hook`, **_Class component_**: `this.state` |

---

## STATE: 
* States in class component:
```Javascript
    class Message extends Component {

        constructor() {
            super();
            this.state = {
                message: "Welcome visitor"
            }
        }

        changeMessage() {
            this.setState({
                message: "Thank you for subscribing"
            })
        }

        render() {
            return (
                <div>
                    <h1> {this.state.message} </h1>
                    <button onClick={() => {
                        this.changeMessage()
                    }}>Subscribe</button>
                </div>
            )
        }
    }
```
* **this.state**: `state` is a reserved keyword
* `setState` is used to update the state properties
* Do's and Dont's with state
    * _Never modify the state directly, as it will not render in the UI. Use setState()_
    `If we try to use something like :`
    ```Javascript
    increement() {
        this.state.count = this.state.count + 1
    }
    ```
    `Then the browser wont get updated with the latest count value`
    * _Calls to setStates are asynchronous hence any code which needs to be executed after setState shuld be passed as setState's callback function_
    ```Javascript
    increementLike() {
        this.setState({
            likes : this.state.likes + 1
        }, () => console.log(this.state.likes))
    }
    ```
    * _Never loop setState calls. React groups multiple setState calls into a single update for a better performance_
    `Whenever we want to use the previous state of the state, we need to pass a function as an argument to setState`
     ```Javascript
    increementLike() {
        // this.setState({
        //     likes : this.state.likes + 1
        // }, () => console.log(this.state.likes))

        this.setState((prevState) => ({            
            likes: prevState.likes + 1
        }))
    }
    ```