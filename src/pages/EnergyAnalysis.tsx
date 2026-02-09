import { useMemo, useState, useEffect } from 'react';
import type { EnergyData, TimeRange } from '../types';
import { FilterComponent } from '../components/FilterComponent';
import { EnergyModule } from '../components/EnergyModule';
import { filterByTimeRange, filterByCategory } from '../utils/filters';
import './EnergyAnalysis.css';

interface EnergyAnalysisProps {
  energyData: EnergyData[];
}

/**
 * Energy Analysis page component
 * Displays energy consumption data with filtering capabilities
 */
export function EnergyAnalysis({ energyData }: EnergyAnalysisProps) {
  // Extract available months from data
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    energyData.forEach((entry) => {
      const month = entry.date.substring(0, 7); // Extract YYYY-MM
      months.add(month);
    });
    return Array.from(months).sort();
  }, [energyData]);

  // Extract available categories from data
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    energyData.forEach((entry) => {
      if (entry.category) {
        categories.add(entry.category);
      }
    });
    return Array.from(categories).sort();
  }, [energyData]);

  // Initialize filter state
  const [timeRange, setTimeRange] = useState<TimeRange>(() => {
    if (availableMonths.length > 0) {
      return {
        startDate: availableMonths[0],
        endDate: availableMonths[availableMonths.length - 1],
      };
    }
    return { startDate: '', endDate: '' };
  });

  const [category, setCategory] = useState<string | null>(null);

  // Update time range when available months change
  useEffect(() => {
    if (availableMonths.length > 0 && !timeRange.startDate) {
      setTimeRange({
        startDate: availableMonths[0],
        endDate: availableMonths[availableMonths.length - 1],
      });
    }
  }, [availableMonths, timeRange.startDate]);

  // Apply filters to data
  const filteredData = useMemo(() => {
    let result = energyData;

    // Apply time range filter
    if (timeRange.startDate && timeRange.endDate) {
      result = filterByTimeRange(result, timeRange);
    }

    // Apply category filter
    if (category) {
      result = filterByCategory(result, category);
    }

    return result;
  }, [energyData, timeRange, category]);

  return (
    <div className="energy-analysis-page">
      <div className="page-header">
        <h1>Energy Analysis</h1>
      </div>

      <FilterComponent
        availableMonths={availableMonths}
        availableCategories={availableCategories}
        onTimeRangeChange={setTimeRange}
        onCategoryChange={setCategory}
        currentTimeRange={timeRange}
        currentCategory={category}
      />

      {filteredData.length > 0 ? (
        <EnergyModule data={filteredData} />
      ) : (
        <div className="empty-state">
          <p>No data available for the selected filters.</p>
        </div>
      )}
    </div>
  );
}
