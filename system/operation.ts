import { generateOperationSchema } from 'wolfy-module-kit';
import { z } from 'zod';

export enum ModuleOperationType {
  SET_TITLE = 'SET_TITLE',
  // Add other operation types here as needed
}

const setTitleOperation = z.object({
  type: z.literal(ModuleOperationType.SET_TITLE),
  value: z.string(),
});

export const moduleOperation = generateOperationSchema(
  setTitleOperation,
  // Add other operations here
);

export type ModuleOperation = z.TypeOf<typeof moduleOperation>;
