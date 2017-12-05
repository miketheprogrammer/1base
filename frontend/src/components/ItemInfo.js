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

const ItemInfo = ({item}) => {
    return(
  <List>
	   <ListItem ripple>
		     <ListItemStartDetail>
			        <Icon>account_circle</Icon>
		     </ListItemStartDetail>
		       <ListItemText>{item._id}</ListItemText>
	  </ListItem>
    <ListItem ripple>
        <ListItemStartDetail>
             <Icon>info_outline</Icon>
        </ListItemStartDetail>
          <ListItemText>{item.name}</ListItemText>
   </ListItem>
    <ListItem ripple>
        <ListItemStartDetail>
             <Icon>info_outline</Icon>
        </ListItemStartDetail>
          <ListItemText>{item.type}</ListItemText>
   </ListItem>
   <ListItem ripple>
       <ListItemStartDetail>
            <Icon>info_outline</Icon>
       </ListItemStartDetail>
         <ListItemText>{item.subType}</ListItemText>
  </ListItem>
</List>
    );
};

export default ItemInfo;
