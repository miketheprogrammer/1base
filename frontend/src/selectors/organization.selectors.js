import { createSelector } from 'reselect'

export const selectOrgState = (state) => state.organization
export const selectOrganizationCreateActive = createSelector(
  selectOrgState,
  (state) => state.creating,
)
export const selectOrganizations = createSelector(
  selectOrgState,
  (state) => state.organizations,
);

export const selectSelectedOrganizationId = createSelector(
  selectOrgState,
  (state) => state.selected,
)
