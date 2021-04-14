import React, {
  Component, Fragment
} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import UserItems from './components/users/UserItem'
import Search from './components/users/Search'
import Users from './components/users/Users'
import User from './components/users/User'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import axios from 'axios'
import PropTypes from 'prop-types'
import './App.css';

class App extends Component {

  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  // static propTypes = {
  //   loading : PropTypes.bool.isRequired,
  //   user : PropTypes.object.isRequired,
  //   repos : PropTypes.array.isRequired,
  //   getUser: PropTypes.func.isRequired
  // }

  // Life cycle methhod like render. It runs when the component mounts
  async componentDidMount() {
    this.setState( { loading: true } )
    const res = await axios.get(`https://api.github.com/users?client_id=
                  ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
                  ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState( { users : res.data } )
    this.setState( { loading: false } )
    console.log(res.data)
  }

  // Search users using github api
  searchUsers = async (text) => {
    this.setState( { loading: true } )
    const res = await axios.get(`https://api.github.com/search/users?q=${text}
                  &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                  &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data)
    let result = res.data.items
    this.setState({ users : res.data.items})
    this.setState( { loading: false } )
  }

  // Get user data using username
  getUser = async (username) => {
    console.log('Getting user')
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}?
                  client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                  &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data)
    this.setState({ user : res.data, loading : false })
  }

  // Get user repos and details
  getUserRepos = async (username) => {
    console.log('Getting user repos')
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc
                  &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                  &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data)
    this.setState({ repos : res.data, loading : false })
  }

  // Clear the user result list
  clearUsers = async (text) => {
    this.setState({ users:[], loading: false})
  }

  // Show alert for 3 secs if notihng is typed 
  setAlert = async (alertText, type) => {
    this.setState({
      alert: { alertText, type }
    })

    setTimeout(() => this.setState({ alert : null }), 3000)
  }


  render() {
    const { users, user, loading, repos } = this.state
    return (
      <Router>
        <div className="App">
          <Navbar icon_class="fa fa-github" />        
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render = { props => (
                <Fragment>
                  <Search 
                  searchUsers={ this.searchUsers } 
                  clearUsers={ this.clearUsers } 
                  showClear={ users.length > 0 ? true : false } 
                  setAlert={this.setAlert}/>
                  <Users loading={ loading } users={ users }>
                    <p>This is child prop</p>
                  </Users>
                </Fragment>
              )} />
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render = { props => (
              <User 
              { ...props } 
              getUser={this.getUser} 
              getUserRepos={this.getUserRepos} 
              user={user} 
              repos={repos}
              loading={loading}/>          
            )
          } />       
          </Switch>
          
          </div>
        </div>
      </Router>
    )
  }
}


export default App;





// class App extends Component {

  // foo2 = () => 'Method of App class';  
  // render() {
    // const invalid_title = [1, 3, 5, 6]  //  title = {invalid_title}, COMPONENT THROWS ERROR: Invalid prop `title` of type `array` supplied to `Navbar`, expected `string`. at Navbar 
    // const name = 'Shinu Mathew'
    // const foo = () => 'Function of render method'
    // const loading = "false"
    // const loading2 = false

    // if(loading === true) {
    //   return <h4>LOADING....</h4>
    // } else {
    // return (
      // <React.Fragment>
      //   <div className="App">
      //     <h1>Calling a variable : '{name}'</h1>        
      //     <h1>Using JS operations : '{1+1}'</h1>        
      //     <h1>Calling a function : '{foo()}'</h1>        
      //     <h1>Calling a method part of the class : '{this.foo2()}'</h1>      
      //     {loading2 ? <h2>Still Loading</h2> : <h2>Loaded...</h2>}  
      //   </div>

      //   {/* <label htmlFor="name">Name </label> */}
      // </React.Fragment>
      // <div className="App">
      //   <Navbar icon_class="fa fa-github" />
      //   {/* <UserItems /> */}
      //   <div className="container">
      //     <Users>
      //       <p>This is child prop</p>
      //     </Users>
      //   </div>
      // </div>
      /* title is a prop : prop are property that we can pass from outside the component */
  //   );
  // }

  /* Similar implementation using JS without JSX */
  // return React.createElement('h1', null, 'Hello')  
// }
