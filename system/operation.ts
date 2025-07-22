import { generateOperationSchema } from 'wolfy-module-kit';
import { z } from 'zod';

const setTitleOperation = z.object({
  type: z.literal('SET_TITLE'),
  value: z.string(),
});

export const moduleOperation = generateOperationSchema(
  setTitleOperation,
  // Add other operations here
);

export type ModuleOperation = z.TypeOf<typeof moduleOperation>;
