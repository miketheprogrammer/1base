import React from 'react';
import {NavLink} from 'react-router-dom'
import {
  Elevation,
  GridList,
  GridTile,
  GridTilePrimary,
  GridTilePrimaryContent,
  GridTileSecondary,
  GridTileTitle,
  Fab,
} from 'rmwc';

class CreateNewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevation: 0
    }
  }
  render() {
    const {onCreateNew} = this.props;

    return (
      <Elevation
      	z={this.state.elevation || 0}
      	transition
      	onMouseOver={() => this.setState({elevation: 24})}
      	onMouseOut={() => this.setState({elevation: 0})}
      >
        <GridTile onClick={() => {onCreateNew()}}>
          <GridTilePrimary className="card-fab-center" style={{
            // backgroundImage: 'url(https://material-ui.com/static/logo.png)',
            height: '12.313rem',
          }}>
            <GridTilePrimaryContent
              style={{
                height: "80%"
              }}
              src="https://material-ui.com/static/logo.png"
              >
            </GridTilePrimaryContent>
          </GridTilePrimary>
          <GridTileSecondary style={{
            // height: '6.45rem',

          }}>
            <GridTileTitle><p>Add New</p></GridTileTitle>

          </GridTileSecondary>
        </GridTile>
      </Elevation>
    )
  }
}

class GameCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevation: 0
    }
  }
  render() {
    const {game, onSelected} = this.props
    return (
      <Elevation
      	z={this.state.elevation || 0}
      	transition
      	onMouseOver={() => this.setState({elevation: 24})}
      	onMouseOut={() => this.setState({elevation: 0})}
      >
        <GridTile onClick={() => {onSelected(game._id)}}>
        <GridTilePrimary style={{
          backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
          height: '12.313rem',
        }}>
            <GridTilePrimaryContent >
            </GridTilePrimaryContent>
          </GridTilePrimary>
          <GridTileSecondary>
            <GridTileTitle large><p>{game.name}</p></GridTileTitle>
          </GridTileSecondary>

        </GridTile>
      </Elevation>
    )
  }
}
const GameList = ({games, onSelected, onCreateNew}) => {
    return(
      <GridList>
          <CreateNewCard onCreateNew={onCreateNew}/>
        {
          games.map((game) =>
            <GameCard game={game} onSelected={onSelected}/>
          )
        }

      </GridList>
    );
};

export default GameList;
