import React, { Component } from 'react';
import type { ReactNode } from 'react';
import './ChartErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ChartErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Chart rendering error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="chart-error-fallback">
          <div className="chart-error-icon">⚠️</div>
          <p className="chart-error-message">Unable to display chart</p>
          <p className="chart-error-detail">
            The visualization could not be rendered. Please try refreshing the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChartErrorBoundary;
