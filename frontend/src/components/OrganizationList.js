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
         height: '12.313rem',
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
            // backgroundImage: 'url(https://lh3.googleusercontent.com/Yo-_PCJf56s0nR32KrNJHMAt5kXfB_FgSRChgFhZ5zoyIUO5RbJ_DD31RxNIXl2M9ksSlyjwfwMqTC6ZYsV_AO7o4ku8192XTpRBj81f0Y9_MRKK1YwZXjZ6MPdRv4bgha2ecOT_8ROhwHRQaLwK0ohzdviu6rTN5mdZEgRcS7KAeOaUon5YSSGa8MdZfXLNGSZ7SFIMwXnar_dhEwWnOkVjM2NFzP3o4eOVfq_GRAxJz0fHV-nEYsnwTJO6lpM8Om2WdNwKB5P6-mkl6plDYvC-JncT0CGMN2oygnY6rtx2H7BujlbnyTJTqZHZJUj78gfkD0GgP_mToVa8Grhk8LdMXg_Ot8vW3N4bC5CKa71GfvEVhnLEAeX9MDt4RJ5tvh_FQzYsS1E6g-PEL5xrKHu20Ep2pM9yPxGpB4ovJe-fgoRWi_YlK9gLVqa-VhfHrcv3Ju0B-4A2P6i8Z1pEtH7_QvfEPIj308XKybCLgp6cCv2kDjEoqJMvqBmpnOUsXCWByceMDcnUcFQyyCyqAMvxBv6bwQC7z0O8fjyW5UcXdZISOrBKMhykR0spOaXa=w2880-h1386)',
            height: '12.313rem',
          }}>
            <GridTilePrimaryContent>
              <img
                style={{
                  height: "80%"
                }}
                src="https://lh3.googleusercontent.com/Yo-_PCJf56s0nR32KrNJHMAt5kXfB_FgSRChgFhZ5zoyIUO5RbJ_DD31RxNIXl2M9ksSlyjwfwMqTC6ZYsV_AO7o4ku8192XTpRBj81f0Y9_MRKK1YwZXjZ6MPdRv4bgha2ecOT_8ROhwHRQaLwK0ohzdviu6rTN5mdZEgRcS7KAeOaUon5YSSGa8MdZfXLNGSZ7SFIMwXnar_dhEwWnOkVjM2NFzP3o4eOVfq_GRAxJz0fHV-nEYsnwTJO6lpM8Om2WdNwKB5P6-mkl6plDYvC-JncT0CGMN2oygnY6rtx2H7BujlbnyTJTqZHZJUj78gfkD0GgP_mToVa8Grhk8LdMXg_Ot8vW3N4bC5CKa71GfvEVhnLEAeX9MDt4RJ5tvh_FQzYsS1E6g-PEL5xrKHu20Ep2pM9yPxGpB4ovJe-fgoRWi_YlK9gLVqa-VhfHrcv3Ju0B-4A2P6i8Z1pEtH7_QvfEPIj308XKybCLgp6cCv2kDjEoqJMvqBmpnOUsXCWByceMDcnUcFQyyCyqAMvxBv6bwQC7z0O8fjyW5UcXdZISOrBKMhykR0spOaXa=w2880-h1386"/>
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
          height: '12.313rem',
        }}>
            <GridTilePrimaryContent >
            </GridTilePrimaryContent>
          </GridTilePrimary>
          <GridTileSecondary>
            <GridTileTitle large><p>{organization.name}</p></GridTileTitle>
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
        <CreateNewCard onCreateNew={onCreateNew}/>
        {
          organizations.map((organization) =>
              <OrganizationCard organization={organization} onSelected={onSelected}/>
          )
        }
      </GridList>
    );
  }
}


export default OrganizationList;
