import React from 'react';
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
  Grid,
  GridCell,
} from 'rmwc';

const CharacterList = ({characters, onCharacterClick}) => {
    const renderCard = (character) => {
      return (
        <Card>
        	<CardMedia style={{
        		backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
        		height: '12.313rem',
        	}} onClick={(evt)=> onCharacterClick(character._id)}>
        	</CardMedia>
        	<CardPrimary>
        		<CardTitle large><p>{character.name}</p></CardTitle>
        	</CardPrimary>
        	<CardSupportingText>
        	</CardSupportingText>
        	<CardActions>
        		<CardAction>Edit</CardAction>
        	</CardActions>
        </Card>
      )
    }
    return(
      <Grid>
      {
        characters.map((character) =>
          <GridCell span="3" phone="1" tablet="2" desktop="3" key={character._id}>{renderCard(character)}</GridCell>
        )
      }
      </Grid>
    );
};

export default CharacterList;
