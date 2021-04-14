import React, { Component } from 'react';
import PropTypes from 'prop-types'; // impt + enter //Prop Types helps to define the type of the property
import { Link } from 'react-router-dom'

/* CONVERTING CLASS COMPONENT TO FUNCTIONAL */

const Navbar = ({icon_class, title}) => {
    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon_class} aria-hidden="true"/>{title}
            </h1>
            <ul>
                <li>
                    {/* Links help to save the state of the page. 
                        Whenever we redirect to a page using a tag and href, it refreshes the page.
                        Links hhelp in retaining the session */}
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>
        </nav>
    )
}

Navbar.defaultProps = {
    title : "GitHub Finder",
    icon : "fa fa-github"
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar






// class Navbar extends Component {
//     // Default props if not props are passded from the parent component
//     static defaultProps = {
//         title : "GitHub Finder",
//         icon : "fa fa-github"
//     };

//     static propTypes = {
//         title: PropTypes.string.isRequired,
//         icon: PropTypes.string.isRequired
//     }

//     render() {
//         return (
//             <nav className="navbar bg-primary">
//                 <h1>
//                     <i className={this.props.icon_class} aria-hidden="true"/>{this.props.title}
//                 </h1>
//             </nav>
//         )
//     }
// }
