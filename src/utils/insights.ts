import type { EnergyData, WasteData } from '../types';

/**
 * Generates a textual insight about energy consumption trends
 * Compares current period to previous period and describes the change
 * @param currentPeriod - Energy data for the current period
 * @param previousPeriod - Energy data for the previous period
 * @returns Clear, non-technical insight text
 */
export function generateEnergyTrendInsight(
  currentPeriod: EnergyData[],
  previousPeriod: EnergyData[]
): string {
  // Validate input
  if (!Array.isArray(currentPeriod) || !Array.isArray(previousPeriod)) {
    return 'Unable to generate energy trend insight due to invalid data.';
  }

  // Calculate total consumption for each period
  const currentTotal = currentPeriod.reduce(
    (sum, entry) => sum + (entry.consumption || 0),
    0
  );
  const previousTotal = previousPeriod.reduce(
    (sum, entry) => sum + (entry.consumption || 0),
    0
  );

  // Handle edge case: no data in either period
  if (currentTotal === 0 && previousTotal === 0) {
    return 'No energy consumption data available for comparison.';
  }

  // Handle edge case: division by zero
  if (previousTotal === 0) {
    if (currentTotal > 0) {
      return 'Energy consumption has started in the current period.';
    }
    return 'No energy consumption recorded in either period.';
  }

  // Calculate percentage change
  const percentageChange = ((currentTotal - previousTotal) / previousTotal) * 100;

  // Round to 1 decimal place for readability
  const roundedChange = Math.abs(percentageChange).toFixed(1);

  // Generate insight based on change direction
  if (percentageChange > 0) {
    return `Energy consumption increased by ${roundedChange}% compared to the previous period.`;
  } else if (percentageChange < 0) {
    return `Energy consumption decreased by ${roundedChange}% compared to the previous period.`;
  } else {
    return 'Energy consumption remained stable compared to the previous period.';
  }
}

/**
 * Generates a textual insight about waste composition
 * Identifies the dominant waste category and its proportion
 * @param wasteData - Array of waste data
 * @returns Clear, actionable insight text
 */
export function generateWasteCompositionInsight(wasteData: WasteData[]): string {
  // Validate input
  if (!Array.isArray(wasteData) || wasteData.length === 0) {
    return 'No waste data available for analysis.';
  }

  // Aggregate waste amounts by type
  const wasteByType: Record<string, number> = {};
  let totalWaste = 0;

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
    totalWaste += waste.amount;
  }

  // Handle edge case: no valid waste data
  if (totalWaste === 0 || Object.keys(wasteByType).length === 0) {
    return 'No valid waste data available for analysis.';
  }

  // Find the dominant waste type
  let dominantType = '';
  let maxAmount = 0;

  for (const [type, amount] of Object.entries(wasteByType)) {
    if (amount > maxAmount) {
      maxAmount = amount;
      dominantType = type;
    }
  }

  // Calculate percentage of total waste
  const percentage = ((maxAmount / totalWaste) * 100).toFixed(1);

  // Generate insight
  return `The largest waste category is ${dominantType}, representing ${percentage}% of total waste.`;
}
