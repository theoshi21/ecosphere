import { useMemo, useState, useEffect } from 'react';
import type { ClimateData, AcousticData, TimeRange } from '../types';
import { FilterComponent } from '../components/FilterComponent';
import { ClimateModule } from '../components/ClimateModule';
import { filterByTimeRange } from '../utils/filters';
import './ClimateAwareness.css';

interface ClimateAwarenessProps {
  climateData: ClimateData[];
  acousticData?: AcousticData[];
}

/**
 * Climate Awareness page component
 * Displays climate indicators with filtering capabilities
 */
export function ClimateAwareness({ climateData, acousticData }: ClimateAwarenessProps) {
  // Extract available months from data
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    climateData.forEach((entry) => {
      const month = entry.date.substring(0, 7); // Extract YYYY-MM
      months.add(month);
    });
    return Array.from(months).sort();
  }, [climateData]);

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

  // Update time range when available months change
  useEffect(() => {
    if (availableMonths.length > 0 && !timeRange.startDate) {
      setTimeRange({
        startDate: availableMonths[0],
        endDate: availableMonths[availableMonths.length - 1],
      });
    }
  }, [availableMonths, timeRange.startDate]);

  // Apply time range filter to data
  const filteredData = useMemo(() => {
    if (timeRange.startDate && timeRange.endDate) {
      return filterByTimeRange(climateData, timeRange);
    }
    return climateData;
  }, [climateData, timeRange]);

  // Apply time range filter to acoustic data
  const filteredAcousticData = useMemo(() => {
    if (!acousticData) {
      return undefined;
    }
    if (timeRange.startDate && timeRange.endDate) {
      return filterByTimeRange(acousticData, timeRange);
    }
    return acousticData;
  }, [acousticData, timeRange]);

  // No-op handler for category (not used in climate page)
  const handleCategoryChange = () => {
    // Climate page doesn't use category filter
  };

  return (
    <div className="climate-awareness-page">
      <div className="page-header">
        <h1>Climate Awareness</h1>
      </div>

      <FilterComponent
        availableMonths={availableMonths}
        onTimeRangeChange={setTimeRange}
        onCategoryChange={handleCategoryChange}
        currentTimeRange={timeRange}
        currentCategory={null}
      />

      {filteredData.length > 0 ? (
        <ClimateModule data={filteredData} acousticData={filteredAcousticData} />
      ) : (
        <div className="empty-state">
          <p>No data available for the selected filters.</p>
        </div>
      )}
    </div>
  );
}
