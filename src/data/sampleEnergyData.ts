import type { EnergyData } from '../types';

/**
 * Sample energy consumption data for 12 months (daily readings)
 * Includes variety in consumption patterns and building categories
 */
export const sampleEnergyData: EnergyData[] = [
  // January 2025 - Winter, higher consumption
  { date: '2025-01-01', consumption: 1250, category: 'Academic' },
  { date: '2025-01-02', consumption: 1180, category: 'Academic' },
  { date: '2025-01-03', consumption: 1220, category: 'Residential' },
  { date: '2025-01-04', consumption: 1300, category: 'Residential' },
  { date: '2025-01-05', consumption: 1150, category: 'Administrative' },
  { date: '2025-01-06', consumption: 1280, category: 'Academic' },
  { date: '2025-01-07', consumption: 1190, category: 'Residential' },
  { date: '2025-01-08', consumption: 1240, category: 'Academic' },
  { date: '2025-01-09', consumption: 1210, category: 'Administrative' },
  { date: '2025-01-10', consumption: 1260, category: 'Residential' },
  { date: '2025-01-15', consumption: 1230, category: 'Academic' },
  { date: '2025-01-20', consumption: 1270, category: 'Residential' },
  { date: '2025-01-25', consumption: 1200, category: 'Administrative' },
  { date: '2025-01-31', consumption: 1240, category: 'Academic' },
  
  // February 2025
  { date: '2025-02-01', consumption: 1220, category: 'Academic' },
  { date: '2025-02-05', consumption: 1190, category: 'Residential' },
  { date: '2025-02-10', consumption: 1210, category: 'Administrative' },
  { date: '2025-02-15', consumption: 1180, category: 'Academic' },
  { date: '2025-02-20', consumption: 1200, category: 'Residential' },
  { date: '2025-02-28', consumption: 1170, category: 'Academic' },
  
  // March 2025 - Spring, decreasing consumption
  { date: '2025-03-01', consumption: 1150, category: 'Academic' },
  { date: '2025-03-05', consumption: 1120, category: 'Residential' },
  { date: '2025-03-10', consumption: 1100, category: 'Administrative' },
  { date: '2025-03-15', consumption: 1080, category: 'Academic' },
  { date: '2025-03-20', consumption: 1060, category: 'Residential' },
  { date: '2025-03-25', consumption: 1040, category: 'Academic' },
  { date: '2025-03-31', consumption: 1020, category: 'Administrative' },
  
  // April 2025
  { date: '2025-04-01', consumption: 1000, category: 'Academic' },
  { date: '2025-04-05', consumption: 980, category: 'Residential' },
  { date: '2025-04-10', consumption: 960, category: 'Administrative' },
  { date: '2025-04-15', consumption: 940, category: 'Academic' },
  { date: '2025-04-20', consumption: 920, category: 'Residential' },
  { date: '2025-04-25', consumption: 900, category: 'Academic' },
  { date: '2025-04-30', consumption: 880, category: 'Administrative' },
  
  // May 2025 - Lower consumption
  { date: '2025-05-01', consumption: 860, category: 'Academic' },
  { date: '2025-05-05', consumption: 840, category: 'Residential' },
  { date: '2025-05-10', consumption: 820, category: 'Administrative' },
  { date: '2025-05-15', consumption: 800, category: 'Academic' },
  { date: '2025-05-20', consumption: 780, category: 'Residential' },
  { date: '2025-05-25', consumption: 760, category: 'Academic' },
  { date: '2025-05-31', consumption: 740, category: 'Administrative' },
  
  // June 2025 - Summer, AC usage increases
  { date: '2025-06-01', consumption: 850, category: 'Academic' },
  { date: '2025-06-05', consumption: 870, category: 'Residential' },
  { date: '2025-06-10', consumption: 890, category: 'Administrative' },
  { date: '2025-06-15', consumption: 910, category: 'Academic' },
  { date: '2025-06-20', consumption: 930, category: 'Residential' },
  { date: '2025-06-25', consumption: 950, category: 'Academic' },
  { date: '2025-06-30', consumption: 970, category: 'Administrative' },
  
  // July 2025 - Peak summer
  { date: '2025-07-01', consumption: 1100, category: 'Academic' },
  { date: '2025-07-05', consumption: 1120, category: 'Residential' },
  { date: '2025-07-10', consumption: 1140, category: 'Administrative' },
  { date: '2025-07-15', consumption: 1160, category: 'Academic' },
  { date: '2025-07-20', consumption: 1180, category: 'Residential' },
  { date: '2025-07-25', consumption: 1200, category: 'Academic' },
  { date: '2025-07-31', consumption: 1220, category: 'Administrative' },
  
  // August 2025
  { date: '2025-08-01', consumption: 1190, category: 'Academic' },
  { date: '2025-08-05', consumption: 1170, category: 'Residential' },
  { date: '2025-08-10', consumption: 1150, category: 'Administrative' },
  { date: '2025-08-15', consumption: 1130, category: 'Academic' },
  { date: '2025-08-20', consumption: 1110, category: 'Residential' },
  { date: '2025-08-25', consumption: 1090, category: 'Academic' },
  { date: '2025-08-31', consumption: 1070, category: 'Administrative' },
  
  // September 2025 - Fall, decreasing
  { date: '2025-09-01', consumption: 1050, category: 'Academic' },
  { date: '2025-09-05', consumption: 1030, category: 'Residential' },
  { date: '2025-09-10', consumption: 1010, category: 'Administrative' },
  { date: '2025-09-15', consumption: 990, category: 'Academic' },
  { date: '2025-09-20', consumption: 970, category: 'Residential' },
  { date: '2025-09-25', consumption: 950, category: 'Academic' },
  { date: '2025-09-30', consumption: 930, category: 'Administrative' },
  
  // October 2025
  { date: '2025-10-01', consumption: 910, category: 'Academic' },
  { date: '2025-10-05', consumption: 930, category: 'Residential' },
  { date: '2025-10-10', consumption: 950, category: 'Administrative' },
  { date: '2025-10-15', consumption: 970, category: 'Academic' },
  { date: '2025-10-20', consumption: 990, category: 'Residential' },
  { date: '2025-10-25', consumption: 1010, category: 'Academic' },
  { date: '2025-10-31', consumption: 1030, category: 'Administrative' },
  
  // November 2025 - Heating season begins
  { date: '2025-11-01', consumption: 1050, category: 'Academic' },
  { date: '2025-11-05', consumption: 1080, category: 'Residential' },
  { date: '2025-11-10', consumption: 1110, category: 'Administrative' },
  { date: '2025-11-15', consumption: 1140, category: 'Academic' },
  { date: '2025-11-20', consumption: 1170, category: 'Residential' },
  { date: '2025-11-25', consumption: 1200, category: 'Academic' },
  { date: '2025-11-30', consumption: 1230, category: 'Administrative' },
  
  // December 2025 - Peak winter
  { date: '2025-12-01', consumption: 1260, category: 'Academic' },
  { date: '2025-12-05', consumption: 1280, category: 'Residential' },
  { date: '2025-12-10', consumption: 1300, category: 'Administrative' },
  { date: '2025-12-15', consumption: 1320, category: 'Academic' },
  { date: '2025-12-20', consumption: 1340, category: 'Residential' },
  { date: '2025-12-25', consumption: 1200, category: 'Academic' },
  { date: '2025-12-31', consumption: 1180, category: 'Administrative' },
];
