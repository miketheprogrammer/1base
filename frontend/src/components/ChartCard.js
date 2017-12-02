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
  GridList,
  GridTile,
  GridTilePrimary,
  GridTilePrimaryContent,
  GridTileSecondary,
  GridTileTitle,
  Fab,
} from 'rmwc';

class ChartCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevation: props.elevation || 0
    }
  }
  // render() {
  //   const {children} = this.props;
  //
  //   return (
  //     <Elevation
  //       z={this.state.elevation || 0}
  //       transition
  //       onMouseOver={() => this.setState({elevation: 24})}
  //       onMouseOut={() => this.setState({elevation: 0})}
  //     >
  //       <GridTile>
  //         <GridTilePrimary>
  //           <GridTilePrimaryContent>
  //           {children}
  //           </GridTilePrimaryContent>
  //         </GridTilePrimary>
  //         <GridTileSecondary>
  //           <GridTileTitle></GridTileTitle>
  //         </GridTileSecondary>
  //       </GridTile>
  //     </Elevation>
  //   )
  // }
  render() {
    const {children, elevation} = this.props;

    return (
      <Elevation
      	z={this.state.elevation}
      	transition
      	onMouseOver={() => this.setState({elevation: 24})}
      	onMouseOut={() => this.setState({elevation: elevation || 0})}
      >
        <Card>
          <CardMedia>
          {children}
          </CardMedia>
          <CardPrimary>
            <CardTitle large>Response Times</CardTitle>
            <CardSubtitle></CardSubtitle>
          </CardPrimary>
          <CardSupportingText>
          </CardSupportingText>
          <CardActions>
            <CardAction>Edit</CardAction>
          </CardActions>
        </Card>
      </Elevation>
    )
  }
}

export default ChartCard;
