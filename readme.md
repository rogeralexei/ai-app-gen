# AI-Powered Database Application Generator

A modern, interactive frontend for generating full-stack database applications using AI-powered multi-agent orchestration. This tool allows users to describe their application needs in natural language and receive a complete, validated database schema with ORM models, API endpoints, and UI components.

## Overview

This application implements the frontend interface for an academic research project on AI-powered code generation. It provides a streamlined workflow for:

1. **Prompt Input** - Describe your application requirements in natural language
2. **Schema Mockup** - Review and edit the AI-generated database schema
3. **Refinement Loop** - Iterate and improve the schema before final generation
4. **Validation Report** - View the generated code, validations, and potential issues

## Features

### Prompt Input Screen
- Natural language prompt input with rich text support
- Configurable parameters:
  - Entity name (e.g., "User", "Product", "Order")
  - CRUD operations selection (Create, Read, Update, Delete)
  - Additional context and requirements
- Real-time character count and validation
- Smart suggestions for common use cases

### Interactive Schema Mockup Editor
- Visual field editor with drag-and-drop reordering
- Editable field properties:
  - Field name and label
  - Data type (string, number, boolean, date, email, etc.)
  - Required/optional toggle
  - Validation rules
- Add/remove fields dynamically
- Real-time preview of schema structure
- Field type icons for quick identification

### Feedback Loop
- Refinement suggestions based on best practices
- Ability to regenerate schema with modified prompt
- History of iterations
- Compare changes between versions
- One-click apply suggested improvements

### Validation Report
- Comprehensive validation results
- Color-coded status indicators (success, warning, error)
- Generated file preview with syntax highlighting
- Downloadable code artifacts
- Detailed error messages and suggestions
- Performance metrics and statistics

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd ai-app-generator
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Usage Guide

### Step 1: Enter Your Prompt

1. Navigate to the prompt input screen
2. Describe your application in natural language:
   - Example: "Create a blog system with posts, comments, and user authentication"
3. Configure parameters:
   - Set the main entity name (e.g., "Post")
   - Select required CRUD operations
4. Click "Generate Schema" to proceed

### Step 2: Review and Edit Schema

1. Review the AI-generated database schema
2. Edit field properties:
   - Click on any field to modify its name, type, or label
   - Toggle the "Required" checkbox for validation rules
   - Use the trash icon to remove unwanted fields
3. Add new fields using the "Add Field" button
4. Reorder fields by dragging them
5. Click "Refine Schema" if you want to make changes, or "Confirm & Generate" to proceed

### Step 3: Refine (Optional)

1. Review suggested improvements
2. Modify your original prompt if needed
3. Click "Regenerate" to create an updated schema
4. Compare the new version with the previous one
5. Repeat until satisfied

### Step 4: Generate and Review

1. Click "Confirm & Generate" to trigger the orchestration
2. Wait for the AI agents to generate the complete application
3. Review the validation report:
   - Check for any errors or warnings
   - Preview generated code files
   - Download the complete application package

## Project Structure

\`\`\`
ai-app-generator/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx             # Main application page with step management
│   └── globals.css          # Global styles and design tokens
├── components/
│   ├── prompt-screen.tsx    # Step 1: Prompt input interface
│   ├── mockup-editor.tsx    # Step 2: Schema editor interface
│   └── validation-report.tsx # Step 4: Results and validation
├── components/ui/           # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── checkbox.tsx
│   ├── badge.tsx
│   └── ...
└── README.md
\`\`\`

## Backend Integration

This frontend is designed to integrate with a multi-agent backend system. The following endpoints need to be implemented:

### API Endpoints

#### POST /api/generate-schema
Generates initial schema from user prompt.

**Request:**
\`\`\`json
{
  "prompt": "string",
  "entityName": "string",
  "operations": ["create", "read", "update", "delete"]
}
\`\`\`

**Response:**
\`\`\`json
{
  "schema": {
    "fields": [
      {
        "name": "string",
        "type": "string",
        "label": "string",
        "required": boolean
      }
    ]
  }
}
\`\`\`

#### POST /api/orchestrate
Triggers the full orchestration process with confirmed schema.

**Request:**
\`\`\`json
{
  "prompt": "string",
  "schema": {
    "fields": [...]
  },
  "entityName": "string",
  "operations": ["create", "read", "update", "delete"]
}
\`\`\`

**Response:**
\`\`\`json
{
  "status": "success" | "error",
  "validations": {
    "errors": ["string"],
    "warnings": ["string"]
  },
  "generatedFiles": [
    {
      "name": "string",
      "type": "string",
      "content": "string",
      "size": "string"
    }
  ],
  "metrics": {
    "totalFiles": number,
    "linesOfCode": number,
    "generationTime": "string"
  }
}
\`\`\`

## Design System

### Color Palette

- **Background**: Dark theme with `#0a0a0a` base
- **Foreground**: `#ededed` for primary text
- **Primary**: Cyan (`#06b6d4`) for interactive elements
- **Accent**: Blue (`#3b82f6`) for highlights
- **Muted**: `#262626` for secondary backgrounds
- **Border**: `#27272a` for subtle divisions

### Typography

- **Headings**: Geist Sans (600-700 weight)
- **Body**: Geist Sans (400 weight)
- **Code**: Geist Mono

### Spacing

Follows Tailwind's spacing scale (4px base unit) for consistent rhythm throughout the interface.

## Contributing

This is an academic research project. For contributions or questions, please contact the project maintainers.

## License

This project is part of academic research. Please refer to the institution's guidelines for usage and distribution.

## Acknowledgments

- Built with Next.js and Vercel
- UI components from shadcn/ui
- Icons from Lucide
- Inspired by modern developer tools like v0, Vercel, and Braintrust

## Support

For issues, questions, or feedback, please open an issue in the repository or contact the development team.

---

**Note**: This is a frontend prototype. The backend orchestration system with AI agents needs to be implemented separately according to the project specifications.
