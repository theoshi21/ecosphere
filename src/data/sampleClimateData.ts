import type { ClimateData } from '../types';

/**
 * Sample climate data for 12 months (daily readings)
 * Includes temperature and rainfall variety to demonstrate heat risk classification
 */
export const sampleClimateData: ClimateData[] = [
  // January 2025 - Winter, cooler temperatures
  { date: '2025-01-01', temperature: 8, rainfall: 5 },
  { date: '2025-01-02', temperature: 7, rainfall: 3 },
  { date: '2025-01-03', temperature: 9, rainfall: 0 },
  { date: '2025-01-04', temperature: 10, rainfall: 2 },
  { date: '2025-01-05', temperature: 8, rainfall: 8 },
  { date: '2025-01-06', temperature: 6, rainfall: 10 },
  { date: '2025-01-07', temperature: 7, rainfall: 4 },
  { date: '2025-01-08', temperature: 9, rainfall: 0 },
  { date: '2025-01-09', temperature: 11, rainfall: 1 },
  { date: '2025-01-10', temperature: 10, rainfall: 6 },
  { date: '2025-01-15', temperature: 8, rainfall: 7 },
  { date: '2025-01-20', temperature: 9, rainfall: 3 },
  { date: '2025-01-25', temperature: 10, rainfall: 2 },
  { date: '2025-01-31', temperature: 11, rainfall: 0 },
  
  // February 2025
  { date: '2025-02-01', temperature: 10, rainfall: 4 },
  { date: '2025-02-05', temperature: 12, rainfall: 2 },
  { date: '2025-02-10', temperature: 11, rainfall: 5 },
  { date: '2025-02-15', temperature: 13, rainfall: 1 },
  { date: '2025-02-20', temperature: 14, rainfall: 0 },
  { date: '2025-02-28', temperature: 15, rainfall: 3 },
  
  // March 2025 - Spring warming
  { date: '2025-03-01', temperature: 16, rainfall: 6 },
  { date: '2025-03-05', temperature: 17, rainfall: 4 },
  { date: '2025-03-10', temperature: 18, rainfall: 2 },
  { date: '2025-03-15', temperature: 19, rainfall: 8 },
  { date: '2025-03-20', temperature: 20, rainfall: 5 },
  { date: '2025-03-25', temperature: 21, rainfall: 3 },
  { date: '2025-03-31', temperature: 22, rainfall: 1 },
  
  // April 2025
  { date: '2025-04-01', temperature: 23, rainfall: 7 },
  { date: '2025-04-05', temperature: 24, rainfall: 4 },
  { date: '2025-04-10', temperature: 25, rainfall: 2 },
  { date: '2025-04-15', temperature: 26, rainfall: 0 },
  { date: '2025-04-20', temperature: 27, rainfall: 1 },
  { date: '2025-04-25', temperature: 28, rainfall: 3 },
  { date: '2025-04-30', temperature: 29, rainfall: 0 },
  
  // May 2025 - Warming continues
  { date: '2025-05-01', temperature: 30, rainfall: 2 },
  { date: '2025-05-05', temperature: 31, rainfall: 0 },
  { date: '2025-05-10', temperature: 32, rainfall: 1 },
  { date: '2025-05-15', temperature: 33, rainfall: 0 },
  { date: '2025-05-20', temperature: 34, rainfall: 0 },
  { date: '2025-05-25', temperature: 35, rainfall: 0 },
  { date: '2025-05-31', temperature: 36, rainfall: 0 },
  
  // June 2025 - Summer heat
  { date: '2025-06-01', temperature: 35, rainfall: 0 },
  { date: '2025-06-05', temperature: 34, rainfall: 1 },
  { date: '2025-06-10', temperature: 33, rainfall: 0 },
  { date: '2025-06-15', temperature: 32, rainfall: 2 },
  { date: '2025-06-20', temperature: 31, rainfall: 0 },
  { date: '2025-06-25', temperature: 30, rainfall: 3 },
  { date: '2025-06-30', temperature: 29, rainfall: 1 },
  
  // July 2025 - Peak summer
  { date: '2025-07-01', temperature: 36, rainfall: 0 },
  { date: '2025-07-05', temperature: 37, rainfall: 0 },
  { date: '2025-07-10', temperature: 38, rainfall: 0 },
  { date: '2025-07-15', temperature: 37, rainfall: 0 },
  { date: '2025-07-20', temperature: 36, rainfall: 1 },
  { date: '2025-07-25', temperature: 35, rainfall: 0 },
  { date: '2025-07-31', temperature: 34, rainfall: 2 },
  
  // August 2025
  { date: '2025-08-01', temperature: 33, rainfall: 0 },
  { date: '2025-08-05', temperature: 32, rainfall: 1 },
  { date: '2025-08-10', temperature: 31, rainfall: 0 },
  { date: '2025-08-15', temperature: 30, rainfall: 3 },
  { date: '2025-08-20', temperature: 29, rainfall: 2 },
  { date: '2025-08-25', temperature: 28, rainfall: 4 },
  { date: '2025-08-31', temperature: 27, rainfall: 1 },
  
  // September 2025 - Cooling down
  { date: '2025-09-01', temperature: 26, rainfall: 5 },
  { date: '2025-09-05', temperature: 25, rainfall: 3 },
  { date: '2025-09-10', temperature: 24, rainfall: 6 },
  { date: '2025-09-15', temperature: 23, rainfall: 4 },
  { date: '2025-09-20', temperature: 22, rainfall: 7 },
  { date: '2025-09-25', temperature: 21, rainfall: 2 },
  { date: '2025-09-30', temperature: 20, rainfall: 8 },
  
  // October 2025
  { date: '2025-10-01', temperature: 19, rainfall: 5 },
  { date: '2025-10-05', temperature: 18, rainfall: 6 },
  { date: '2025-10-10', temperature: 17, rainfall: 4 },
  { date: '2025-10-15', temperature: 16, rainfall: 7 },
  { date: '2025-10-20', temperature: 15, rainfall: 3 },
  { date: '2025-10-25', temperature: 14, rainfall: 9 },
  { date: '2025-10-31', temperature: 13, rainfall: 5 },
  
  // November 2025 - Fall cooling
  { date: '2025-11-01', temperature: 12, rainfall: 8 },
  { date: '2025-11-05', temperature: 11, rainfall: 6 },
  { date: '2025-11-10', temperature: 10, rainfall: 10 },
  { date: '2025-11-15', temperature: 9, rainfall: 7 },
  { date: '2025-11-20', temperature: 8, rainfall: 4 },
  { date: '2025-11-25', temperature: 7, rainfall: 9 },
  { date: '2025-11-30', temperature: 6, rainfall: 5 },
  
  // December 2025 - Winter returns
  { date: '2025-12-01', temperature: 5, rainfall: 11 },
  { date: '2025-12-05', temperature: 6, rainfall: 8 },
  { date: '2025-12-10', temperature: 7, rainfall: 6 },
  { date: '2025-12-15', temperature: 8, rainfall: 10 },
  { date: '2025-12-20', temperature: 7, rainfall: 7 },
  { date: '2025-12-25', temperature: 6, rainfall: 12 },
  { date: '2025-12-31', temperature: 5, rainfall: 9 },
];
