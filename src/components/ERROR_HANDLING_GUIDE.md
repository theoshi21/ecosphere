# Error Handling Guide

This guide explains how to use the error handling components in the EcoSphere+ Campus Edition dashboard.

## Components

### 1. PageErrorBoundary

Wraps entire pages to catch and handle rendering errors gracefully.

**Usage:**
```tsx
import PageErrorBoundary from './components/PageErrorBoundary';

function App() {
  return (
    <PageErrorBoundary>
      <YourPageComponent />
    </PageErrorBoundary>
  );
}
```

**Features:**
- Catches all React errors within the page
- Displays user-friendly error message
- Provides "Return to Overview" button
- Logs errors to console for debugging

### 2. ChartErrorBoundary

Wraps individual charts to prevent chart rendering errors from breaking the entire page.

**Usage:**
```tsx
import ChartErrorBoundary from './components/ChartErrorBoundary';
import { LineChart } from './components/LineChart';

function EnergyModule() {
  return (
    <ChartErrorBoundary>
      <LineChart data={energyData} />
    </ChartErrorBoundary>
  );
}
```

**Features:**
- Isolates chart errors
- Shows "Unable to display chart" message
- Allows rest of page to render normally
- Logs errors to console

### 3. EmptyState

Displays when no data is available for the current filters or query.

**Usage:**
```tsx
import EmptyState from './components/EmptyState';

function DataDisplay({ data }) {
  if (data.length === 0) {
    return <EmptyState />;
  }
  
  return <DataVisualization data={data} />;
}
```

**Custom Messages:**
```tsx
<EmptyState 
  icon="🔍"
  title="No results found"
  message="Try adjusting your search criteria."
/>
```

**Props:**
- `icon` (optional): Emoji or icon to display (default: "📊")
- `title` (optional): Main heading (default: "No data available")
- `message` (optional): Descriptive message (default: filter adjustment suggestion)

## Data Validation

### Validation Functions

Located in `src/utils/validation.ts`:

**Individual Validators:**
- `validateEnergyData(data)` - Validates single energy data entry
- `validateWasteData(data)` - Validates single waste data entry
- `validateClimateData(data)` - Validates single climate data entry
- `validateAcousticData(data)` - Validates single acoustic data entry

**Array Filters:**
- `filterValidEnergyData(data[])` - Filters out invalid energy entries
- `filterValidWasteData(data[])` - Filters out invalid waste entries
- `filterValidClimateData(data[])` - Filters out invalid climate entries
- `filterValidAcousticData(data[])` - Filters out invalid acoustic entries

**Usage:**
```tsx
import { filterValidEnergyData } from '../utils/validation';

function EnergyModule({ rawData }) {
  const validData = filterValidEnergyData(rawData);
  
  if (validData.length === 0) {
    return <EmptyState />;
  }
  
  return <ChartErrorBoundary>
    <LineChart data={validData} />
  </ChartErrorBoundary>;
}
```

### Validation Rules

**All Data Types:**
- Date must be valid ISO 8601 format
- Numeric values must be non-negative

**Energy Data:**
- `consumption` must be >= 0

**Waste Data:**
- `type` must be non-empty string
- `amount` must be >= 0

**Climate Data:**
- `temperature` must be between -50°C and 60°C
- `rainfall` (if present) must be >= 0

**Acoustic Data:**
- `decibelLevel` must be >= 0

### Console Warnings

Invalid data entries trigger console warnings with details:
- "Invalid date in energy data: [value]"
- "Invalid consumption value: [value]"
- "Temperature out of reasonable range: [value]°C"

This helps with debugging while gracefully handling errors in production.

## Best Practices

1. **Wrap pages with PageErrorBoundary** at the route level
2. **Wrap individual charts with ChartErrorBoundary** to isolate failures
3. **Validate data before rendering** using validation utilities
4. **Show EmptyState** when filtered data is empty
5. **Check console warnings** during development to catch data issues early

## Example: Complete Error Handling

```tsx
import PageErrorBoundary from './components/PageErrorBoundary';
import ChartErrorBoundary from './components/ChartErrorBoundary';
import EmptyState from './components/EmptyState';
import { filterValidEnergyData } from '../utils/validation';
import { LineChart } from './components/LineChart';

function EnergyAnalysisPage({ rawData }) {
  return (
    <PageErrorBoundary>
      <div className="page-container">
        <h1>Energy Analysis</h1>
        <EnergyVisualization data={rawData} />
      </div>
    </PageErrorBoundary>
  );
}

function EnergyVisualization({ data }) {
  const validData = filterValidEnergyData(data);
  
  if (validData.length === 0) {
    return <EmptyState 
      title="No energy data available"
      message="No valid energy data found for the selected time period."
    />;
  }
  
  return (
    <ChartErrorBoundary>
      <LineChart 
        data={validData}
        xAxisKey="date"
        yAxisKey="consumption"
        lineColor="#2E7D32"
      />
    </ChartErrorBoundary>
  );
}
```

This approach ensures:
- Page-level errors don't crash the entire app
- Chart errors don't break the page
- Invalid data is filtered out gracefully
- Users see helpful messages when data is unavailable
- Developers get console warnings for debugging
