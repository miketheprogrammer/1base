import React, { Component} from 'react';
import { connect } from 'react-redux';
import {registerUser} from '../actions/UserActions';
import { Button,
        FormField,
        Grid,
        GridCell,
        TextField,
        TextFieldIcon,
        Toolbar,
        ToolbarRow,
        ToolbarSection,
        ToolbarMenuIcon,
        ToolbarTitle,
        Theme } from 'rmwc';

class Register extends Component {

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
    return (
    <form onSubmit= {this.handleSubmit}>
      <Grid>
        <GridCell span="0" desktop="8">
        </GridCell>
        <GridCell span="4" desktop="4">
          <FormField>
            <TextField withLeadingIcon={<TextFieldIcon use="person"/>}  label="username" name="username" onChange={(e) => this.handleChange(e)} value={this.state.username} />
          </FormField>
        </GridCell>
        <GridCell span="0" desktop="8">
        </GridCell>
        <GridCell span="4" desktop="4">
          <FormField>
            <TextField withLeadingIcon={<TextFieldIcon use="person"/>}  label="password" name="password" onChange={(e) => this.handleChange(e)} value={this.state.password} />
          </FormField>
        </GridCell>
        <GridCell span="0" desktop="8">
        </GridCell>
        <GridCell span="4" desktop="4">
          <FormField>
            <TextField withLeadingIcon={<TextFieldIcon use="person"/>}  label="firstname" name="firstname" onChange={(e) => this.handleChange(e)} value={this.state.firstname} />
          </FormField>
        </GridCell><GridCell span="0" desktop="8">
        </GridCell>
        <GridCell span="4" desktop="4">
          <FormField>
            <TextField withLeadingIcon={<TextFieldIcon use="person"/>}  label="lastname" name="lastname" onChange={(e) => this.handleChange(e)} value={this.state.lastname} />
          </FormField>
        </GridCell>
        <GridCell span="0" desktop="8">
        </GridCell>
      	<GridCell span="4" desktop="4">
          <Button theme={['secondary-light-background', 'text-secondary-on-light']} raised onClick={(e) => this.handleSubmit(e)}>login</Button>
        </GridCell>
      </Grid>
    </form>
  );
  }
}

export default connect()(Register);
