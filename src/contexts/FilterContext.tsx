import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { FilterState, TimeRange } from '../types';

interface FilterContextType {
  filterState: FilterState;
  setTimeRange: (range: TimeRange) => void;
  setCategory: (category: string | null) => void;
  setWasteType: (wasteType: string | null) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const STORAGE_KEY = 'ecosphere-filter-state';

/**
 * Get default filter state
 */
function getDefaultFilterState(): FilterState {
  return {
    timeRange: undefined,
    category: undefined,
    wasteType: undefined,
  };
}

/**
 * Validate filter state structure
 */
function isValidFilterState(state: any): state is FilterState {
  if (!state || typeof state !== 'object') return false;
  
  // Validate timeRange if present
  if (state.timeRange !== undefined) {
    if (typeof state.timeRange !== 'object') return false;
    if (typeof state.timeRange.startDate !== 'string') return false;
    if (typeof state.timeRange.endDate !== 'string') return false;
    
    // Validate that startDate <= endDate
    const start = new Date(state.timeRange.startDate);
    const end = new Date(state.timeRange.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return false;
    if (start > end) return false;
  }
  
  // Validate category if present
  if (state.category !== undefined && state.category !== null) {
    if (typeof state.category !== 'string') return false;
  }
  
  // Validate wasteType if present
  if (state.wasteType !== undefined && state.wasteType !== null) {
    if (typeof state.wasteType !== 'string') return false;
  }
  
  return true;
}

/**
 * Load filter state from session storage
 */
function loadFilterState(): FilterState {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultFilterState();
    
    const parsed = JSON.parse(stored);
    if (!isValidFilterState(parsed)) {
      console.warn('Invalid filter state in storage, using defaults');
      return getDefaultFilterState();
    }
    return parsed;
  } catch (error) {
    console.error('Error loading filter state:', error);
    return getDefaultFilterState();
  }
}

/**
 * Save filter state to session storage
 */
function saveFilterState(state: FilterState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving filter state:', error);
  }
}

interface FilterProviderProps {
  children: ReactNode;
}

/**
 * Filter context provider
 * Manages filter state and persists it across page navigation
 */
export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filterState, setFilterState] = useState<FilterState>(loadFilterState);

  // Persist filter state to session storage whenever it changes
  useEffect(() => {
    saveFilterState(filterState);
  }, [filterState]);

  const setTimeRange = (range: TimeRange) => {
    // Validate that startDate <= endDate
    const start = new Date(range.startDate);
    const end = new Date(range.endDate);
    
    if (start > end) {
      console.warn('Invalid time range: startDate must be <= endDate');
      return;
    }
    
    setFilterState((prev) => ({
      ...prev,
      timeRange: range,
    }));
  };

  const setCategory = (category: string | null) => {
    setFilterState((prev) => ({
      ...prev,
      category: category || undefined,
    }));
  };

  const setWasteType = (wasteType: string | null) => {
    setFilterState((prev) => ({
      ...prev,
      wasteType: wasteType || undefined,
    }));
  };

  const clearFilters = () => {
    setFilterState(getDefaultFilterState());
  };

  const value: FilterContextType = {
    filterState,
    setTimeRange,
    setCategory,
    setWasteType,
    clearFilters,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

/**
 * Hook to use filter context
 * Must be used within a FilterProvider
 */
export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
