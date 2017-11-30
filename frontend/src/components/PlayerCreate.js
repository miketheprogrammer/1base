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
    }
  }
  setName(username) {
    this.setState({username});
  }

  render() {
    const {onCreate, onCancel} = this.props;
    return (
      <Grid>
        <GridCell tablet="5" desktop="5">
        </GridCell>
        <GridCell tablet="5" desktop="7">
          <FormField>
            <TextField withLeadingIcon={<TextFieldIcon use="edit"/>}  label="Justin Pinero" id="name-field" onChange={(e) => this.setName(e.target.value)} />
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
