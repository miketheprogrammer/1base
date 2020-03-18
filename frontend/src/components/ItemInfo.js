import React from 'react';
import {
  List,
  ListItem,
  ListItemGraphic,
  ListItemText,
  Icon
} from 'rmwc';

const ItemInfo = ({item}) => {
    return(
  <List>
	   <ListItem ripple>
		     <ListItemGraphic>
			        <Icon>account_circle</Icon>
		     </ListItemGraphic>
		       <ListItemText>{item._id}</ListItemText>
	  </ListItem>
    <ListItem ripple>
        <ListItemGraphic>
             <Icon>info_outline</Icon>
        </ListItemGraphic>
          <ListItemText>{item.name}</ListItemText>
   </ListItem>
    <ListItem ripple>
        <ListItemGraphic>
             <Icon>info_outline</Icon>
        </ListItemGraphic>
          <ListItemText>{item.type}</ListItemText>
   </ListItem>
   <ListItem ripple>
       <ListItemGraphic>
            <Icon>info_outline</Icon>
       </ListItemGraphic>
         <ListItemText>{item.subType}</ListItemText>
  </ListItem>
</List>
    );
};

export default ItemInfo;
