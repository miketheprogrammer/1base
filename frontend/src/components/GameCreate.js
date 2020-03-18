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

class GameCreate extends React.Component {
  constructor (props) {
    console.log('constructing game create');
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
            <TextField withLeadingIcon={<TextFieldIcon use="edit"/>}  label="3 Days To Die" id="name-field" onChange={(e) => this.setName(e.target.value)} />
          </FormField>
        </GridCell>
        <GridCell tablet="5" desktop="5">
        </GridCell>
        <GridCell className="create-page-actions" tablet="5" desktop="2">
          <Button theme={['secondary-dark-bg', 'textSsecondaryOnLight']} raised onClick={() => onCreate(this.state)}>create</Button>
          <Button theme={['primary-dark-bg', 'textPrimaryOnPrimary']} raised onClick={() => onCancel()}>cancel</Button>
        </GridCell>
      </Grid>
    )
  }
}

export default GameCreate;
