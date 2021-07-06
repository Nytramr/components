import { createActionDispatcher } from 'flux-condenser';

export const Actions = {
  PRINT_EVENT: 'PRINT_EVENT',
};

export const printEventActionDispatcher = createActionDispatcher(Actions.PRINT_EVENT, (eventName, eventData) => {
  return {
    eventName,
    eventData,
  };
});
