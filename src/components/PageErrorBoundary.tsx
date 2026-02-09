import React, { Component } from 'react';
import type { ReactNode } from 'react';
import './PageErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class PageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Page rendering error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-error-container">
          <div className="page-error-content">
            <div className="page-error-icon">⚠️</div>
            <h1 className="page-error-title">Something went wrong</h1>
            <p className="page-error-message">
              We encountered an error while loading this page.
            </p>
            <p className="page-error-detail">
              Please try refreshing the page or navigating back to the Overview Dashboard.
            </p>
            <button 
              className="page-error-button"
              onClick={() => window.location.href = '/'}
            >
              Return to Overview
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default PageErrorBoundary;
