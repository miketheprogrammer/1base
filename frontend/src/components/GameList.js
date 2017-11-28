import React from 'react';
import {NavLink} from 'react-router-dom'
import { Ripple,
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
const GameList = ({games, onSelected}) => {
    const renderCard = (game, onSelected) => {
      return (
        <Card onClick={() => {onSelected(game._id)}}>
        	<CardMedia style={{
        		backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
        		height: '12.313rem',
        	}}>
        	</CardMedia>
        	<CardPrimary>
        		<CardTitle large><p>{game.name}</p></CardTitle>
        		<CardSubtitle></CardSubtitle>
        	</CardPrimary>
        	<CardSupportingText>
        	</CardSupportingText>
        </Card>
      )
    }
    return(
      <Grid>
      {
        games.map((game) =>
          <GridCell span="3" phone="1" tablet="2" desktop="3" key={game.name}>{renderCard(game, onSelected)}</GridCell>
        )
      }
      </Grid>
    );
};

export default GameList;
