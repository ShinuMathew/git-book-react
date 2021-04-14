import React, { Component } from 'react';
import PropTypes from 'prop-types'


export class Search extends Component {

    state = {
        text : ""
    }

    static propTypes = {
        searchUsers : PropTypes.func.isRequired,
        clearUsers : PropTypes.func.isRequired,
        showClear : PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired   
    }

    onChange = (e) => {
        this.setState({
            // text : e.target.value   
            /**
             * If we have multiple controlled input fields in a form, we need not create onChange events for each of it as above,
             * We can use the name attribute of the element and map it like below
             */
            // [e.target.type] : e.target.value
            [e.target.name] : e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault(); // If we dont use arrow functions we need to add 'e.preventDefault' just like in JS to prevent submission to a file
        if(this.state.text === ""){
            this.props.setAlert('Please enter something', 'light')
        } else {
            console.log(this.state.text)
            this.props.searchUsers(this.state.text);    // Sending prop up to a parent component
            this.setState({ text : "" })
        }
    }

    render() {
        const { showClear, clearUsers } = this.props
        return (
            <div>
                {/* <form className="form" onSubmit={this.onSubmit.bind(this)}> */}
                <form className="form" onSubmit={this.onSubmit}>
                    {/* NOTE : If we dont use arrow function and do this.onSubmit, we get error 'TypeError: Cannot read property 'state' of undefined' whhen we submit
                        Because 'this' is not bind to the onSubmit and we need to do it explicitly using 'bind(this)*/}
                    <input name="text" type="text" placeholder="Search User..." value={this.state.text} onChange={this.onChange}/>
                    {/* NOTE : We cannot type in the text box, because its a controlled component as we use the state in value and we need an onChange event 
                    for anything we do in it. The event needs to fire off and update the state*/}
                    <input type="submit" value="Search" className="btn btn-dark btn-block"/>
                </form>
                {showClear && (
                    <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
                )}                
            </div>
        )
    }
}

export default Search
