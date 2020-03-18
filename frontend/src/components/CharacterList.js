import React from 'react';
import {
  Card,
  CardMedia,
  CardPrimaryAction,
  CardTitle,
  CardSupportingText,
  CardActions,
  CardActionButton,
  CardActionButtons,
  CardActionIcon,
  CardActionIcons,
  CardAction,
  Grid,
  GridCell,
  Typography,
} from 'rmwc';

class CharacterList extends React.Component {
  constructor (props) {
    super(props)
  }

  renderCard(character){
      return (
        <Card style={{ width: '21rem' }}>
          <CardPrimaryAction>
            <CardMedia
              sixteenByNine
              style={{
                backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
        		    height: '12.313rem',
              }}
              onClick={(evt)=> this.props.onCharacterClick(character._id)}
            />
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
              <Typography use="headline6" tag="h2">
                {character.name}
              </Typography>
              <Typography
                use="subtitle2"
                tag="h3"
                theme="textSecondaryOnBackground"
                style={{ marginTop: '-1rem' }}
              >
                
              </Typography>
              <Typography
                use="body1"
                tag="div"
                theme="textSecondaryOnBackground"
              >
                
              </Typography>
            </div>
          </CardPrimaryAction>
          <CardActions>
            <CardActionButtons>
            </CardActionButtons>
            <CardActionButton>Edit</CardActionButton>
            <CardActionIcons>
              <CardActionIcon onIcon="favorite" icon="favorite_border" />
              <CardActionIcon icon="share" />
              <CardActionIcon icon="more_vert" />
            </CardActionIcons>
          </CardActions>
        </Card>
      )
    }

    render(){
    return(
      <Grid>
      {
        this.props.characters.map((character) =>
          <GridCell span="3" phone="1" tablet="2" desktop="3" key={character._id}>{this.renderCard(character)}</GridCell>
        )
      }
      </Grid>
    );
  }
};

export default CharacterList;
