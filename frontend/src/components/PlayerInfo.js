import React, {Component} from 'react';
import CharacterList from './CharacterList'
import ItemList from './ItemList'
import {
  List,
  ListItem,
  ListItemGraphic,
  ListItemText,
  Icon
} from 'rmwc';

class PlayerInfo extends Component {
  constructor (props){
    super(props)
    this.state={
      switchTab:true
    }
  }

  render(){
    return(
  <section>
  <List>
	   <ListItem ripple>
		     <ListItemGraphic>
			        <Icon>account_circle</Icon>
		     </ListItemGraphic>
		       <ListItemText>{this.props.player.username}</ListItemText>
	  </ListItem>
    <ListItem ripple>
        <ListItemGraphic>
             <Icon>info_outline</Icon>
        </ListItemGraphic>
          <ListItemText>{this.props.player.firstname} {this.props.player.lastname}</ListItemText>
   </ListItem>
</List>
<List>
  <ListItemText onClick={
    (evt)=>{
    this.setState({switchTab:true})
    }
  }
  > Characters</ListItemText>
  <ListItemText onClick={
    (evt)=>{
    this.setState({switchTab:false})
    }
  }>Items</ListItemText>
</List>

{
  this.state.switchTab
 ?
 <CharacterList characters={this.props.player.characters} onCharacterClick={this.props.onCharacterClick}/>
:
<ItemList items={this.props.player.inventory}/>
}
</section>
    );
};
}

export default PlayerInfo;
