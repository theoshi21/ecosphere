import type { EnergyData, WasteData, TimeRange } from '../types';

/**
 * Filters data by time range (inclusive)
 * @param data - Array of data with date property
 * @param timeRange - Time range filter with startDate and endDate
 * @returns Filtered array of data within the time range
 */
export function filterByTimeRange<T extends { date: string }>(
  data: T[],
  timeRange: TimeRange
): T[] {
  // Validate inputs
  if (!Array.isArray(data)) {
    console.warn('filterByTimeRange: data must be an array');
    return [];
  }

  if (!timeRange || !timeRange.startDate || !timeRange.endDate) {
    console.warn('filterByTimeRange: invalid time range provided');
    return data;
  }

  // Validate date format and order
  const startDate = new Date(timeRange.startDate);
  const endDate = new Date(timeRange.endDate);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    console.warn('filterByTimeRange: invalid date format');
    return data;
  }

  if (startDate > endDate) {
    console.warn('filterByTimeRange: startDate must be before or equal to endDate');
    return [];
  }

  return data.filter((item) => {
    if (!item.date) {
      return false;
    }

    const itemDate = new Date(item.date);
    
    if (isNaN(itemDate.getTime())) {
      return false;
    }

    return itemDate >= startDate && itemDate <= endDate;
  });
}

/**
 * Filters energy data by category
 * @param data - Array of energy data
 * @param category - Category to filter by (e.g., "Academic", "Residential", "Administrative")
 * @returns Filtered array of energy data matching the category
 */
export function filterByCategory(
  data: EnergyData[],
  category: string
): EnergyData[] {
  // Validate inputs
  if (!Array.isArray(data)) {
    console.warn('filterByCategory: data must be an array');
    return [];
  }

  if (!category || typeof category !== 'string') {
    console.warn('filterByCategory: invalid category provided');
    return data;
  }

  const trimmedCategory = category.trim();
  
  if (trimmedCategory === '') {
    return data;
  }

  return data.filter((item) => {
    return item.category === trimmedCategory;
  });
}

/**
 * Filters waste data by waste type
 * @param data - Array of waste data
 * @param wasteType - Waste type to filter by (e.g., "Recyclable", "Compostable", "Landfill")
 * @returns Filtered array of waste data matching the waste type
 */
export function filterByWasteType(
  data: WasteData[],
  wasteType: string
): WasteData[] {
  // Validate inputs
  if (!Array.isArray(data)) {
    console.warn('filterByWasteType: data must be an array');
    return [];
  }

  if (!wasteType || typeof wasteType !== 'string') {
    console.warn('filterByWasteType: invalid waste type provided');
    return data;
  }

  const trimmedWasteType = wasteType.trim();
  
  if (trimmedWasteType === '') {
    return data;
  }

  return data.filter((item) => {
    return item.type === trimmedWasteType;
  });
}
