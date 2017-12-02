import React from 'react';
import {NavLink} from 'react-router-dom'
import {
  Ripple,
  Elevation,
} from 'rmwc';

class HoverElevation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevation: props.elevation || 0
    }
  }
  render() {
    const {children, elevation} = this.props;

    return (
      <Elevation
      	z={this.state.elevation}
      	transition
        className="hover-tile"
      	onMouseOver={() => this.setState({elevation: 24})}
      	onMouseOut={() => this.setState({elevation: elevation || 0})}
      >
      {children}
      </Elevation>
    )
  }
}

export default HoverElevation;
