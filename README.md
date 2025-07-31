# Module Template



## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
- http://localhost:3000

## Module Structure

- `game/` - Contains all module-specific files
  - `configuration.ts` - Module configuration schema
  - `operation.ts` - Module operation definitions  
  - `result-interpretation.ts` - Result processing logic
  - `component.tsx` - Main React component
  - `types.ts` - Shared type definitions

## Usage

The module follows the standard game module pattern with:

- **Configuration**: Defines the module's settings and behavior
- **Operations**: External events the module can receive
- **Results**: Standardized output format (Attempt/Choice)
- **Component**: React component with forwardRef pattern

## Customization

Modify the configuration in the demo files to test different scenarios:

- `app/page.tsx`

Update the module files in the `game/` directory to implement your specific functionality:

- Add your configuration schema to `configuration.ts`
- Define operations in `operation.ts`
- Implement your component logic in `component.tsx`
- Update result interpretation in `result-interpretation.ts`

## Building for Production

```bash
npm run build
```

## Deployment

The easiest way to deploy is using Vercel:

```bash
npm i -g vercel
vercel
```

