import React from 'react';
import {NavLink} from 'react-router-dom'
import {
  Elevation,
  GridList,
  GridTile,
  GridTilePrimary,
  GridTilePrimaryContent,
  GridTileSecondary,
  GridTileTitle,
  Fab,
} from 'rmwc';

const AddNewCard = ({onSelected}) => {
   return (
     <GridTile onClick={() => {onSelected()}}>
       <GridTilePrimary style={{
       }}>
         <GridTilePrimaryContent>
           <Fab>add</Fab>
         </GridTilePrimaryContent>
       </GridTilePrimary>
       <GridTileSecondary>
         <GridTileTitle large><p>Add New</p></GridTileTitle>
       </GridTileSecondary>
     </GridTile>
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
        <GridTile onClick={() => {onCreateNew()}}>
          <GridTilePrimary className="card-fab-center" style={{
            // backgroundImage: 'url(https://material-ui.com/static/logo.png)',
          }}>
            <GridTilePrimaryContent 
              style={{
                  height: "80%"
              }}
              src="https://material-ui.com/static/logo.png"
              >
            </GridTilePrimaryContent>
          </GridTilePrimary>
          <GridTileSecondary style={{
            // height: '6.45rem',

          }}>
            <GridTileTitle><p>Add New</p></GridTileTitle>

          </GridTileSecondary>
        </GridTile>
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
        <GridTile onClick={() => {onSelected(organization._id)}}>
        <GridTilePrimary style={{
          backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
        }}>
            <GridTilePrimaryContent >
            </GridTilePrimaryContent>
          </GridTilePrimary>
          <GridTileSecondary>
            <GridTileTitle><p>{organization.name}</p></GridTileTitle>
          </GridTileSecondary>

        </GridTile>
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
      <GridList>
        <CreateNewCard key="create-new" onCreateNew={onCreateNew}/>
        {
          organizations.map((organization) =>
              <OrganizationCard key={organization._id} organization={organization} onSelected={onSelected}/>
          )
        }
      </GridList>
    );
  }
}


export default OrganizationList;
