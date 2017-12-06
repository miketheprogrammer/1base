import React from 'react';
import ItemList from './ItemList'
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

const CharacterInfo = ({character}) => {
    return(
  <List>
	   <ListItem ripple>
		     <ListItemStartDetail>
			        <Icon>account_circle</Icon>
		     </ListItemStartDetail>
         <ListItemText>{character.firstname} {character.lastname}</ListItemText>
         <ItemList items={character.inventory}/>
   </ListItem>
</List>
    );
};

export default CharacterInfo;
