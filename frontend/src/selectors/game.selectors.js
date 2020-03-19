import { createSelector } from 'reselect'

export const selectGameState = (state) => state.game
export const selectGameCreateActive = createSelector(
  selectGameState,
  (state) => state.creating,
)
export const selectGames = createSelector(
  selectGameState,
  (state) => state.games,
);

export const selectSelectedGameId = createSelector(
  selectGameState,
  (state) => state.selected,
)
