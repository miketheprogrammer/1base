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
      <section>
  <List>
    <ListItem ripple>
        <ListItemStartDetail>
             <Icon>info_outline</Icon>
        </ListItemStartDetail>
          <ListItemText>{character.name}</ListItemText>
   </ListItem>
</List>
<ItemList
  items={character.inventory}
  onSelected={null}
  onCreateNew={null}
/>
</section>
    );
};

export default CharacterInfo;
