# Employment Form Application

A React-based employment information form that allows users to input employment details, calculate total income, and export the data as JSON.

## Features

- **Employment Data Collection**: Capture employer name, annual income, employment dates, and notes
- **Income Calculation**: Automatically calculates total income based on employment duration (excluding leap days)
- **Form Validation**: Comprehensive validation using Zod schemas with custom error messages
- **Data Export**: Export employment data as a JSON file
- **Responsive Design**: Mobile-friendly UI using Material-UI components
- **Type Safety**: Full TypeScript support with strict mode enabled

## Tech Stack

- **React 19.1.1** - UI framework
- **TypeScript** - Type safety and better developer experience
- **Material-UI (MUI)** - UI component library
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Vite** - Build tool and development server
- **ESLint** - Code linting

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tietoevry-assignment
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn lint` - Run ESLint
- `yarn preview` - Preview production build

## Form Validation Rules

- **Employer's Name**: Required field
- **Annual Gross Income**: Required, must be a positive number
- **Employment Start Date**: Required, cannot be a future date
- **Employment End Date**: Optional, must be after start date if provided
- **Notes**: Optional, maximum 500 characters

## Income Calculation

The application calculates total income based on the employment period:
- Uses the actual number of days worked
- Formula: `(Annual Income / 365) * Days Worked`
- Displays the result with proper currency formatting

## Data Export

Users can export their employment data as a JSON file containing:
- All form fields
- Calculated total income
- Employment duration in years
- Export timestamp

## Development

This project uses:
- Strict TypeScript configuration for type safety
- ESLint for code quality
- React Hook Form for efficient form handling
- Zod for runtime validation
- Material-UI for consistent styling