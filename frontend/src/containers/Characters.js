import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as Rx from 'rxjs';
import CharacterInfo from '../components/CharacterInfo';
import CharacterList from '../components/CharacterList';
// import CharacterCreate from '../components/CharacterCreate';
import RequestTimesChart from '../components/charts/RequestTimesChart';
import ChartCard from '../components/ChartCard';
import SingleStat from '../components/charts/SingleStat';
import HoverElevation from '../components/HoverElevation';
import * as CharacterActions from '../actions/CharacterActions';
import {
  Button,
  Fab,
  TextField,
  TextFieldIcon,
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarMenuIcon,
  ToolbarTitle,
  ToolbarIcon,
  Theme,
  GridList,
  Grid,
  GridCell,
} from 'rmwc';

class Characters extends Component {
  constructor (props){
    super(props)
  }

  componentDidMount() {
    console.log('characters component did mount');
    if (this.props.dispatch)
      this.props.dispatch(CharacterActions.fetchCharacters({game_id: this.props.selectedGame}));
  }

  renderToolbarActionButtons() {
    const {dispatch} = this.props;
    return (
      <ToolbarSection alignStart>
      <Button
        theme={
          [
            'secondary-dark-bg',
            'text-secondary-on-light'
          ]
        }
        style={{
          marginRight: "10px",
        }}
        raised
        onClick={() => {dispatch(CharacterActions.createNewCharacter())}}
      >New</Button>
      </ToolbarSection>
    )
  }

  search(searchFilter) {
    const {dispatch} = this.props;
    dispatch(CharacterActions.searchCharacters(searchFilter))
  }

  renderToolbar(title, includeActionButtons) {
    const {dispatch, searchFilter} = this.props;
    let actionButtons;
    if (includeActionButtons)
      actionButtons = this.renderToolbarActionButtons()
    return (
      <Toolbar class="toolbar-content" style={{ backgroundColor: '#fff' }} theme={['primary', 'text-secondary-on-background']}>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarTitle>{title}</ToolbarTitle>
          </ToolbarSection>
          <ToolbarSection alignEnd>
            <TextField withLeadingIcon={<TextFieldIcon use="search"/>}  label="search" onChange={(e) => this.search(e.target.value)} value={searchFilter}/>
          </ToolbarSection>
          {actionButtons}
        </ToolbarRow>
      </Toolbar>
    )
  }

  renderCharactersList() {
    const {characters, dispatch} = this.props;
    return (
      <section>
        <CharacterList
          characters={characters}
          onCharacterClick={(characterId)=>dispatch(CharacterActions.selectCharacter(characterId))}
        />
      </section>
    )
  }

  // renderCreateNewCharacter() {
  //   const {characters, dispatch} = this.props;
  //   return (
  //     <CharacterCreate
  //       onCreate={(values) => this.createCharacter(values)}
  //       onCancel={() => {dispatch(CharacterActions.cancelCreateNewCharacter())}}
  //     />
  //   )
  // }
  renderViewCharacter(){
    const {characters, dispatch, selectedCharacter}=this.props;
    console.log("selected cahr!!!!!!!!!!!!!!!!!", selectedCharacter)
    console.log("I am an array,", characters)
    const character = characters.filter((character)=> character._id===selectedCharacter)[0]
    console.log('character is here', character)

    if (!character) {
      return (<div>Character is missing for some reason from the data</div>)
    }else{
    return (
      <CharacterInfo
        character={character}/>
    )
  }
  }
  render () {
    const {
      characters,
      creating,
      dispatch,
      selectedCharacter,
      selectedGame,
      selectedOrganization
    } = this.props;
    console.log("selectedCharacter", selectedCharacter);

    let toolbar, content;
    if (!creating) {
      if(selectedCharacter){
        toolbar= this.renderToolbar("Character View")
        content = this.renderViewCharacter();
      } else {
        toolbar = this.renderToolbar("View and Manage your Characters", true);
        content = this.renderCharactersList();
      }
    } else {
      // toolbar = this.renderToolbar("Create Your Player");
      // content = this.renderCreateNewPlayer();
    }
    return (
      <main style={{marginTop: "16px"}}>
        {toolbar}
        {content}
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    characters: state.character.characters || [],
    players: state.player.players || [],
    selectedGame: state.game.selected,
    selectedOrganization: state.organization.selected,
    creating: state.player.creating,
    selectedCharacter: state.character.selectedCharacter,
    searchFilter: state.player.searchFilter,
  };
};

export default connect(mapStateToProps)(Characters);
