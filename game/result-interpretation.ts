import type { ModuleConfig } from "./configuration"
import { ModuleResultType } from 'module-kit'

/**
 * Base module result structure
 */
export interface BaseModuleResult {
  type: ModuleResultType
  data?: any
}

/**
 * Result interpretation function
 * Processes the module result and determines what actions should be taken
 */
export function interpretResult(
  config: ModuleConfig,
  result: BaseModuleResult,
): Array<string> {
  if (result.type === ModuleResultType.Attempt) {
    if (result.data === 1) {
      // If the attempt was successful, we continue 
      return [config.resultAction];
    }
  } else if (result.type === ModuleResultType.Choice) {
    return [config.resultAction];
  }

  throw new Error(`Unexpected result type ${result.type}. Valid module execution result types: ["${Object.values(ModuleResultType).join('","')}"]`);
};
