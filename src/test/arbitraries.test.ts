/**
 * Tests for custom arbitraries
 * Verifies that generators produce valid data structures
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  energyDataArbitrary,
  wasteDataArbitrary,
  climateDataArbitrary,
  timeRangeArbitrary,
  energyDataArrayArbitrary,
  wasteDataArrayArbitrary,
  climateDataArrayArbitrary,
} from './arbitraries';

describe('Custom Arbitraries', () => {
  describe('energyDataArbitrary', () => {
    it('generates valid EnergyData objects', () => {
      fc.assert(
        fc.property(energyDataArbitrary, (data) => {
          // Verify date format (YYYY-MM-DD)
          expect(data.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
          
          // Verify consumption is non-negative
          expect(data.consumption).toBeGreaterThanOrEqual(0);
          
          // Verify category is valid if present
          if (data.category !== undefined) {
            expect(['Academic', 'Residential', 'Administrative']).toContain(
              data.category
            );
          }
        })
      );
    });
  });

  describe('wasteDataArbitrary', () => {
    it('generates valid WasteData objects', () => {
      fc.assert(
        fc.property(wasteDataArbitrary, (data) => {
          // Verify date format
          expect(data.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
          
          // Verify amount is non-negative
          expect(data.amount).toBeGreaterThanOrEqual(0);
          
          // Verify type is valid
          expect(['Recyclable', 'Compostable', 'Landfill']).toContain(data.type);
        })
      );
    });
  });

  describe('climateDataArbitrary', () => {
    it('generates valid ClimateData objects', () => {
      fc.assert(
        fc.property(climateDataArbitrary, (data) => {
          // Verify date format
          expect(data.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
          
          // Verify temperature is in realistic range
          expect(data.temperature).toBeGreaterThanOrEqual(-10);
          expect(data.temperature).toBeLessThanOrEqual(45);
          
          // Verify rainfall is non-negative if present
          if (data.rainfall !== undefined) {
            expect(data.rainfall).toBeGreaterThanOrEqual(0);
          }
        })
      );
    });
  });

  describe('timeRangeArbitrary', () => {
    it('generates valid TimeRange objects with startDate <= endDate', () => {
      fc.assert(
        fc.property(timeRangeArbitrary, (range) => {
          // Verify date formats
          expect(range.startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
          expect(range.endDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
          
          // Verify startDate <= endDate
          expect(range.startDate <= range.endDate).toBe(true);
        })
      );
    });
  });

  describe('array arbitraries', () => {
    it('generates arrays of EnergyData', () => {
      fc.assert(
        fc.property(energyDataArrayArbitrary(1, 10), (dataArray) => {
          expect(Array.isArray(dataArray)).toBe(true);
          expect(dataArray.length).toBeGreaterThanOrEqual(1);
          expect(dataArray.length).toBeLessThanOrEqual(10);
          
          dataArray.forEach((data) => {
            expect(data.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            expect(data.consumption).toBeGreaterThanOrEqual(0);
          });
        })
      );
    });

    it('generates arrays of WasteData', () => {
      fc.assert(
        fc.property(wasteDataArrayArbitrary(1, 10), (dataArray) => {
          expect(Array.isArray(dataArray)).toBe(true);
          expect(dataArray.length).toBeGreaterThanOrEqual(1);
          expect(dataArray.length).toBeLessThanOrEqual(10);
          
          dataArray.forEach((data) => {
            expect(data.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            expect(data.amount).toBeGreaterThanOrEqual(0);
          });
        })
      );
    });

    it('generates arrays of ClimateData', () => {
      fc.assert(
        fc.property(climateDataArrayArbitrary(1, 10), (dataArray) => {
          expect(Array.isArray(dataArray)).toBe(true);
          expect(dataArray.length).toBeGreaterThanOrEqual(1);
          expect(dataArray.length).toBeLessThanOrEqual(10);
          
          dataArray.forEach((data) => {
            expect(data.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            expect(data.temperature).toBeGreaterThanOrEqual(-10);
            expect(data.temperature).toBeLessThanOrEqual(45);
          });
        })
      );
    });
  });
});
