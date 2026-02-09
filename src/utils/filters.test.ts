import { describe, it, expect } from 'vitest';
import { filterByTimeRange, filterByCategory, filterByWasteType } from './filters';
import type { EnergyData, WasteData } from '../types';

describe('filterByTimeRange', () => {
  it('filters data within time range', () => {
    const data = [
      { date: '2025-01-01', value: 1 },
      { date: '2025-01-15', value: 2 },
      { date: '2025-02-01', value: 3 },
    ];

    const result = filterByTimeRange(data, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
    });

    expect(result).toHaveLength(2);
    expect(result[0].date).toBe('2025-01-01');
    expect(result[1].date).toBe('2025-01-15');
  });

  it('returns empty array for invalid data input', () => {
    const result = filterByTimeRange(null as any, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
    });

    expect(result).toEqual([]);
  });

  it('returns original data for invalid time range', () => {
    const data = [{ date: '2025-01-01', value: 1 }];
    const result = filterByTimeRange(data, null as any);

    expect(result).toEqual(data);
  });

  it('returns empty array when startDate is after endDate', () => {
    const data = [{ date: '2025-01-15', value: 1 }];
    const result = filterByTimeRange(data, {
      startDate: '2025-02-01',
      endDate: '2025-01-01',
    });

    expect(result).toEqual([]);
  });

  it('filters out items with invalid dates', () => {
    const data = [
      { date: '2025-01-01', value: 1 },
      { date: 'invalid-date', value: 2 },
      { date: '2025-01-15', value: 3 },
    ];

    const result = filterByTimeRange(data, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
    });

    expect(result).toHaveLength(2);
  });
});

describe('filterByCategory', () => {
  it('filters energy data by category', () => {
    const data: EnergyData[] = [
      { date: '2025-01-01', consumption: 100, category: 'Academic' },
      { date: '2025-01-02', consumption: 200, category: 'Residential' },
      { date: '2025-01-03', consumption: 150, category: 'Academic' },
    ];

    const result = filterByCategory(data, 'Academic');

    expect(result).toHaveLength(2);
    expect(result[0].category).toBe('Academic');
    expect(result[1].category).toBe('Academic');
  });

  it('returns empty array for invalid data input', () => {
    const result = filterByCategory(null as any, 'Academic');

    expect(result).toEqual([]);
  });

  it('returns original data for invalid category', () => {
    const data: EnergyData[] = [
      { date: '2025-01-01', consumption: 100, category: 'Academic' },
    ];
    const result = filterByCategory(data, null as any);

    expect(result).toEqual(data);
  });

  it('returns original data for empty category string', () => {
    const data: EnergyData[] = [
      { date: '2025-01-01', consumption: 100, category: 'Academic' },
    ];
    const result = filterByCategory(data, '   ');

    expect(result).toEqual(data);
  });

  it('trims whitespace from category', () => {
    const data: EnergyData[] = [
      { date: '2025-01-01', consumption: 100, category: 'Academic' },
    ];
    const result = filterByCategory(data, '  Academic  ');

    expect(result).toHaveLength(1);
  });
});

describe('filterByWasteType', () => {
  it('filters waste data by type', () => {
    const data: WasteData[] = [
      { date: '2025-01-01', type: 'Recyclable', amount: 100 },
      { date: '2025-01-01', type: 'Compostable', amount: 200 },
      { date: '2025-01-01', type: 'Recyclable', amount: 150 },
    ];

    const result = filterByWasteType(data, 'Recyclable');

    expect(result).toHaveLength(2);
    expect(result[0].type).toBe('Recyclable');
    expect(result[1].type).toBe('Recyclable');
  });

  it('returns empty array for invalid data input', () => {
    const result = filterByWasteType(null as any, 'Recyclable');

    expect(result).toEqual([]);
  });

  it('returns original data for invalid waste type', () => {
    const data: WasteData[] = [
      { date: '2025-01-01', type: 'Recyclable', amount: 100 },
    ];
    const result = filterByWasteType(data, null as any);

    expect(result).toEqual(data);
  });

  it('returns original data for empty waste type string', () => {
    const data: WasteData[] = [
      { date: '2025-01-01', type: 'Recyclable', amount: 100 },
    ];
    const result = filterByWasteType(data, '   ');

    expect(result).toEqual(data);
  });

  it('trims whitespace from waste type', () => {
    const data: WasteData[] = [
      { date: '2025-01-01', type: 'Recyclable', amount: 100 },
    ];
    const result = filterByWasteType(data, '  Recyclable  ');

    expect(result).toHaveLength(1);
  });
});
