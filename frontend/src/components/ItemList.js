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
            <GridTilePrimaryContent>
              <img
                style={{
                  height: "80%"
                }}
                src="https://material-ui.com/static/logo.png"/>
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

class ItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevation: 0
    }
  }
  render() {
    const {item, onSelected} = this.props
    return (
      <Elevation
      	z={this.state.elevation || 0}
      	transition
      	onMouseOver={() => this.setState({elevation: 24})}
      	onMouseOut={() => this.setState({elevation: 0})}
      >
        <GridTile onClick={() => {onSelected(item._id)}}>
        <GridTilePrimary style={{
          backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
          height: '12.313rem',
        }}>
            <GridTilePrimaryContent >
            </GridTilePrimaryContent>
          </GridTilePrimary>
          <GridTileSecondary>
            <GridTileTitle large><p>{item.name}</p></GridTileTitle>
          </GridTileSecondary>

        </GridTile>
      </Elevation>
    )
  }
}
const ItemList = ({items, onSelected, onCreateNew}) => {
    return(
      <GridList>
          <CreateNewCard onCreateNew={onCreateNew}/>
        {
          items.map((item) =>
            <ItemCard item={item} onSelected={onSelected} key={item._id}/>
          )
        }

      </GridList>
    );
};

export default ItemList;
