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

class ItemCreate extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      type: '',
      subType: '',
    }
  }
  setName(name) {
    this.setState({name});
  }
  setType(type) {
    this.setState({type});
  }
  setSubType(subType) {
    this.setState({subType});
  }

  render() {
    const {onCreate, onCancel} = this.props;
    return (
      <Grid>
        <GridCell tablet="5" desktop="5">
        </GridCell>
        <GridCell tablet="5" desktop="7">
          <FormField>
            <TextField withLeadingIcon={<TextFieldIcon use="edit"/>}  label="Water Sprinkler of Nem Ankh" id="name-field" onChange={(e) => this.setName(e.target.value)} />
          </FormField>
        </GridCell>
        <GridCell tablet="5" desktop="5">
        </GridCell>
        <GridCell tablet="5" desktop="7">
          <FormField>
            <TextField withLeadingIcon={<TextFieldIcon use="edit"/>}  label="weapon" id="name-field" onChange={(e) => this.setType(e.target.value)} />
          </FormField>
        </GridCell>
        <GridCell tablet="5" desktop="5">
        </GridCell>
        <GridCell tablet="5" desktop="7">
          <FormField>
            <TextField withLeadingIcon={<TextFieldIcon use="edit"/>}  label="mace" id="name-field" onChange={(e) => this.setSubType(e.target.value)} />
          </FormField>
        </GridCell>
        <GridCell tablet="5" desktop="5">
        </GridCell>
        <GridCell className="create-page-actions" tablet="5" desktop="2">
          <Button theme={['secondaryDarkBg', 'textSecondaryOnLight']} raised onClick={() => onCreate(this.state)}>create</Button>
          <Button theme={['primaryDarkBg', 'textPrimaryOnPrimary']} raised onClick={() => onCancel()}>cancel</Button>
        </GridCell>
      </Grid>
    )
  }
}

export default ItemCreate;
