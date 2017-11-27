import React from 'react';

const PlayerList = ({players}) => {
    return(
      <div>
      {players.map((player)=> <div>{player.username}</div>)
      }
      </div>
    );
};

export default PlayerList;
