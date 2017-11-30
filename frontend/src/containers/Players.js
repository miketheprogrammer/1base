import React, { Component} from 'react';
import { connect } from 'react-redux';
import Rx from 'rxjs';
import PlayerInfo from '../components/PlayerInfo';
import PlayerList from '../components/PlayerList';
import PlayerCreate from '../components/PlayerCreate';
import * as PlayerActions from '../actions/PlayerActions';
import {
  Button,
  Fab,
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarMenuIcon,
  ToolbarTitle,
  ToolbarIcon,
  Theme
} from 'rmwc';

class Players extends Component {

  constructor (props) {
    super(props);
    this.destroy$ = new Rx.Subject();
  }
  componentDidMount() {
    if (this.props.dispatch)
      this.props.dispatch(PlayerActions.fetchPlayers({game_id: this.props.selectedGame}));
    Rx.Observable
      .interval(1000 * 10)
      .takeUntil(this.destroy$)
      .subscribe(() => {
        if (this.props.dispatch) {
         this.props.dispatch(PlayerActions.fetchPlayers({game_id: this.props.selectedGame}));
       } else {
         console.warn('we dont have dispatch');
       }
      });
  }
  componentWillUnmount() {
    this.destroy$.next(null);
  }

  createPlayer(values) {
    values.organization = this.props.selectedOrganization;
    values.game = this.props.selectedGame;
    this.props.dispatch(PlayerActions.saveNewPlayer(values));
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
        onClick={() => {dispatch(PlayerActions.createNewPlayer())}}
      >New</Button>
      </ToolbarSection>
    )
  }
  renderToolbar(title, includeActionButtons) {
    const {dispatch} = this.props;
    let actionButtons;
    if (includeActionButtons)
      actionButtons = this.renderToolbarActionButtons()
    return (
      <Toolbar class="toolbar-content" style={{ backgroundColor: '#fff' }} theme={['primary', 'text-secondary-on-background']}>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarTitle>{title}</ToolbarTitle>
          </ToolbarSection>
          {actionButtons}
        </ToolbarRow>
      </Toolbar>
    )
  }
  renderPlayerList() {
    const {players, dispatch} = this.props;
    return (
      <PlayerList
        players={players}
      />
    )
  }

  renderCreateNewPlayer() {
    const {players, dispatch} = this.props;
    return (
      <PlayerCreate
        onCreate={(values) => this.createPlayer(values)}
        onCancel={() => {dispatch(PlayerActions.cancelCreateNewPlayer())}}
      />
    )
  }

  render () {
    const {players, creating, dispatch} = this.props;
    let toolbar, content;
    if (!creating) {
      toolbar = this.renderToolbar("View and Manage your Players", true);
      content = this.renderPlayerList();
    } else {
      toolbar = this.renderToolbar("Create Your Player");
      content = this.renderCreateNewPlayer();
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
    players: state.player.players || [],
    selectedGame: state.game.selected,
    selectedOrganization: state.organization.selected,
    creating: state.player.creating,
  };
};



export default connect(mapStateToProps)(Players);
