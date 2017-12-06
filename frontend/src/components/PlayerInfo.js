import React from 'react';
import CharacterList from './CharList'
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
  List,
  ListItem,
  ListItemStartDetail,
  ListItemText,
  Icon
} from 'rmwc';

const PlayerInfo = ({player}) => {
  console.log('viewing', player);
    return(
  <section>
  <List>
	   <ListItem ripple>
		     <ListItemStartDetail>
			        <Icon>account_circle</Icon>
		     </ListItemStartDetail>
		       <ListItemText>{player.username}</ListItemText>
	  </ListItem>
    <ListItem ripple>
        <ListItemStartDetail>
             <Icon>info_outline</Icon>
        </ListItemStartDetail>
          <ListItemText>{player.firstname} {player.lastname}</ListItemText>
   </ListItem>
</List>
<CharacterList characters={player.characters} onCharacterClick={()=>{}}/>
</section>
    );
};

export default PlayerInfo;
