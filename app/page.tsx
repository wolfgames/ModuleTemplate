'use client'

import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { getUrlWithConfig, ModuleReplayAbility, ModuleIntegrationType, ModuleResultType } from '@wolfgames/module-kit'
import { ConfigForm, type FormFieldConfig } from '@/components/ConfigForm'
import configSchema, { type ModuleConfig, DEFAULT_CONFIG } from "@/system/configuration"
import { AppActionsSchema } from "@/system/actions"

export const FORM_FIELDS: FormFieldConfig[] = [
  {
    key: "resultAction",
    label: "Module Result Action",
    type: "select",
    options: [AppActionsSchema.enum.Done, AppActionsSchema.enum.CustomAction],
    required: true,
  },
  {
    key: 'replayAbility',
    label: 'Replay Ability',
    type: 'select',
    options: Object.values(ModuleReplayAbility) as string[],
    required: true,
  },
  {
    key: 'expectedResultType',
    label: 'Expected Result Type',
    type: 'select',
    options: Object.values(ModuleResultType) as string[],
    required: true,
  },
  {
    key: 'integrationType',
    label: 'Integration Type',
    type: 'select',
    options: Object.values(ModuleIntegrationType) as string[],
    required: true,
  },
]

export default () => {
  const router = useRouter()
  const handleFormSubmit = useCallback((config: ModuleConfig, configString: string, signature: string = '') => {

    // Use modular URL utilities
    const url = getUrlWithConfig(configString, signature)

    // Trigger re-processing by reloading
    router.push('/game/?' + url.toString())
  }, [])

  return (
    <main className="min-h-screen bg-gray-100">
      <ConfigForm<ModuleConfig>
        title="Configure Module"
        description="No URL parameters found. Please configure your module settings below."
        fields={FORM_FIELDS}
        defaultValues={DEFAULT_CONFIG}
        schema={configSchema}
        onSubmit={handleFormSubmit}
        submitButtonText="Create Module"
        footerText="Powered by Zod + Module Kit 📦: This form uses Zod schema validation through the module-kit package for type-safe configuration validation."
      />
    </main>
  );
}
