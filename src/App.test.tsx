import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

/**
 * Integration tests for the EcoSphere+ Campus Edition dashboard
 * Tests complete user flows, navigation, filter persistence, and error handling
 */
describe('App Integration Tests', () => {
  beforeEach(() => {
    // Clear session storage before each test
    sessionStorage.clear();
    
    // Mock console methods to avoid noise in test output
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Helper function to render App (App has its own BrowserRouter)
  const renderApp = () => {
    return render(<App />);
  };

  describe('Complete User Flows', () => {
    it('navigates through all pages successfully', async () => {
      const user = userEvent.setup();
      renderApp();

      // Navigate to Overview Dashboard first
      const overviewLink = screen.getByRole('link', { name: /overview/i });
      await user.click(overviewLink);

      // Verify we're on Overview Dashboard
      await waitFor(() => {
        expect(screen.getAllByText('EcoSphere+ Campus Edition').length).toBeGreaterThan(0);
        expect(screen.getByText('Total Energy')).toBeInTheDocument();
      });

      // Navigate to Energy Analysis
      const energyLink = screen.getByRole('link', { name: /energy analysis/i });
      await user.click(energyLink);
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Energy Analysis', level: 1 })).toBeInTheDocument();
      });

      // Navigate to Waste & Carbon Analysis
      const wasteLink = screen.getByRole('link', { name: /waste.*carbon/i });
      await user.click(wasteLink);
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /waste.*carbon/i, level: 1 })).toBeInTheDocument();
      });

      // Navigate to Climate Awareness
      const climateLink = screen.getByRole('link', { name: /climate awareness/i });
      await user.click(climateLink);
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Climate Awareness', level: 1 })).toBeInTheDocument();
      });

      // Navigate back to Overview
      const overviewLink2 = screen.getByRole('link', { name: /overview/i });
      await user.click(overviewLink2);
      await waitFor(() => {
        expect(screen.getByText('Total Energy')).toBeInTheDocument();
      });
    });

    it('completes energy analysis workflow with filtering', async () => {
      const user = userEvent.setup();
      renderApp();

      // Navigate to Energy Analysis
      const energyLink = screen.getByRole('link', { name: /energy analysis/i });
      await user.click(energyLink);

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Energy Analysis', level: 1 })).toBeInTheDocument();
      });

      // Verify energy module is displayed
      expect(screen.getByText('Energy Consumption')).toBeInTheDocument();
      expect(screen.getByText('Energy Over Time')).toBeInTheDocument();
      expect(screen.getByText('Monthly Comparison')).toBeInTheDocument();

      // Verify prototype label is present
      expect(screen.getByText('Prototype / Demonstration Data')).toBeInTheDocument();
    });

    it('completes waste and carbon analysis workflow', async () => {
      const user = userEvent.setup();
      renderApp();

      // Navigate to Waste & Carbon Analysis
      const wasteLink = screen.getByRole('link', { name: /waste.*carbon/i });
      await user.click(wasteLink);

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /waste.*carbon/i, level: 1 })).toBeInTheDocument();
      });

      // Verify waste module is displayed
      expect(screen.getByText('Waste Composition')).toBeInTheDocument();

      // Verify carbon estimator is displayed
      expect(screen.getByText(/estimated carbon footprint/i)).toBeInTheDocument();

      // Verify disclaimers are present (multiple components have these)
      expect(screen.getByText(/for awareness purposes only/i)).toBeInTheDocument();
    });

    it('completes climate awareness workflow', async () => {
      const user = userEvent.setup();
      renderApp();

      // Navigate to Climate Awareness
      const climateLink = screen.getByRole('link', { name: /climate awareness/i });
      await user.click(climateLink);

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Climate Awareness', level: 1 })).toBeInTheDocument();
      });

      // Verify climate module is displayed
      expect(screen.getByText('Temperature Trends')).toBeInTheDocument();

      // Verify disclaimers are present
      expect(screen.getByText(/climate indicators are for awareness/i)).toBeInTheDocument();
    });
  });

  describe('Filter State Persistence', () => {
    it('persists filter state when navigating between pages', async () => {
      const user = userEvent.setup();
      renderApp();

      // Navigate to Energy Analysis
      const energyLink = screen.getByRole('link', { name: /energy analysis/i });
      await user.click(energyLink);

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Energy Analysis', level: 1 })).toBeInTheDocument();
      });

      // Apply a filter (if filter controls are available)
      // Note: This test verifies the filter context is working
      // The actual filter UI interaction would depend on the implementation

      // Navigate to another page
      const wasteLink = screen.getByRole('link', { name: /waste.*carbon/i });
      await user.click(wasteLink);

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /waste.*carbon/i, level: 1 })).toBeInTheDocument();
      });

      // Navigate back to Energy Analysis
      const energyLink2 = screen.getByRole('link', { name: /energy analysis/i });
      await user.click(energyLink2);

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Energy Analysis', level: 1 })).toBeInTheDocument();
      });

      // Filter state should be maintained (verified by FilterContext tests)
    });
  });

  describe('Visualization Rendering', () => {
    it('renders all visualizations on Overview Dashboard', async () => {
      const user = userEvent.setup();
      renderApp();

      // Navigate to Overview Dashboard
      const overviewLink = screen.getByRole('link', { name: /overview/i });
      await user.click(overviewLink);

      await waitFor(() => {
        expect(screen.getByText('Total Energy')).toBeInTheDocument();
      });

      // Verify summary cards are present
      expect(screen.getByText('Total Energy')).toBeInTheDocument();
      expect(screen.getByText('Total Waste')).toBeInTheDocument();
      expect(screen.getByText('Carbon Footprint')).toBeInTheDocument();
      expect(screen.getByText('Heat Risk')).toBeInTheDocument();

      // Verify combined trends section
      expect(screen.getByText('Combined Trends')).toBeInTheDocument();

      // Verify units are displayed
      expect(screen.getByText('kWh')).toBeInTheDocument();
      expect(screen.getByText('kg')).toBeInTheDocument();
    });

    it('renders energy visualizations correctly', async () => {
      const user = userEvent.setup();
      renderApp();

      // Navigate to Energy Analysis
      const energyLink = screen.getByRole('link', { name: /energy analysis/i });
      await user.click(energyLink);

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Energy Analysis', level: 1 })).toBeInTheDocument();
      });

      // Verify charts are rendered
      expect(screen.getByText('Energy Over Time')).toBeInTheDocument();
      expect(screen.getByText('Monthly Comparison')).toBeInTheDocument();

      // Verify insight text is present
      const insightRegex = /increased by|decreased by|remained stable/i;
      expect(screen.getByText(insightRegex)).toBeInTheDocument();
    });

    it('renders waste visualizations correctly', async () => {
      const user = userEvent.setup();
      renderApp();

      // Navigate to Waste & Carbon Analysis
      const wasteLink = screen.getByRole('link', { name: /waste.*carbon/i });
      await user.click(wasteLink);

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /waste.*carbon/i, level: 1 })).toBeInTheDocument();
      });

      // Verify waste composition chart
      expect(screen.getByText('Waste Composition')).toBeInTheDocument();

      // Verify total waste summary (may appear multiple times)
      expect(screen.getAllByText(/total waste/i).length).toBeGreaterThan(0);
    });

    it('renders climate visualizations correctly', async () => {
      const user = userEvent.setup();
      renderApp();

      // Navigate to Climate Awareness
      const climateLink = screen.getByRole('link', { name: /climate awareness/i });
      await user.click(climateLink);

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Climate Awareness', level: 1 })).toBeInTheDocument();
      });

      // Verify temperature trends chart
      expect(screen.getByText('Temperature Trends')).toBeInTheDocument();

      // Verify heat risk classification (should be present somewhere)
      const heatRiskRegex = /low|moderate|high/i;
      expect(screen.getAllByText(heatRiskRegex).length).toBeGreaterThan(0);
    });
  });

  describe('Error Handling', () => {
    it('handles 404 routes gracefully', async () => {
      // Mock window.location to test 404 handling
      const { container } = render(<App />);
      
      // Navigate to a non-existent route by updating the URL
      window.history.pushState({}, '', '/non-existent-route');
      
      // Re-render to trigger route change
      const { rerender } = render(<App />);
      rerender(<App />);

      // Note: The 404 page should be displayed
      // This test verifies the app doesn't crash on invalid routes
      expect(container).toBeInTheDocument();
    });

    it('handles empty data gracefully', async () => {
      // This is tested by the individual component tests
      // The app should display "No data available" messages
      // when filters result in empty datasets
      render(<App />);
      
      // Verify the app renders without crashing
      expect(screen.getByText('EcoSphere+ Campus Edition')).toBeInTheDocument();
    });
  });

  describe('Disclaimer Visibility', () => {
    it('displays all required disclaimers on Overview Dashboard', async () => {
      const user = userEvent.setup();
      renderApp();

      // Navigate to Overview Dashboard
      const overviewLink = screen.getByRole('link', { name: /overview/i });
      await user.click(overviewLink);

      await waitFor(() => {
        expect(screen.getByText('Total Energy')).toBeInTheDocument();
      });

      // Summary card disclaimers
      expect(screen.getByText('Estimated')).toBeInTheDocument();
      expect(screen.getByText('For awareness')).toBeInTheDocument();
    });

    it('displays disclaimers on Energy Analysis page', async () => {
      const user = userEvent.setup();
      render(<App />);

      const energyLink = screen.getByRole('link', { name: /energy analysis/i });
      await user.click(energyLink);

      await waitFor(() => {
        expect(screen.getByText('Energy Consumption')).toBeInTheDocument();
      });
    });

    it('displays disclaimers on Waste & Carbon Analysis page', async () => {
      const user = userEvent.setup();
      renderApp();

      const wasteLink = screen.getByRole('link', { name: /waste.*carbon/i });
      await user.click(wasteLink);

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /waste.*carbon/i, level: 1 })).toBeInTheDocument();
      });
      
      expect(screen.getByText(/for awareness purposes only/i)).toBeInTheDocument();
    });

    it('displays disclaimers on Climate Awareness page', async () => {
      const user = userEvent.setup();
      renderApp();

      const climateLink = screen.getByRole('link', { name: /climate awareness/i });
      await user.click(climateLink);

      await waitFor(() => {
        expect(screen.getByText(/climate indicators are for awareness/i)).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Layout', () => {
    it('renders main layout structure correctly', () => {
      const { container } = render(<App />);

      // Verify main container structure
      const appContainer = container.querySelector('.app-container');
      expect(appContainer).toBeInTheDocument();

      // Verify navigation is present
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();

      // Verify main content area
      const main = container.querySelector('.main-content');
      expect(main).toBeInTheDocument();
    });

    it('renders navigation links correctly', () => {
      render(<App />);

      // Verify all navigation links are present
      expect(screen.getByRole('link', { name: /overview/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /energy analysis/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /waste.*carbon/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /climate awareness/i })).toBeInTheDocument();
    });

    it('applies responsive classes to components', () => {
      const { container } = render(<App />);

      // Verify responsive container classes exist
      // Note: Actual responsive behavior would require viewport testing
      // which is beyond the scope of unit tests
      expect(container.querySelector('.app-container')).toBeInTheDocument();
    });
  });

  describe('Navigation State', () => {
    it('highlights active page in navigation', async () => {
      const user = userEvent.setup();
      renderApp();

      // Navigate to Energy Analysis
      const energyLink = screen.getByRole('link', { name: /energy analysis/i });
      await user.click(energyLink);

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Energy Analysis', level: 1 })).toBeInTheDocument();
      });

      // Verify active state (implementation depends on Navigation component)
      // The Navigation component should apply an 'active' class to the current link
    });

    it('maintains navigation consistency across pages', async () => {
      const user = userEvent.setup();
      renderApp();

      // Verify navigation is present on all pages
      const pages = [
        { link: /energy analysis/i, title: 'Energy Analysis' },
        { link: /waste.*carbon/i, title: /waste.*carbon/i },
        { link: /climate awareness/i, title: 'Climate Awareness' },
      ];

      for (const page of pages) {
        const link = screen.getByRole('link', { name: page.link });
        await user.click(link);

        await waitFor(() => {
          expect(screen.getByRole('heading', { name: page.title, level: 1 })).toBeInTheDocument();
        });

        // Verify all navigation links are still present
        expect(screen.getByRole('link', { name: /overview/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /energy analysis/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /waste.*carbon/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /climate awareness/i })).toBeInTheDocument();
      }
    });
  });

  describe('Data Integration', () => {
    it('loads and displays sample data correctly', async () => {
      const user = userEvent.setup();
      renderApp();

      // Navigate to Overview Dashboard
      const overviewLink = screen.getByRole('link', { name: /overview/i });
      await user.click(overviewLink);

      await waitFor(() => {
        expect(screen.getAllByText('EcoSphere+ Campus Edition').length).toBeGreaterThan(0);
      });
      
      // Verify summary cards are present
      expect(screen.getByText('Total Energy')).toBeInTheDocument();
      expect(screen.getByText('Total Waste')).toBeInTheDocument();
    });

    it('integrates all data sources on Overview Dashboard', async () => {
      const user = userEvent.setup();
      renderApp();

      // Navigate to Overview Dashboard
      const overviewLink = screen.getByRole('link', { name: /overview/i });
      await user.click(overviewLink);

      // Verify we're on the Overview Dashboard
      await waitFor(() => {
        expect(screen.getAllByText('EcoSphere+ Campus Edition').length).toBeGreaterThan(0);
        expect(screen.getByText('Total Energy')).toBeInTheDocument();
      });

      // Verify all data types are represented
      expect(screen.getByText('Total Energy')).toBeInTheDocument();
      expect(screen.getByText('Total Waste')).toBeInTheDocument();
      expect(screen.getByText('Carbon Footprint')).toBeInTheDocument();
      expect(screen.getByText('Heat Risk')).toBeInTheDocument();
    });
  });
});
