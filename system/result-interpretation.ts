import type { ModuleConfig } from "./configuration"
import type { AppActions } from './actions'
import { ModuleResultType, ModuleResult, BaseActions } from '@wolfgames/module-kit'

// region Frozen
// Result data to be sent to the parent
// includes the data value, result type, & an array of action UIDs
export interface CustomModuleResult {
  data?: any,
  actions: string[],
  type: ModuleResultType
}
// endregion Frozen

/**
 * Result interpretation function
 * Processes the module result and determines what actions should be taken
 */
export function interpretResult(
  config: ModuleConfig,
  actions: Record<string, any>,
  resultData: any,
): ModuleResult {
  // region Frozen

  // Default action is "done"
  // This will change based on how the module wants to handle its result
  let actionToTrigger = BaseActions.Done

  // endregion Frozen

  // Example: 
  // if (config.expectedResultType === ModuleResultType.Attempt) {
  //   actionToTrigger = BaseActions.AnotherAction
  // }

  // region Frozen

  const actionUid = actions?.[actionToTrigger];

  if (!actionUid) {
    throw new Error(`Action key "${actionToTrigger}" not found in config.actions map.`)
  }

  return {
    type: config.expectedResultType,
    data: resultData,
    actions: [actionUid]
  };

  // endregion Frozen
};
