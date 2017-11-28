import React from 'react';
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
const PlayerList = ({players}) => {
    const renderCard = (player) => {
      return (
        <Card>
        	<CardMedia style={{
        		backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
        		height: '12.313rem',
        	}}>
        	</CardMedia>
        	<CardPrimary>
        		<CardTitle large><p>{player.username.toLowerCase()}</p></CardTitle>
        		<CardSubtitle>{((player.firstname || '') + ' ' + (player.lastname || '') ).trim() || 'firstname lastname'}</CardSubtitle>
        	</CardPrimary>
        	<CardSupportingText>
        	</CardSupportingText>
        	<CardActions>
        		<CardAction>Edit</CardAction>
        		<CardAction>Contact</CardAction>
        	</CardActions>
        </Card>
      )
    }
    return(
      <Grid>
      {
        players.map((player) =>
          <GridCell span="3" phone="1" tablet="2" desktop="3" key={player.username}>{renderCard(player)}</GridCell>
        )
      }
      </Grid>
    );
};

export default PlayerList;
