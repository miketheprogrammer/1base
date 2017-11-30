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
  <List>
	   <ListItem ripple>
		     <ListItemStartDetail>
			        <Icon>mood</Icon>
		     </ListItemStartDetail>
		       <ListItemText>{player.username}</ListItemText>
	  </ListItem>
</List>
    );
};

export default PlayerInfo;
