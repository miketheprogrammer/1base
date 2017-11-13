import React, { Component} from 'react';
import {registerUser} from '../actions/UserActions';


export default class Register extends Component {

  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstname:'',
      lastname:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if(event.target.name === "username"){
      this.setState({username: event.target.value});
    }else if(event.target.name === "password"){
      this.setState({password: event.target.value});
    }else if(event.target.name === "firstname"){
      this.setState({firstname: event.target.value});
    }else if(event.target.name === "lastname"){
      this.setState({lastname: event.target.value});
    }
  }

  handleSubmit (evt) {
    evt.preventDefault();
    this.props.dispatch(registerUser(this.state));
  }

  render () {
    <form onSubmit= {this.handleSubmit}>
        <div className="form-group">
            <label>USERNAME (email address)*</label>
            <input type="text" value={this.state.username} onChange={this.handleChange} id="username-field" name="username" />
        </div>
        <div className="form-group">
            <label>PASSWORD*</label>
            <input type="text" value={this.state.password} onChange={this.handleChange} id="password-field" name="password" />
        </div>
        <div className="form-group">
            <label>First Name</label>
            <textarea value={this.state.firstname} onChange={this.handleChange} id="firstname-field" name="firstname" />
        </div>
        <div className="form-group">
            <label>Last Name</label>
            <textarea value={this.state.lastname} onChange={this.handleChange} id="lastname-field" name="lastname" />
        </div>
        <button type="submit">REGISTER!</button>
    </form>;
  }
}
