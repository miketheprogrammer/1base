import * as Rx from 'rxjs';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import GameList from '../components/GameList';
import GameCreate from '../components/GameCreate';
import * as GameActions from '../actions/GameActions';
import './CounterApp.css';
import logo from '../logo.svg';
import {
  Button,
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarMenuIcon,
  ToolbarTitle,
  ToolbarIcon,
  Theme
} from 'rmwc';

class Game extends Component {
  constructor(props){
    super(props);
    this.setState({});
  }
  componentDidMount() {
    if (this.props.dispatch)
      this.props.dispatch(GameActions.fetchGames({organization_id: this.props.organization_id}));
  }
  componentWillUnmount() {
  }

  createGame(values) {
    console.log('creating GAMEwith ', values, this.props);
    values.organization = this.props.organization_id;
    this.props.dispatch(GameActions.saveNewGame(values));
  }

  renderToolbar(title) {
    return (
      <Toolbar className="toolbar-content" style={{ backgroundColor: '#fff' }} theme={['primary', 'text-secondary-on-background']}>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarTitle>{title}</ToolbarTitle>
          </ToolbarSection>
        </ToolbarRow>
      </Toolbar>
    )
  }

  renderGameList() {
    const { organization_id, games, dispatch } = this.props;
    return (
      <GameList
        games={games}
        onSelected={(_id) => {
          dispatch(GameActions.selectGame({_id}));
          dispatch(push({url: `/organization/${organization_id}/game/${_id}/players`, pathname:`/organization/${organization_id}/game/${_id}/players`}));
        }}
        onCreateNew={() => {
          dispatch(GameActions.createNewGame())
        }}
        />
    )
  }

  renderCreateNewGame() {
    const { organizations, dispatch } = this.props;
    return (
      <GameCreate
        onCreate={(values) => this.createGame(values)}
        onCancel={() => {dispatch(GameActions.cancelCreateNewGame())}}
      />
    )
  }
  render() {
    const { games, creating, dispatch } = this.props;
    let toolbar, content;
    if (!creating) {
      toolbar = this.renderToolbar("Your Games");
      content = this.renderGameList();
    } else {
      toolbar = this.renderToolbar("Create A New Game");
      content = this.renderCreateNewGame()
    }
    return (
      <main style={{marginTop: "12px"}}>
        {toolbar}
        {content}
      </main>
    )

  }

}
export default connect(state => ({
  games: state.game.games || [],
  organization_id: state.organization.selected,
  creating: Boolean(state.game.creating),
}))(Game);
