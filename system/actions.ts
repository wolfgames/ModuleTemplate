import { z } from 'zod';
import { BaseActions, type BaseActionsType } from '@wolfgames/module-kit';

enum CustomActions {
  // add custom module actions here
  CustomAction = 'custom-action'
}

// region Frozen
export const AppActionsSchema = z.nativeEnum({
  ...BaseActions,
  ...CustomActions,
} as const);

export type AppActions = z.TypeOf<typeof AppActionsSchema>;
// endregion Frozen