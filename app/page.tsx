'use client'

import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { getUrlWithConfig } from 'wolfy-module-kit'
import { ConfigForm } from '@/components/ConfigForm/ConfigForm'
import configSchema, { type ModuleConfig, DEFAULT_CONFIG } from "@/system/configuration"
import { FORM_FIELDS } from "@/components/ConfigForm/formFields"


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
