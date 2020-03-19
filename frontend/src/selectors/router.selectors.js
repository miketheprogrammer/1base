import { createSelector } from 'reselect'
import { createMatchSelector } from 'connected-react-router';

export const selectOrganizationIdParameter = createSelector(
    createMatchSelector({ path: '/organization/:orgId', }),
    (match) => match ? match.params.orgId : undefined,
);

export const selectGameIdParameter = createSelector(
    createMatchSelector({ path: '/organization/:orgId/game/:gameId', }),
    (match) => match ? match.params.gameId : undefined,
);

export const selectPlayerIdParameter = createSelector(
    createMatchSelector({ path: '/organization/:orgId/game/:gameId/player/:playerId', }),
    (match) => match ? match.params.playerId : undefined,
);