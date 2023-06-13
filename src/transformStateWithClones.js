'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCondition = [];
  let currentState = { ...state };

  for (const currentAction of actions) {
    const { type, extraData, keysToRemove } = currentAction;

    switch (type) {
      case 'addProperties':
        Object.assign(currentState, extraData);
        stateCondition.push({ ...currentState });
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete currentState[key];
        }
        stateCondition.push({ ...currentState });
        break;

      case 'clear':
        currentState = {};
        stateCondition.push({ ...currentState });
        break;

      default:
        throw new Error('Wrong typфe of action!');
    }
  }

  return stateCondition;
}
module.exports = transformStateWithClones;
