import React from 'react';
import {NavLink} from 'react-router-dom'
import {
  Card,
  CardMedia,
  CardPrimaryAction,
  CardTitle,
  CardSupportingText,
  CardActions,
  CardActionButton,
  CardActionButtons,
  CardActionIcon,
  CardActionIcons,
  CardAction,
  Elevation,
  Grid,
  GridCell,
  Typography,
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
        <Card style={{ width: '21rem' }}>
          <CardPrimaryAction>
            <CardMedia
              sixteenByNine
              style={{
                backgroundImage: 'url(images/backgrounds/mb-bg-fb-16.png)'
              }}
            />
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
              <Typography use="headline6" tag="h2">
                Response Times
              </Typography>
              <Typography
                use="subtitle2"
                tag="h3"
                theme="textSecondaryOnBackground"
                style={{ marginTop: '-1rem' }}
              >
                blah
              </Typography>
              <Typography
                use="body1"
                tag="div"
                theme="textSecondaryOnBackground"
              >
                blooh
              </Typography>
            </div>
          </CardPrimaryAction>
          <CardActions>
            <CardActionButtons>
            </CardActionButtons>
            <CardActionIcons>
              <CardActionIcon onIcon="favorite" icon="favorite_border" />
            </CardActionIcons>
          </CardActions>
        </Card>
      </Elevation>
    )
  }
}

export default ChartCard;
