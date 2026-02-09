import React from 'react';
import type { TimeRange } from '../types';
import './FilterComponent.css';

interface FilterComponentProps {
  availableMonths: string[];      // ["2025-01", "2025-02", ...]
  availableCategories?: string[]; // Optional category list
  onTimeRangeChange: (range: TimeRange) => void;
  onCategoryChange: (category: string | null) => void;
  currentTimeRange: TimeRange;
  currentCategory: string | null;
}

/**
 * Filter component for filtering data by time range and category
 * Provides month, year, and optional category dropdowns with a clear filters button
 */
export const FilterComponent: React.FC<FilterComponentProps> = ({
  availableMonths,
  availableCategories,
  onTimeRangeChange,
  onCategoryChange,
  currentTimeRange,
  currentCategory,
}) => {
  const handleStartMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStartDate = e.target.value;
    const newRange: TimeRange = {
      startDate: newStartDate,
      endDate: currentTimeRange.endDate,
    };
    
    // Validate that startDate <= endDate
    if (new Date(newStartDate) <= new Date(currentTimeRange.endDate)) {
      onTimeRangeChange(newRange);
    }
  };

  const handleEndMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEndDate = e.target.value;
    const newRange: TimeRange = {
      startDate: currentTimeRange.startDate,
      endDate: newEndDate,
    };
    
    // Validate that startDate <= endDate
    if (new Date(currentTimeRange.startDate) <= new Date(newEndDate)) {
      onTimeRangeChange(newRange);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onCategoryChange(value === '' ? null : value);
  };

  const handleClearFilters = () => {
    // Reset to default time range (first to last available month)
    if (availableMonths.length > 0) {
      const defaultRange: TimeRange = {
        startDate: availableMonths[0],
        endDate: availableMonths[availableMonths.length - 1],
      };
      onTimeRangeChange(defaultRange);
    }
    onCategoryChange(null);
  };

  return (
    <div className="filter-component">
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="start-month">Start Month:</label>
          <select
            id="start-month"
            value={currentTimeRange.startDate}
            onChange={handleStartMonthChange}
          >
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {formatMonthDisplay(month)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="end-month">End Month:</label>
          <select
            id="end-month"
            value={currentTimeRange.endDate}
            onChange={handleEndMonthChange}
          >
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {formatMonthDisplay(month)}
              </option>
            ))}
          </select>
        </div>

        {availableCategories && availableCategories.length > 0 && (
          <div className="filter-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={currentCategory || ''}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="filter-group">
          <button
            type="button"
            className="clear-filters-button"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Format month string for display
 * Converts "2025-01" to "January 2025"
 */
function formatMonthDisplay(monthStr: string): string {
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}
