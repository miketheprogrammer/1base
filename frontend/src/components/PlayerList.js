import React from 'react';
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
  Grid,
  GridCell,
  Typography,
} from 'rmwc';

const PlayerList = ({players, onPlayerClick}) => {
    const renderCard = (player) => {
      return (
        <Card style={{ width: '21rem' }}>
          <CardPrimaryAction>
            <CardMedia
              sixteenByNine
              style={{
                backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
                height: '12.313rem',
              }}
              onClick={(evt)=> onPlayerClick(player._id)}
            />
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
              <Typography use="headline6" tag="h2">
                {player.username.toLowerCase()}
              </Typography>
              <Typography
                use="subtitle2"
                tag="h3"
                theme="textSecondaryOnBackground"
                style={{ marginTop: '-1rem' }}
              >
                {((player.firstname || '') + ' ' + (player.lastname || '') ).trim() || 'firstname lastname'}
              </Typography>
              <Typography
                use="body1"
                tag="div"
                theme="textSecondaryOnBackground"
              >
                {((player.firstname || '') + ' ' + (player.lastname || '') ).trim() || 'firstname lastname'}
              </Typography>
            </div>
          </CardPrimaryAction>
          <CardActions>
            <CardActionButtons>
              <CardActionButton>Edit</CardActionButton>
            </CardActionButtons>
            <CardActionIcons>
            </CardActionIcons>
          </CardActions>
        </Card>
      )
    }
    return(
      <Grid>
      {
        players.map((player) =>
          <GridCell span="3" phone="1" tablet="2" desktop="3" key={player.username}>{renderCard(player)}</GridCell>
        )
      }
      </Grid>
    );
};

export default PlayerList;
