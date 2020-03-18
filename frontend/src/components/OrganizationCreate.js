import React from 'react';
import {NavLink} from 'react-router-dom'
import {
  Button,
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
        <GridCell tablet="5" desktop="5">
        </GridCell>
        <GridCell tablet="5" desktop="7">
          <FormField>
            <TextField withLeadingIcon={<TextFieldIcon use="edit"/>}  label="Krytoniks Inc." id="name-field" onChange={(e) => this.setName(e.target.value)} />
          </FormField>
        </GridCell>
        <GridCell tablet="5" desktop="5">
        </GridCell>
        <GridCell className="create-page-actions" tablet="5" desktop="7">
          <Button theme={['secondaryDarkBg', 'textSecondaryOnLight']} raised onClick={() => onCreate(this.state)}>create</Button>
          <Button theme={['primaryDarkBg', 'textPrimaryOnPrimary']} raised onClick={() => onCancel()}>cancel</Button>
        </GridCell>
      </Grid>
    )
  }
}

export default OrganizationCreate;
