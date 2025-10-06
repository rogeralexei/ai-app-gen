"use client"

import { useState } from "react"
import { PromptScreen } from "@/components/prompt-screen"
import { MockupEditor } from "@/components/mockup-editor"
import { ValidationReport } from "@/components/validation-report"
import { Sparkles, Database, Code2, CheckCircle2 } from "lucide-react"

export type FieldDefinition = {
  id: string
  name: string
  label: string
  type: "string" | "number" | "boolean" | "date" | "email" | "text"
  required: boolean
  defaultValue?: string
}

export type SchemaDefinition = {
  entityName: string
  fields: FieldDefinition[]
  operations: {
    create: boolean
    read: boolean
    update: boolean
    delete: boolean
  }
}

export type ValidationResult = {
  success: boolean
  errors: string[]
  warnings: string[]
  generatedFiles: {
    sql: string
    orm: string
    api: string
    frontend: string
  }
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<"prompt" | "mockup" | "report">("prompt")
  const [schema, setSchema] = useState<SchemaDefinition | null>(null)
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handlePromptSubmit = async (prompt: string, params: any) => {
    setIsGenerating(true)

    // Simulate AI agent generating schema
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock schema generation based on prompt
    const mockSchema: SchemaDefinition = {
      entityName: params.entityName || "Book",
      fields: [
        { id: "1", name: "id", label: "ID", type: "number", required: true },
        { id: "2", name: "title", label: "Title", type: "string", required: true },
        { id: "3", name: "author", label: "Author", type: "string", required: true },
        { id: "4", name: "publication_year", label: "Publication Year", type: "number", required: false },
        { id: "5", name: "stock", label: "Stock", type: "number", required: false, defaultValue: "0" },
      ],
      operations: {
        create: params.operations?.includes("create") ?? true,
        read: params.operations?.includes("read") ?? true,
        update: params.operations?.includes("update") ?? true,
        delete: params.operations?.includes("delete") ?? true,
      },
    }

    setSchema(mockSchema)
    setIsGenerating(false)
    setCurrentStep("mockup")
  }

  const handleSchemaUpdate = (updatedSchema: SchemaDefinition) => {
    setSchema(updatedSchema)
  }

  const handleRegenerate = async (feedback: string) => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsGenerating(false)
  }

  const handleConfirm = async () => {
    setIsGenerating(true)

    // Simulate orchestration endpoint call
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const mockValidation: ValidationResult = {
      success: true,
      errors: [],
      warnings: ['Consider adding an index on the "author" field for better query performance'],
      generatedFiles: {
        sql: "backend/sql/schema.sql",
        orm: "backend/models.py",
        api: "backend/app.py",
        frontend: "frontend/src/components/BookList.jsx",
      },
    }

    setValidationResult(mockValidation)
    setIsGenerating(false)
    setCurrentStep("report")
  }

  const handleStartOver = () => {
    setCurrentStep("prompt")
    setSchema(null)
    setValidationResult(null)
  }

  const steps = [
    { id: "prompt", label: "Prompt", icon: Sparkles, active: currentStep === "prompt" },
    { id: "mockup", label: "Schema", icon: Database, active: currentStep === "mockup" },
    { id: "report", label: "Generate", icon: CheckCircle2, active: currentStep === "report" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AI App Generator</h1>
                <p className="text-xs text-muted-foreground">Multi-Agent Database Application Builder</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="hidden md:flex items-center gap-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      step.active ? "bg-primary/10 border border-primary/30 text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <step.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && <div className="w-8 h-px bg-border mx-1" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentStep === "prompt" && <PromptScreen onSubmit={handlePromptSubmit} isGenerating={isGenerating} />}

        {currentStep === "mockup" && schema && (
          <MockupEditor
            schema={schema}
            onUpdate={handleSchemaUpdate}
            onRegenerate={handleRegenerate}
            onConfirm={handleConfirm}
            isGenerating={isGenerating}
          />
        )}

        {currentStep === "report" && validationResult && (
          <ValidationReport result={validationResult} onStartOver={handleStartOver} />
        )}
      </main>
    </div>
  )
}
