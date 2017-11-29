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

class OrganizationCreate extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
    }
  }
  setName(name) {
    this.setState({name});
  }

  render() {
    const {onCreate, onCancel} = this.props;
    return (
      <Grid>
        <GridCell span="0" desktop="5">
        </GridCell>
        <GridCell span="4" desktop="7">
          <FormField>
            <TextField withLeadingIcon={<TextFieldIcon use="edit"/>}  label="Krytoniks Inc." id="name-field" onChange={(e) => this.setName(e.target.value)} />
          </FormField>
        </GridCell>
        <GridCell span="0" desktop="5">
        </GridCell>
        <GridCell span="2" desktop="2">
          <Button theme={['secondary-dark-bg', 'text-secondary-on-light']} raised onClick={() => onCreate(this.state)}>create</Button>
        </GridCell>
        <GridCell span="2" desktop="2">
          <Button theme={['primary-dark-bg', 'text-primary-on-primary']} raised onClick={() => onCancel()}>cancel</Button>
        </GridCell>
      </Grid>
    )
  }
}

export default OrganizationCreate;
