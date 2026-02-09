# EcoSphere+ Campus Edition

A comprehensive environmental sustainability dashboard for campus monitoring and awareness. Track energy consumption, waste management, climate indicators, and carbon footprint in real-time.

## Features

- **Energy Analysis**: Monitor and visualize energy consumption patterns across campus facilities
- **Waste Management**: Track waste generation by type (recyclable, compostable, landfill, hazardous)
- **Climate Awareness**: View temperature trends, rainfall data, and heat risk classifications
- **Carbon Footprint**: Estimate and track carbon emissions based on campus activities
- **Interactive Visualizations**: Dynamic charts and graphs powered by Recharts
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Vitest** - Unit testing
- **Testing Library** - Component testing

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/theoshi21/ecosphere.git
cd ecosphere

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## Project Structure

```
ecosphere/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── data/           # Sample data
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   ├── contexts/       # React contexts
│   ├── test/           # Test utilities
│   └── theme.css       # Global theme and design tokens
├── public/             # Static assets
└── dist/               # Production build (generated)
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect the Vite configuration
4. Deploy!

The project includes a `vercel.json` configuration file for optimal deployment.

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the production-ready files
# Deploy the contents to your hosting provider
```

## Environment Variables

Currently, the application uses sample data and doesn't require environment variables. For production use with real data sources, you may need to configure:

- API endpoints
- Authentication tokens
- Database connections

## Testing

The project includes comprehensive test coverage:

```bash
# Run all tests
npm run test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode during development
npm run test:watch
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with React and TypeScript
- Visualizations powered by Recharts
- Icons and design inspired by environmental sustainability principles
