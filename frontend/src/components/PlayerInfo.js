import React, {Component} from 'react';
import CharacterList from './CharacterList'
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
		     <ListItemStartDetail>
			        <Icon>account_circle</Icon>
		     </ListItemStartDetail>
		       <ListItemText>{this.props.player.username}</ListItemText>
	  </ListItem>
    <ListItem ripple>
        <ListItemStartDetail>
             <Icon>info_outline</Icon>
        </ListItemStartDetail>
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
