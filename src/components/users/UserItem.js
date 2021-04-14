import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// class UserItems extends Component {
    // constructor(){
    //     super();
    //     this.state = {
    //         id: 'id',
    //         login: 'mojombo',
    //         avatar: 'https://avatars0.githubusercontent.com/u/1?v=4',
    //         html_url: 'https://github.com/mojombo'
    //     }
    // }

    // state = {
    //     id: 'id',
    //     login: 'mojombo',
    //     avatar: 'https://avatars0.githubusercontent.com/u/1?v=4',
    //     html_url: 'https://github.com/mojombo'
    // }
    // render() {
    //     // Destructing 'state' so that we need not use 'this.state' always
    //     const { login, avatar_url, html_url } = this.props.user;
    //     return (
    //         <div className="card text-center">
    //             <img src={avatar_url} className="round-img" style={{width : '60px'}} alt=""/>
    //             {/* <h3>{this.state.login}</h3> */}
    //             <h3>{login}</h3>
    //             <div>
    //                 <a href={html_url} className="btn btn-dark btn-sm my-1">More</a>
    //             </div>
    //         </div>
    //     )
    // }
// }

/* CONVERTING CLASS COMPONENT TO FUNCTIONAL */

const UserItems = ({user : { login, avatar_url, html_url }}) => {
    // Destructing 'state' so that we need not use 'this.state' always
    // const { login, avatar_url, html_url } = props.user;
    return (
        <div className="card text-center">
            <img src={avatar_url} className="round-img" style={{width : '60px'}} alt=""/>
            {/* <h3>{this.state.login}</h3> */}
            <h3>{login}</h3>
            <div>
                <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">More</Link>
            </div>
        </div>
    )
}

UserItems.propTypes = {
    user: PropTypes.object.isRequired
}

export default UserItems;