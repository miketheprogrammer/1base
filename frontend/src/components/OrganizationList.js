import React from 'react';
import {NavLink} from 'react-router-dom'
import { Ripple,
         Card,
         CardMedia,
         CardPrimary,
         CardTitle,
         CardSubtitle,
         CardSupportingText,
         CardActions,
         CardAction,
         Grid,
         GridCell,
       } from 'rmwc';
const OrganizationList = ({organizations, onSelected}) => {
    const renderCard = (organization, onSelected) => {
      return (
        <Card onClick={() => {onSelected(organization._id)}}>
        	<CardMedia style={{
        		backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
        		height: '12.313rem',
        	}}>
        	</CardMedia>
        	<CardPrimary>
        		<CardTitle large><p>{organization.name}</p></CardTitle>
        		<CardSubtitle></CardSubtitle>
        	</CardPrimary>
        	<CardSupportingText>
        	</CardSupportingText>
        </Card>
      )
    }
    return(
      <Grid>
      {
        organizations.map((organization) =>
          <GridCell span="3" phone="1" tablet="2" desktop="3" key={organization.name}>{renderCard(organization, onSelected)}</GridCell>
        )
      }
      </Grid>
    );
};

export default OrganizationList;
