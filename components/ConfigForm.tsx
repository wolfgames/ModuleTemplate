"use client"

import { encodeConfig, validateSchema } from '@wolfgames/module-kit'
import { ModuleConfig } from "@/system/configuration"
import { useState } from "react"
import { z } from "zod"

/**
 * Generic field configuration for form rendering
 */
export interface FormFieldConfig {
  key: string
  label: string
  type: "text" | "number" | "select" | "radio"
  placeholder?: string
  min?: number
  max?: number
  maxLength?: number
  options?: readonly string[]
  required?: boolean
}

/**
 * Props for the generic ConfigForm component
 */
interface ConfigFormProps<T> {
  title: string
  description: string
  fields: FormFieldConfig[]
  defaultValues: Record<string, any>
  schema: z.ZodSchema<T>
  onSubmit: (config: T, configString: string, signature: string) => void
  onValidationError?: (errors: Record<string, string>) => void
  submitButtonText?: string
  footerText?: string
}


/**
 * Generic ConfigForm: Renders a form based on field configuration
 * Completely reusable - no hardcoded logic or imports
 */
export function ConfigForm<T>({
  title,
  description,
  fields,
  defaultValues,
  schema,
  onSubmit,
  onValidationError,
  submitButtonText = "Create Configuration",
  footerText,
}: ConfigFormProps<T>) {
  const [formData, setFormData] = useState<Record<string, any>>(defaultValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Use the validation function passed as prop
      const result = validateSchema(formData, schema)

      if (!result.success) {
        const errors = result.errors as Record<string, string>
        setErrors(errors)
        if (onValidationError) {
          onValidationError(errors)
        }
        return
      }

      // Clear errors
      setErrors({})

      // Use utility functions passed as props
      const configString = encodeConfig(result.data)

      console.log("Submitting config:", result.data)

      onSubmit(result.data as T, configString, '')
    } catch (error) {
      console.error("Form submission error:", error)
      setErrors({ _form: "An unexpected error occurred" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    // Clear field error when user starts typing
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[key]
        return newErrors
      })
    }
  }

  const renderField = (field: FormFieldConfig) => {
    const value = formData[field.key] ?? ""
    const hasError = !!errors[field.key]

    const baseInputStyle = {
      width: "100%",
      padding: "12px",
      border: hasError ? "2px solid #d32f2f" : "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      boxSizing: "border-box" as const,
    }

    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            id={field.key}
            value={value}
            onChange={(e) => updateFormData(field.key, e.target.value)}
            style={baseInputStyle}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            required={field.required}
          />
        )

      case "number":
        return (
          <input
            type="number"
            id={field.key}
            min={field.min}
            max={field.max}
            value={value}
            onChange={(e) => updateFormData(field.key, Number.parseInt(e.target.value) || field.min || 0)}
            style={baseInputStyle}
            required={field.required}
          />
        )

      case "select":
        return (
          <select
            id={field.key}
            value={value}
            onChange={(e) => updateFormData(field.key, e.target.value)}
            style={baseInputStyle}
            required={field.required}
          >
            {!field.required && <option value="">-- Select --</option>}
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        )

      case "radio":
        return (
          <div style={{ display: "flex", gap: "15px" }}>
            {field.options?.map((option) => (
              <label key={option} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <input
                  type="radio"
                  name={field.key}
                  value={option}
                  checked={value === option}
                  onChange={(e) => updateFormData(field.key, e.target.value)}
                  style={{ marginRight: "5px" }}
                  required={field.required}
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            ))}
          </div>
        )

      default:
        return <div>Unsupported field type: {field.type}</div>
    }
  }

  const handleGenerateDefault = async () => {
    try {
      // Use the validation function passed as prop with default values
      const result = validateSchema(defaultValues, schema)

      if (!result.success) {
        const errors = result.errors as Record<string, string>
        console.log({errors})
        setErrors(errors)
        if (onValidationError) {
          onValidationError(errors)
        }
        return
      }

      // Clear errors
      setErrors({})

      // Use utility functions passed as props
      const configString = encodeConfig(result.data)
      // const signature = generateMockSignature()

      // Show success message briefly
      setIsSubmitting(true)

      // Call onSubmit with the default config
      onSubmit(result.data as T, configString, '')
    } catch (error) {
      console.error("Default config generation error:", error)
      setErrors({ _form: "Failed to generate default configuration" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "40px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>{title}</h2>
      <p style={{ textAlign: "center", marginBottom: "30px", color: "#666", fontSize: "14px" }}>{description}</p>

      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.key} style={{ marginBottom: "20px" }}>
            <label
              htmlFor={field.key}
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {field.label}
              {field.required && <span style={{ color: "#d32f2f" }}> *</span>}
            </label>

            {renderField(field)}

            {errors[field.key] && (
              <div style={{ color: "#d32f2f", fontSize: "12px", marginTop: "5px" }}>{errors[field.key]}</div>
            )}
          </div>
        ))}

        {/* Form-level error */}
        {errors._form && (
          <div
            style={{
              color: "#d32f2f",
              fontSize: "14px",
              marginBottom: "20px",
              padding: "10px",
              backgroundColor: "#ffebee",
              border: "1px solid #f8bbd9",
              borderRadius: "4px",
            }}
          >
            {errors._form}
          </div>
        )}


        {/* Generate Default Config Button */}
        <button
          type="button"
          onClick={() => handleGenerateDefault()}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#17a2b8",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.2s",
            marginBottom: "15px",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#138496"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#17a2b8"
          }}
        >
          🎯 Generate Default Config
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: isSubmitting ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundColor = "#0056b3"
            }
          }}
          onMouseOut={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundColor = "#007bff"
            }
          }}
        >
          {isSubmitting ? "Processing..." : submitButtonText}
        </button>
      </form>

      {/* Footer */}
      {footerText && (
        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            backgroundColor: "#e3f2fd",
            borderRadius: "4px",
            fontSize: "12px",
            color: "#1976d2",
          }}
        >
          {footerText}
        </div>
      )}
    </div>
  )
}
