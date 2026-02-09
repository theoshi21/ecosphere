import React from 'react';
import ChartErrorBoundary from './ChartErrorBoundary';
import PageErrorBoundary from './PageErrorBoundary';
import EmptyState from './EmptyState';
import { LineChart } from './LineChart';

/**
 * Demo component showing how to use error handling components
 * This is for demonstration purposes only
 */
const ErrorHandlingDemo: React.FC = () => {
  return (
    <PageErrorBoundary>
      <div style={{ padding: '2rem' }}>
        <h1>Error Handling Demo</h1>
        
        <section style={{ marginBottom: '3rem' }}>
          <h2>Chart Error Boundary</h2>
          <p>Wraps charts to catch rendering errors:</p>
          <ChartErrorBoundary>
            <LineChart 
              data={[
                { date: '2024-01-01', value: 100 },
                { date: '2024-01-02', value: 150 }
              ]}
              xAxisKey="date"
              yAxisKey="value"
              lineColor="#2E7D32"
            />
          </ChartErrorBoundary>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Empty State Component</h2>
          <p>Displays when no data is available:</p>
          <EmptyState />
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Custom Empty State</h2>
          <p>With custom message:</p>
          <EmptyState 
            icon="🔍"
            title="No results found"
            message="Try adjusting your search criteria or filters."
          />
        </section>
      </div>
    </PageErrorBoundary>
  );
};

export default ErrorHandlingDemo;
