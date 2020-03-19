import { createSelector } from 'reselect'

export const selectPlayerState = (state) => state.player
export const selectPlayerCreateActive = createSelector(
  selectPlayerState,
  (state) => state.creating,
)
export const selectPlayers = createSelector(
  selectPlayerState,
  (state) => state.players,
);

export const selectSelectedPlayerId = createSelector(
  selectPlayerState,
  (state) => state.selection,
)

export const selectPlayerSearchFilter = createSelector(
  selectPlayerState,
  (state) => state.searchFilter,
)
