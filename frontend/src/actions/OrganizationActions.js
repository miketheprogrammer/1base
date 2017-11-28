import { FETCH_ORGANIZATIONS, ORGANIZATIONS_FETCHED, SELECT_ORGANIZATION, ORGANIZATION_SELECTED } from '../constants/ActionTypes';

export function fetchOrganizations(payload) {
    return {
        type: FETCH_ORGANIZATIONS,
        payload
    };
}

export function organizationsFetched(payload) {
    return {
        type: ORGANIZATIONS_FETCHED,
        payload
    };
}

export function selectOrganization(payload) {
  return {
    type: SELECT_ORGANIZATION,
    payload
  };
}

export function organizationSelected() {
  return {
    type: ORGANIZATION_SELECTED
  };
}
