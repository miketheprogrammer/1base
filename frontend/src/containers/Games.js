import Rx from 'rxjs';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameList from '../components/GameList';
import * as GameActions from '../actions/GameActions';
import './CounterApp.css';
import logo from '../logo.svg';

class CounterApp extends Component {
  constructor(props){
    super(props);
    this.setState({});
    this.destroy$ = new Rx.Subject();
  }
  componentDidMount() {
    if (this.props.dispatch)
      this.props.dispatch(GameActions.fetchGames({organization_id: this.props.organization_id}));
    Rx.Observable
      .interval(1000)
      .takeUntil(this.destroy$)
      .subscribe(() => {
        if (this.props.dispatch) {
         this.props.dispatch(GameActions.fetchGames({organization_id: this.props.organization_id}));
       } else {
         console.warn('we dont have dispatch');
       }
      });
  }
  componentWillUnmount() {
    this.destroy$.next(null);
  }
  render() {
    const { games, dispatch } = this.props;
    return (
      <div style={{float: 'left'}}>
        <GameList
          games={games}
          onSelected={(_id) => {
            dispatch(GameActions.selectGame({_id}))
          }}/>
      </div>
    )

  }

}
export default connect(state => ({
  games: state.game.games || [],
  organization_id: state.organization.selected
}))(CounterApp);
