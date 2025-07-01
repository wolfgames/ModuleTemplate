import { z } from "zod"
import { baseConfig } from "module-kit";

// region Generated

const moduleConfiguration = z.object({
  resultAction: z.enum(["continue", "stop", "restart", "reset"]),
});

/**
 * Form state interface for configuration form
 */
export interface ConfigFormData {
  resultAction: "continue" | "stop" | "restart" | "reset";
}

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: ConfigFormData = {
  resultAction: "continue"
}
// endregion Generated

const fullConfig = moduleConfiguration.and(baseConfig);
export default fullConfig;

export type ModuleConfig = z.TypeOf<typeof fullConfig>;
