import React from 'react';
import {NavLink} from 'react-router-dom'
import {
  Ripple,
  Button,
  Card,
  CardMedia,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardSupportingText,
  CardActions,
  CardAction,
  Fab,
  FormField,
  Grid,
  GridCell,
  TextField,
  TextFieldIcon,

} from 'rmwc';

class PlayerCreate extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      firstname:'',
      lastname:''
    }
  }
  setUserName(username) {
    this.setState({username});
  }

  setFirstName(firstname) {
    this.setState({firstname});
  }

  setLastName(lastname) {
    this.setState({lastname});
  }

  render() {
    const {onCreate, onCancel} = this.props;
    return (
      <Grid>
        <GridCell tablet="5" desktop="5">
        </GridCell>
        <GridCell tablet="5" desktop="7">
          <FormField>
            <TextField withLeadingIcon={<TextFieldIcon use="account_circle"/>}  label="Fartblaster" onChange={(e) => this.setUserName(e.target.value)} />
          </FormField>
        </GridCell>
        <GridCell tablet="5" desktop="5">
        </GridCell>
        <GridCell tablet="5" desktop="7">
          <FormField>
            <TextField withLeadingIcon={<TextFieldIcon use="edit"/>}  label="John" onChange={(e) => this.setFirstName(e.target.value)} />
          </FormField>
        </GridCell>
        <GridCell tablet="5" desktop="5">
        </GridCell>
        <GridCell tablet="5" desktop="7">
          <FormField>
            <TextField withLeadingIcon={<TextFieldIcon use="edit"/>}  label="Travolta" onChange={(e) => this.setLastName(e.target.value)} />
          </FormField>
        </GridCell>
        <GridCell tablet="5" desktop="5">
        </GridCell>
        <GridCell className="create-page-actions" tablet="5" desktop="7">
          <Button theme={['secondary-dark-bg', 'text-secondary-on-light']} raised onClick={() => onCreate(this.state)}>create</Button>
          <Button theme={['primary-dark-bg', 'text-primary-on-primary']} raised onClick={() => onCancel()}>cancel</Button>
        </GridCell>
      </Grid>
    )
  }
}

export default PlayerCreate;
