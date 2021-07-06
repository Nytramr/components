import { createStore } from 'flux-condenser';
import { Actions } from './actions';

const storeName = Symbol('store6');
const initialValue = { events: [] };

const printEvent = function (state, payload) {
  return {
    count: state.count + 1,
  };
};

const condensers = [[Actions.PRINT_EVENT, printEvent]];

export const store = createStore(storeName, initialValue, condensers);
