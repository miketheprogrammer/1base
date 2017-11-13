import React, { Component} from 'react';
import {loginUser} from '../actions/UserActions';


export default class Login extends Component {

  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if(event.target.name === "username"){
      this.setState({username: event.target.value});
    }else if(event.target.name === "password"){
      this.setState({password: event.target.value});
    }
  }

  handleSubmit (evt) {
      evt.preventDefault();
      this.props.dispatch(loginUser(this.state));
    }

  render () {
    <form onSubmit= {this.handleSubmit}>
        <div className="form-group">
            <label>USERNAME</label>
            <input type="text" value={this.state.username} onChange={this.handleChange} id="username-field" name="username" />
        </div>
        <div className="form-group">
            <label>PASSWORD</label>
            <input type="text" value={this.state.password} onChange={this.handleChange} id="password-field" name="password" />
        </div>
        <button type="submit">LOGIN</button>
    </form>;
  }
}
