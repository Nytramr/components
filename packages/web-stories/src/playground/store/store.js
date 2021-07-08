import { createStore } from 'flux-condenser';
import { Actions } from './actions';

const storeName = Symbol('store6');
const initialValue = { events: [] };

const printEvent = function (state, payload) {
  return {
    ...state,
    events: [payload, ...state.events],
  };
};

const condensers = [[Actions.PRINT_EVENT, printEvent]];

export const store = createStore(storeName, initialValue, condensers);
