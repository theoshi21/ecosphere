import { useMemo, useState, useEffect } from 'react';
import type { WasteData, TimeRange } from '../types';
import { FilterComponent } from '../components/FilterComponent';
import { WasteModule } from '../components/WasteModule';
import { CarbonEstimator } from '../components/CarbonEstimator';
import { filterByTimeRange, filterByWasteType } from '../utils/filters';
import './WasteCarbonAnalysis.css';

interface WasteCarbonAnalysisProps {
  wasteData: WasteData[];
}

/**
 * Waste & Carbon Analysis page component
 * Displays waste composition and carbon footprint with filtering capabilities
 */
export function WasteCarbonAnalysis({ wasteData }: WasteCarbonAnalysisProps) {
  // Extract available months from data
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    wasteData.forEach((entry) => {
      const month = entry.date.substring(0, 7); // Extract YYYY-MM
      months.add(month);
    });
    return Array.from(months).sort();
  }, [wasteData]);

  // Extract available waste types from data
  const availableWasteTypes = useMemo(() => {
    const types = new Set<string>();
    wasteData.forEach((entry) => {
      if (entry.type) {
        types.add(entry.type);
      }
    });
    return Array.from(types).sort();
  }, [wasteData]);

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

  const [wasteType, setWasteType] = useState<string | null>(null);

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
    let result = wasteData;

    // Apply time range filter
    if (timeRange.startDate && timeRange.endDate) {
      result = filterByTimeRange(result, timeRange);
    }

    // Apply waste type filter
    if (wasteType) {
      result = filterByWasteType(result, wasteType);
    }

    return result;
  }, [wasteData, timeRange, wasteType]);

  // Create a custom filter component that uses waste types instead of categories
  const handleWasteTypeChange = (value: string | null) => {
    setWasteType(value);
  };

  return (
    <div className="waste-carbon-analysis-page">
      <div className="page-header">
        <h1>Waste & Carbon Analysis</h1>
      </div>

      <div className="filter-section">
        <FilterComponent
          availableMonths={availableMonths}
          availableCategories={availableWasteTypes}
          onTimeRangeChange={setTimeRange}
          onCategoryChange={handleWasteTypeChange}
          currentTimeRange={timeRange}
          currentCategory={wasteType}
        />
      </div>

      {filteredData.length > 0 ? (
        <div className="analysis-content">
          <WasteModule data={filteredData} />
          <CarbonEstimator data={filteredData} />
        </div>
      ) : (
        <div className="empty-state">
          <p>No data available for the selected filters.</p>
        </div>
      )}
    </div>
  );
}
