import { createSelector } from 'reselect'

export const selectUserState = (state) => state.player
export const selectUserAuthenticating = createSelector(
  selectUserState,
  (state) => {
      console.log('wtf is the state now');
      return state.authenticating
  }
)
export const selectUserAuthenticated = createSelector(
  selectUserState,
  (state) => state.authenticated,
);
