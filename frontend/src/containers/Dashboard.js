import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as Rx from 'rxjs';
import PlayerInfo from '../components/PlayerInfo';
import PlayerList from '../components/PlayerList';
import PlayerCreate from '../components/PlayerCreate';
import RequestTimesChart from '../components/charts/RequestTimesChart';
import ChartCard from '../components/ChartCard';
import SingleStat from '../components/charts/SingleStat';
import HoverElevation from '../components/HoverElevation';
import * as DashboardActions from '../actions/DashboardActions';
import {
  Button,
  Fab,
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

class Dashboard extends Component {

  constructor (props) {
    super(props);

  }
  componentDidMount() {

  }

  componentWillUnmount() {

  }

  getInterval$(refreshRate) {
    if (this.refreshRate == refreshRate) {
      return this.widgetInterval$
    }
    if (this.destroy$)
      this.destroy$.next(null);
    this.destroy$ = new Rx.Subject();
    this.refreshRate = refreshRate
    this.widgetInterval$ = Rx.Observable
      .interval(1000 * this.refreshRate)
      .takeUntil(this.destroy$);
    return this.widgetInterval$
  }

  renderToolbarActionButtons() {
    const {dispatch} = this.props;
    return (
      <ToolbarSection alignStart>
      </ToolbarSection>
    )
  }
  renderToolbar(title, includeActionButtons) {
    const {dispatch} = this.props;
    let actionButtons;
    if (includeActionButtons)
      actionButtons = this.renderToolbarActionButtons()
    return (
      <Toolbar className="toolbar-content" style={{ backgroundColor: '#fff' }} theme={['primary', 'text-secondary-on-background']}>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarTitle>{title}</ToolbarTitle>
          </ToolbarSection>
          {actionButtons}
        </ToolbarRow>
      </Toolbar>
    )
  }

  renderWidgets() {
    const {
      players,
      creating,
      dispatch,
      selection,
      selectedGame,
      selectedOrganization
    } = this.props;
    return (
      <Grid>
      <GridCell desktop="4">
      <HoverElevation elevation={10}>
        <SingleStat
          name={"User Logins"}
          measurement={"logins"}
          type={"user"}
          interval$={this.getInterval$(1)}
          value={0}
          game={selectedGame}
          organization={selectedOrganization}/>
      </HoverElevation>
      </GridCell>
      <GridCell desktop="4">
        <HoverElevation elevation={10}>
          <RequestTimesChart/>
        </HoverElevation>
      </GridCell>
      <GridCell desktop="4">
      <HoverElevation elevation={10}>
        <RequestTimesChart/>
      </HoverElevation>
      </GridCell>
      <GridCell desktop="4">
      <HoverElevation elevation={10}>
        <RequestTimesChart/>
      </HoverElevation>
      </GridCell>
      </Grid>
    )
  }
  render () {
    const {
      players,
      creating,
      dispatch,
      selection,
      selectedGame,
      selectedOrganization
    } = this.props;
    let toolbar, content;
    console.log('Player Props', this.props)
    toolbar = this.renderToolbar("Dashboard");
    content = this.renderWidgets();
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
    selection: state.player.selection,
  };
};



export default connect(mapStateToProps)(Dashboard);
