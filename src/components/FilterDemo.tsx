import React, { useMemo } from 'react';
import { FilterComponent } from './FilterComponent';
import { useFilter } from '../contexts/FilterContext';
import { sampleEnergyData } from '../data/sampleEnergyData';
import type { TimeRange } from '../types';

/**
 * Demo component to test FilterComponent functionality
 */
export const FilterDemo: React.FC = () => {
  const { filterState, setTimeRange, setCategory } = useFilter();

  // Extract available months from sample data
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    sampleEnergyData.forEach((entry) => {
      const month = entry.date.substring(0, 7); // Extract YYYY-MM
      months.add(month);
    });
    return Array.from(months).sort();
  }, []);

  // Extract available categories from sample data
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    sampleEnergyData.forEach((entry) => {
      if (entry.category) {
        categories.add(entry.category);
      }
    });
    return Array.from(categories).sort();
  }, []);

  // Set default time range if not set
  const currentTimeRange: TimeRange = filterState.timeRange || {
    startDate: availableMonths[0] || '2025-01',
    endDate: availableMonths[availableMonths.length - 1] || '2025-12',
  };

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
  };

  const handleCategoryChange = (category: string | null) => {
    setCategory(category);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Filter Component Demo</h2>
      
      <FilterComponent
        availableMonths={availableMonths}
        availableCategories={availableCategories}
        onTimeRangeChange={handleTimeRangeChange}
        onCategoryChange={handleCategoryChange}
        currentTimeRange={currentTimeRange}
        currentCategory={filterState.category || null}
      />

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Current Filter State:</h3>
        <pre>{JSON.stringify(filterState, null, 2)}</pre>
      </div>
    </div>
  );
};
