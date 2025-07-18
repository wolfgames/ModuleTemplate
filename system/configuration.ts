import { z } from "zod"
import { baseConfig, BaseActions, ModuleReplayAbility, ModuleResultType, ModuleIntegrationType } from '@wolfgames/module-kit';
import { AppActionsSchema } from "./actions";

// region Generated
const moduleConfiguration = z.object({
  resultAction: AppActionsSchema,
});

/**
 * Form state interface for configuration form
 */
export interface ConfigFormData extends ModuleConfig {
  resultAction: BaseActions.Done;
}

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: ConfigFormData = {
  replayAbility: ModuleReplayAbility.Once,
  expectedResultType: ModuleResultType.Attempt,
  integrationType: ModuleIntegrationType.Standalone,
  resultAction: BaseActions.Done
}
// endregion Generated

const fullConfig = baseConfig.merge(moduleConfiguration);
export default fullConfig;

export type ModuleConfig = z.infer<typeof fullConfig>;

export const conditionalConfig = fullConfig.partial();
export type ConditionalConfigType = z.infer<typeof conditionalConfig>;
