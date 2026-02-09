import type { WasteData, ClimateData } from '../types';

/**
 * Calculates percentage change between two values
 * @param oldValue - Previous value
 * @param newValue - Current value
 * @returns Percentage change (positive for increase, negative for decrease)
 */
export function calculatePercentageChange(
  oldValue: number,
  newValue: number
): number {
  // Handle division by zero
  if (oldValue === 0) {
    // If old value is 0 and new value is also 0, no change
    if (newValue === 0) {
      return 0;
    }
    // If old value is 0 but new value is not, return 100% increase
    return 100;
  }

  const change = ((newValue - oldValue) / oldValue) * 100;
  return change;
}

/**
 * Estimates carbon footprint from waste data
 * Uses hardcoded conversion factors for different waste types
 * @param wasteData - Array of waste data
 * @returns Estimated carbon footprint in kg CO2e
 */
export function estimateCarbonFootprint(wasteData: WasteData[]): number {
  // Validate input
  if (!Array.isArray(wasteData) || wasteData.length === 0) {
    return 0;
  }

  // Hardcoded conversion factors (kg CO2e per kg of waste)
  const conversionFactors: Record<string, number> = {
    'Landfill': 0.5,      // Landfill waste has higher carbon impact
    'Recyclable': 0.1,    // Recycling reduces carbon footprint
    'Compostable': 0.2,   // Composting has moderate carbon impact
  };

  // Default factor for unknown waste types
  const defaultFactor = 0.3;

  let totalCarbonFootprint = 0;

  for (const waste of wasteData) {
    if (typeof waste.amount !== 'number' || waste.amount < 0) {
      continue;
    }

    const factor = conversionFactors[waste.type] ?? defaultFactor;
    totalCarbonFootprint += waste.amount * factor;
  }

  return totalCarbonFootprint;
}

/**
 * Classifies heat risk based on average temperature
 * @param climateData - Array of climate data
 * @returns Heat risk classification: "Low", "Moderate", or "High"
 */
export function classifyHeatRisk(climateData: ClimateData[]): string {
  // Validate input
  if (!Array.isArray(climateData) || climateData.length === 0) {
    return 'Low';
  }

  // Calculate average temperature
  let totalTemperature = 0;
  let validCount = 0;

  for (const data of climateData) {
    if (typeof data.temperature === 'number' && !isNaN(data.temperature)) {
      totalTemperature += data.temperature;
      validCount++;
    }
  }

  if (validCount === 0) {
    return 'Low';
  }

  const averageTemperature = totalTemperature / validCount;

  // Threshold-based classification
  if (averageTemperature < 25) {
    return 'Low';
  } else if (averageTemperature < 32) {
    return 'Moderate';
  } else {
    return 'High';
  }
}

/**
 * Identifies the dominant waste category from waste data
 * @param wasteData - Array of waste data
 * @returns The waste type with the highest total amount
 */
export function identifyDominantWasteCategory(wasteData: WasteData[]): string {
  // Validate input
  if (!Array.isArray(wasteData) || wasteData.length === 0) {
    return 'Unknown';
  }

  // Aggregate waste amounts by type
  const wasteByType: Record<string, number> = {};

  for (const waste of wasteData) {
    if (typeof waste.amount !== 'number' || waste.amount < 0) {
      continue;
    }

    if (!waste.type || typeof waste.type !== 'string') {
      continue;
    }

    if (!wasteByType[waste.type]) {
      wasteByType[waste.type] = 0;
    }

    wasteByType[waste.type] += waste.amount;
  }

  // Find the type with the maximum amount
  let dominantType = 'Unknown';
  let maxAmount = 0;

  for (const [type, amount] of Object.entries(wasteByType)) {
    if (amount > maxAmount) {
      maxAmount = amount;
      dominantType = type;
    }
  }

  return dominantType;
}

/**
 * Classifies acoustic level based on average decibel level
 * @param acousticData - Array of acoustic data
 * @returns Acoustic level classification: "Low", "Moderate", or "High"
 */
export function classifyAcousticLevel(acousticData: { decibelLevel: number }[]): string {
  // Validate input
  if (!Array.isArray(acousticData) || acousticData.length === 0) {
    return 'Low';
  }

  // Calculate average decibel level
  let totalDecibels = 0;
  let validCount = 0;

  for (const data of acousticData) {
    if (typeof data.decibelLevel === 'number' && !isNaN(data.decibelLevel)) {
      totalDecibels += data.decibelLevel;
      validCount++;
    }
  }

  if (validCount === 0) {
    return 'Low';
  }

  const averageDecibels = totalDecibels / validCount;

  // Threshold-based classification
  if (averageDecibels < 55) {
    return 'Low';
  } else if (averageDecibels < 65) {
    return 'Moderate';
  } else {
    return 'High';
  }
}
