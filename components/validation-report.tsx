"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, AlertTriangle, XCircle, FileCode2, Download, RotateCcw } from "lucide-react"
import type { ValidationResult } from "@/app/page"

type ValidationReportProps = {
  result: ValidationResult
  onStartOver: () => void
}

export function ValidationReport({ result, onStartOver }: ValidationReportProps) {
  const fileIcons: Record<string, string> = {
    sql: "🗄️",
    orm: "🔷",
    api: "🚀",
    frontend: "⚛️",
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Status Header */}
      <div className="text-center space-y-4 py-8">
        <div
          className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
            result.success
              ? "bg-accent/10 border-2 border-accent/30"
              : "bg-destructive/10 border-2 border-destructive/30"
          }`}
        >
          {result.success ? (
            <CheckCircle2 className="w-10 h-10 text-accent" />
          ) : (
            <XCircle className="w-10 h-10 text-destructive" />
          )}
        </div>
        <h2 className="text-4xl font-bold text-foreground">
          {result.success ? "Generation Complete!" : "Generation Failed"}
        </h2>
        <p className="text-lg text-muted-foreground">
          {result.success ? "Your application has been successfully generated" : "There were errors during generation"}
        </p>
      </div>

      {/* Errors */}
      {result.errors.length > 0 && (
        <Card className="p-6 bg-destructive/5 border-destructive/30">
          <div className="flex items-start gap-3">
            <XCircle className="w-5 h-5 text-destructive mt-0.5" />
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-destructive">Errors</h3>
              <ul className="space-y-1">
                {result.errors.map((error, index) => (
                  <li key={index} className="text-sm text-destructive/90">
                    • {error}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <Card className="p-6 bg-yellow-500/5 border-yellow-500/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-yellow-500">Warnings</h3>
              <ul className="space-y-1">
                {result.warnings.map((warning, index) => (
                  <li key={index} className="text-sm text-yellow-500/90">
                    • {warning}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Generated Files */}
      {result.success && (
        <Card className="p-6 bg-card border-border space-y-4">
          <div className="flex items-center gap-3">
            <FileCode2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Generated Files</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {Object.entries(result.generatedFiles).map(([type, path]) => (
              <div
                key={type}
                className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 transition-colors group"
              >
                <span className="text-2xl">{fileIcons[type]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground capitalize">{type}</p>
                  <p className="text-xs text-muted-foreground font-mono truncate">{path}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Code Preview */}
      {result.success && (
        <Card className="p-6 bg-card border-border space-y-4">
          <h3 className="text-lg font-semibold text-foreground">SQL Schema Preview</h3>
          <div className="rounded-lg bg-background border border-border p-4 overflow-x-auto">
            <pre className="text-sm font-mono text-foreground">
              <code>{`CREATE TABLE books (
    id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publication_year INT,
    stock INT DEFAULT 0,
    PRIMARY KEY (id)
);`}</code>
            </pre>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex items-center justify-center gap-3 pt-4">
        {result.success && (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Download Project
          </Button>
        )}
        <Button
          onClick={onStartOver}
          variant="outline"
          size="lg"
          className="border-border text-foreground bg-transparent"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>
    </div>
  )
}
