import React from 'react';
import {NavLink} from 'react-router-dom'
import {
  Ripple,
  Card,
  CardMedia,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardSupportingText,
  CardActions,
  CardAction,
  Elevation,
  Grid,
  GridCell,
  Fab,
} from 'rmwc';

const AddNewCard = ({onSelected}) => {
   return (
     <Card onClick={() => {onSelected()}}>
       <CardMedia style={{
         height: '12.313rem',
       }}>
       <Fab>add</Fab>
       </CardMedia>
       <CardPrimary>
         <CardTitle large><p>Add New</p></CardTitle>
         <CardSubtitle></CardSubtitle>
       </CardPrimary>
       <CardSupportingText>
       </CardSupportingText>
     </Card>
   )
}

class CreateNewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevation: 0
    }
  }
  render() {
    const {onCreateNew} = this.props;

    return (
      <Elevation
      	z={this.state.elevation || 0}
      	transition
      	onMouseOver={() => this.setState({elevation: 24})}
      	onMouseOut={() => this.setState({elevation: 0})}
      >
        <Card onClick={() => {onCreateNew()}}>
          <CardMedia id="whatever" className="card-fab-center" style={{
            backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
            height: '12.313rem',
            // justifyContent: "center",
            // alignItems: "center",
          }}>
          <Fab onClick={() => onCreateNew()}>add</Fab>
          </CardMedia>
          <CardPrimary style={{
            height: '6.45rem',
          }}>
            <CardTitle large><p></p></CardTitle>
            <CardSubtitle></CardSubtitle>
          </CardPrimary>
        </Card>
      </Elevation>
    )
  }
}
class OrganizationCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevation: 0
    }
  }
  render() {
    const {organization, onSelected} = this.props
    return (
      <Elevation
      	z={this.state.elevation || 0}
      	transition
      	onMouseOver={() => this.setState({elevation: 24})}
      	onMouseOut={() => this.setState({elevation: 0})}
      >
        <Card onClick={() => {onSelected(organization._id)}}>
          <CardMedia style={{
            backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
            height: '12.313rem',
          }}>
          </CardMedia>
          <CardPrimary>
            <CardTitle large><p>{organization.name}</p></CardTitle>
            <CardSubtitle></CardSubtitle>
          </CardPrimary>
          <CardSupportingText>
          </CardSupportingText>
        </Card>
      </Elevation>
    )
  }
}

class OrganizationList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {organizations, onSelected, onCreateNew} = this.props;
    return(
      <Grid>
        <GridCell span="3" phone="2" tablet="2" desktop="3" key={"add-new-true"}>
          <CreateNewCard onCreateNew={onCreateNew}/>
        </GridCell>
        {
          organizations.map((organization) =>
            <GridCell span="3" phone="2" tablet="2" desktop="3" key={organization.name}>
              <OrganizationCard organization={organization} onSelected={onSelected}/>
            </GridCell>
          )
        }
      </Grid>
    );
  }
}


export default OrganizationList;
