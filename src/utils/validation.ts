import type { EnergyData, WasteData, ClimateData, AcousticData } from '../types';

/**
 * Validates if a string is a valid ISO 8601 date format
 */
export function isValidDate(dateString: string): boolean {
  if (!dateString || typeof dateString !== 'string') {
    return false;
  }
  
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

/**
 * Validates if a value is a non-negative number
 */
export function isNonNegative(value: number | undefined): boolean {
  return typeof value === 'number' && !isNaN(value) && value >= 0;
}

/**
 * Validates if a waste type is a non-empty string
 */
export function isValidWasteType(wasteType: string): boolean {
  return typeof wasteType === 'string' && wasteType.length > 0;
}

/**
 * Validates a single energy data entry
 */
export function validateEnergyData(data: EnergyData): boolean {
  if (!data) {
    console.warn('Energy data entry is null or undefined');
    return false;
  }

  if (!isValidDate(data.date)) {
    console.warn(`Invalid date in energy data: ${data.date}`);
    return false;
  }

  if (!isNonNegative(data.consumption)) {
    console.warn(`Invalid consumption value in energy data: ${data.consumption}`);
    return false;
  }

  return true;
}

/**
 * Validates a single waste data entry
 */
export function validateWasteData(data: WasteData): boolean {
  if (!data) {
    console.warn('Waste data entry is null or undefined');
    return false;
  }

  if (!isValidDate(data.date)) {
    console.warn(`Invalid date in waste data: ${data.date}`);
    return false;
  }

  if (!isValidWasteType(data.type)) {
    console.warn(`Invalid waste type in waste data: ${data.type}`);
    return false;
  }

  if (!isNonNegative(data.amount)) {
    console.warn(`Invalid amount value in waste data: ${data.amount}`);
    return false;
  }

  return true;
}

/**
 * Validates a single climate data entry
 */
export function validateClimateData(data: ClimateData): boolean {
  if (!data) {
    console.warn('Climate data entry is null or undefined');
    return false;
  }

  if (!isValidDate(data.date)) {
    console.warn(`Invalid date in climate data: ${data.date}`);
    return false;
  }

  if (typeof data.temperature !== 'number' || isNaN(data.temperature)) {
    console.warn(`Invalid temperature value in climate data: ${data.temperature}`);
    return false;
  }

  // Temperature should be within reasonable range (-50°C to 60°C)
  if (data.temperature < -50 || data.temperature > 60) {
    console.warn(`Temperature out of reasonable range: ${data.temperature}°C`);
    return false;
  }

  if (data.rainfall !== undefined && !isNonNegative(data.rainfall)) {
    console.warn(`Invalid rainfall value in climate data: ${data.rainfall}`);
    return false;
  }

  return true;
}

/**
 * Validates a single acoustic data entry
 */
export function validateAcousticData(data: AcousticData): boolean {
  if (!data) {
    console.warn('Acoustic data entry is null or undefined');
    return false;
  }

  if (!isValidDate(data.date)) {
    console.warn(`Invalid date in acoustic data: ${data.date}`);
    return false;
  }

  if (!isNonNegative(data.decibelLevel)) {
    console.warn(`Invalid decibel value in acoustic data: ${data.decibelLevel}`);
    return false;
  }

  return true;
}

/**
 * Filters out invalid energy data entries
 */
export function filterValidEnergyData(data: EnergyData[]): EnergyData[] {
  if (!Array.isArray(data)) {
    console.warn('Energy data is not an array');
    return [];
  }
  
  return data.filter(validateEnergyData);
}

/**
 * Filters out invalid waste data entries
 */
export function filterValidWasteData(data: WasteData[]): WasteData[] {
  if (!Array.isArray(data)) {
    console.warn('Waste data is not an array');
    return [];
  }
  
  return data.filter(validateWasteData);
}

/**
 * Filters out invalid climate data entries
 */
export function filterValidClimateData(data: ClimateData[]): ClimateData[] {
  if (!Array.isArray(data)) {
    console.warn('Climate data is not an array');
    return [];
  }
  
  return data.filter(validateClimateData);
}

/**
 * Filters out invalid acoustic data entries
 */
export function filterValidAcousticData(data: AcousticData[]): AcousticData[] {
  if (!Array.isArray(data)) {
    console.warn('Acoustic data is not an array');
    return [];
  }
  
  return data.filter(validateAcousticData);
}
