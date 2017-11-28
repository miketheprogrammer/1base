import React, { Component} from 'react';
import {loginUser} from '../actions/UserActions';
import { connect } from 'react-redux';
// import { Button, Input, Form, FormGroup, Label, FormText, Container, Row, Col  } from 'reactstrap';
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
class Login extends Component {

  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  setUsername(e) {
    this.setState({username: e.target.value});
  }
  setPassword(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit (evt) {
      evt.preventDefault();
      this.props.dispatch(loginUser(this.state));
    }

  render () {
    return (
      <Grid>
        <GridCell span="0" desktop="5">
        </GridCell>
      	<GridCell span="4" desktop="7">
          <FormField>
          	<TextField withLeadingIcon={<TextFieldIcon use="person"/>}  label="username" id="username-field" onChange={(e) => this.setUsername(e)} />
          </FormField>
        </GridCell>
        <GridCell span="0" desktop="5">
        </GridCell>
      	<GridCell span="4" desktop="7">
          <FormField>
          	<TextField withLeadingIcon={<TextFieldIcon use="lock"/>} label="password" id="password-field" onChange={(e) => this.setPassword(e)} />
          </FormField>
        </GridCell>
        <GridCell span="0" desktop="5">
        </GridCell>
      	<GridCell span="4" desktop="7">
          <Button theme={['secondary-light-background', 'text-secondary-on-light']} raised onClick={(e) => this.handleSubmit(e)}>login</Button>
        </GridCell>
      </Grid>
    )
    // return (

    // <Container>
    //   <Form>
    //     <Row>
    //     <br/>
    //     </Row>
    //     <Row>
    //       <Col sm={{ size: 6, order: 2, offset: 3 }}>
    //         <FormGroup>
    //             {/*<Label for="username-field">USERNAME</Label>*/}
    //             <Input type="email" value={this.state.username} onChange={this.handleChange} id="username-field" name="username" placeholder="username"/>
    //         </FormGroup>
    //         <FormGroup>
    //             {/*<Label for="password-field">PASSWORD</Label>*/}
    //             <Input type="password" value={this.state.password} onChange={this.handleChange} id="password-field" name="password" placeholder="password" />
    //         </FormGroup>
    //         <FormGroup>
    //         <Button color="primary" onclick={this.handleSubmit}>login</Button>
    //         </FormGroup>
    //       </Col>
    //     </Row>
    //
    //   </Form>
    // </Container>
  // );
  }
}


export default connect(state => ({
}))(Login);
