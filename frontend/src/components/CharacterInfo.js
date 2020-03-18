import React from 'react';
import ItemList from './ItemList'
import {
  List,
  ListItem,
  ListItemGraphic,
  ListItemText,
  Icon
} from 'rmwc';

const CharacterInfo = ({character}) => {
    return(
      <section>
  <List>
    <ListItem ripple>
        <ListItemGraphic>
             <Icon>info_outline</Icon>
        </ListItemGraphic>
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
