import React from 'react';
import {NavLink} from 'react-router-dom'
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
        <Card onClick={() => {onCreateNew()}}>
          <CardMedia className="card-fab-center" style={{
            backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
            height: '12.313rem',
          }}>
          <Fab onClick={() => onCreateNew()}>add</Fab>
          </CardMedia>
          <CardPrimary style={{
            height: '6.45rem',
          }}>
            <CardTitle large><p></p></CardTitle>
            <CardSubtitle></CardSubtitle>
          </CardPrimary>
        </Card>
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
        <Card onClick={() => {onSelected(game._id)}}>
          <CardMedia style={{
            backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
            height: '12.313rem',
          }}>
          </CardMedia>
          <CardPrimary>
            <CardTitle large><p>{game.name}</p></CardTitle>
            <CardSubtitle></CardSubtitle>
          </CardPrimary>
          <CardSupportingText>
          </CardSupportingText>
        </Card>
      </Elevation>
    )
  }
}
const GameList = ({games, onSelected, onCreateNew}) => {
    return(
      <Grid>
        <GridCell span="3" phone="2" tablet="2" desktop="3" key={"add-new"}>
          <CreateNewCard onCreateNew={onCreateNew}/>
        </GridCell>
        {
          games.map((game) =>
            <GridCell span="3" phone="1" tablet="2" desktop="3" key={game.name}>
            <GameCard game={game} onSelected={onSelected}/>
            </GridCell>
          )
        }

      </Grid>
    );
};

export default GameList;
