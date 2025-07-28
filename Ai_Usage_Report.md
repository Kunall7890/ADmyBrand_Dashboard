# ADmyBrand Dashboard

A modern dashboard application built with Next.js, TypeScript, and Tailwind CSS.

## Key Features

- Modular component-based architecture
- Custom hooks for reusable logic
- Responsive design with Tailwind CSS
- Fast performance with Next.js
- TypeScript for type safety
- Easy configuration and extensibility

## UI Design & Components

This dashboard leverages [V0](https://v0.dev/) and [Cursor](https://cursor.so/) for rapid UI prototyping and development.  
V0 and Cursor use AI to generate, iterate, and refine UI components, allowing for creative and efficient design workflows.

### How V0 and Cursor Shaped the UI

- **AI-Driven Prototyping:**  
  The UI was conceptualized and scaffolded using V0 and Cursor, which enabled fast experimentation and iteration on layouts, color schemes, and component structures.
- **Creative Freedom:**  
  The AI tools allowed for "stream of consciousness" design—ideas were quickly translated into working UI code, making the dashboard visually unique and highly tailored.
- **Component Generation:**  
  Many components were generated or refined using AI, then customized for the dashboard’s needs.

### Main UI Components

- **Sidebar Navigation:**  
  Persistent sidebar with navigation links, icons, and user profile access.
- **Header Bar:**  
  Top bar with search, notifications, and quick actions.
- **Dashboard Widgets:**  
  Modular cards for analytics, charts, campaign stats, and quick insights.
- **Tables & Lists:**  
  Responsive tables for data display, sortable and filterable.
- **Forms & Modals:**  
  Custom forms for campaign creation, user settings, and modal dialogs for confirmations and details.
- **Charts & Visualizations:**  
  Integrated chart components (e.g., bar, line, pie) for data visualization.
- **Reusable Buttons, Inputs, and Badges:**  
  Consistent, accessible UI elements across the app.

### Customization & Extensibility

- All components are built to be reusable and easily customizable.
- Tailwind CSS utility classes are used for rapid styling and responsive design.
- The architecture supports adding new components or modifying existing ones with minimal effort.

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- pnpm (or npm/yarn)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/ADmyBrand_Dashboard.git
   cd ADmyBrand_Dashboard
   ```

2. **Install dependencies:**
   ```sh
   pnpm install
   # or
   npm install
   ```

### Development

Start the development server:

```sh
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production

Build the app for production:

```sh
pnpm build
# or
npm run build
```

Start the production server:

```sh
pnpm start
# or
npm start
```

## Project Structure

- `app/` – Application routes and pages
- `components/` – Reusable UI components
- `hooks/` – Custom React hooks
- `lib/` – Utility libraries and helpers
- `public/` – Static assets
- `styles/` – Global and component styles

## Configuration

- `next.config.mjs` – Next.js configuration
- `tailwind.config.ts` – Tailwind CSS configuration
- `tsconfig.json` – TypeScript configuration

## License

MIT
