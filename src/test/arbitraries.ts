/**
 * Custom arbitraries for property-based testing with fast-check
 * These generators create valid test data for EcoSphere+ data types
 */

import * as fc from 'fast-check';
import type { EnergyData, WasteData, ClimateData, TimeRange } from '../types';

/**
 * Generates a valid ISO 8601 date string (YYYY-MM-DD)
 * Range: 2020-01-01 to 2030-12-31
 */
export const dateArbitrary = fc
  .integer({ min: 2020, max: 2030 })
  .chain((year) =>
    fc
      .integer({ min: 1, max: 12 })
      .chain((month) =>
        fc
          .integer({ min: 1, max: 28 })
          .map(
            (day) =>
              `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          )
      )
  );

/**
 * Generates valid building categories for energy data
 */
export const categoryArbitrary = fc.constantFrom(
  'Academic',
  'Residential',
  'Administrative'
);

/**
 * Generates valid waste types
 */
export const wasteTypeArbitrary = fc.constantFrom(
  'Recyclable',
  'Compostable',
  'Landfill'
);

/**
 * Generates valid EnergyData objects
 * - date: ISO 8601 format (YYYY-MM-DD)
 * - consumption: 0-5000 kWh (realistic campus range)
 * - category: Optional building category
 */
export const energyDataArbitrary: fc.Arbitrary<EnergyData> = fc.record({
  date: dateArbitrary,
  consumption: fc.double({ min: 0, max: 5000, noNaN: true }),
  category: fc.option(categoryArbitrary, { nil: undefined }),
});

/**
 * Generates valid WasteData objects
 * - date: ISO 8601 format (YYYY-MM-DD)
 * - type: One of the valid waste types
 * - amount: 0-1000 kg (realistic campus range)
 */
export const wasteDataArbitrary: fc.Arbitrary<WasteData> = fc.record({
  date: dateArbitrary,
  type: wasteTypeArbitrary,
  amount: fc.double({ min: 0, max: 1000, noNaN: true }),
});

/**
 * Generates valid ClimateData objects
 * - date: ISO 8601 format (YYYY-MM-DD)
 * - temperature: -10 to 45°C (realistic range)
 * - rainfall: Optional, 0-100mm
 */
export const climateDataArbitrary: fc.Arbitrary<ClimateData> = fc.record({
  date: dateArbitrary,
  temperature: fc.double({ min: -10, max: 45, noNaN: true }),
  rainfall: fc.option(fc.double({ min: 0, max: 100, noNaN: true }), {
    nil: undefined,
  }),
});

/**
 * Generates valid TimeRange objects
 * Ensures startDate <= endDate
 */
export const timeRangeArbitrary: fc.Arbitrary<TimeRange> = fc
  .tuple(dateArbitrary, dateArbitrary)
  .map(([date1, date2]) => {
    // Sort dates to ensure startDate <= endDate
    const [startDate, endDate] = date1 <= date2 ? [date1, date2] : [date2, date1];
    return { startDate, endDate };
  });

/**
 * Generates an array of EnergyData with consistent dates
 * Useful for testing time-series operations
 */
export const energyDataArrayArbitrary = (
  minLength = 0,
  maxLength = 100
): fc.Arbitrary<EnergyData[]> =>
  fc.array(energyDataArbitrary, { minLength, maxLength });

/**
 * Generates an array of WasteData with consistent dates
 * Useful for testing aggregation operations
 */
export const wasteDataArrayArbitrary = (
  minLength = 0,
  maxLength = 100
): fc.Arbitrary<WasteData[]> =>
  fc.array(wasteDataArbitrary, { minLength, maxLength });

/**
 * Generates an array of ClimateData with consistent dates
 * Useful for testing climate analysis operations
 */
export const climateDataArrayArbitrary = (
  minLength = 0,
  maxLength = 100
): fc.Arbitrary<ClimateData[]> =>
  fc.array(climateDataArbitrary, { minLength, maxLength });
