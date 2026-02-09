import type { AcousticData } from '../types';

/**
 * Sample acoustic data for 12 months (daily readings)
 * Includes variety in decibel levels (40-75 dB) to demonstrate acoustic classification
 */
export const sampleAcousticData: AcousticData[] = [
  // January 2025 - Lower activity during winter break
  { date: '2025-01-01', decibelLevel: 42 },
  { date: '2025-01-02', decibelLevel: 41 },
  { date: '2025-01-03', decibelLevel: 43 },
  { date: '2025-01-04', decibelLevel: 45 },
  { date: '2025-01-05', decibelLevel: 44 },
  { date: '2025-01-06', decibelLevel: 40 },
  { date: '2025-01-07', decibelLevel: 41 },
  { date: '2025-01-08', decibelLevel: 46 },
  { date: '2025-01-09', decibelLevel: 47 },
  { date: '2025-01-10', decibelLevel: 48 },
  { date: '2025-01-15', decibelLevel: 50 },
  { date: '2025-01-20', decibelLevel: 52 },
  { date: '2025-01-25', decibelLevel: 51 },
  { date: '2025-01-31', decibelLevel: 53 },
  
  // February 2025 - Semester begins, activity increases
  { date: '2025-02-01', decibelLevel: 55 },
  { date: '2025-02-05', decibelLevel: 57 },
  { date: '2025-02-10', decibelLevel: 58 },
  { date: '2025-02-15', decibelLevel: 56 },
  { date: '2025-02-20', decibelLevel: 59 },
  { date: '2025-02-28', decibelLevel: 60 },
  
  // March 2025 - Mid-semester activity
  { date: '2025-03-01', decibelLevel: 61 },
  { date: '2025-03-05', decibelLevel: 62 },
  { date: '2025-03-10', decibelLevel: 60 },
  { date: '2025-03-15', decibelLevel: 58 },
  { date: '2025-03-20', decibelLevel: 59 },
  { date: '2025-03-25', decibelLevel: 61 },
  { date: '2025-03-31', decibelLevel: 63 },
  
  // April 2025 - Peak activity with events
  { date: '2025-04-01', decibelLevel: 64 },
  { date: '2025-04-05', decibelLevel: 65 },
  { date: '2025-04-10', decibelLevel: 67 },
  { date: '2025-04-15', decibelLevel: 68 },
  { date: '2025-04-20', decibelLevel: 66 },
  { date: '2025-04-25', decibelLevel: 69 },
  { date: '2025-04-30', decibelLevel: 70 },
  
  // May 2025 - End of semester, high activity
  { date: '2025-05-01', decibelLevel: 71 },
  { date: '2025-05-05', decibelLevel: 72 },
  { date: '2025-05-10', decibelLevel: 73 },
  { date: '2025-05-15', decibelLevel: 75 },
  { date: '2025-05-20', decibelLevel: 74 },
  { date: '2025-05-25', decibelLevel: 72 },
  { date: '2025-05-31', decibelLevel: 70 },
  
  // June 2025 - Summer break begins, activity drops
  { date: '2025-06-01', decibelLevel: 65 },
  { date: '2025-06-05', decibelLevel: 60 },
  { date: '2025-06-10', decibelLevel: 55 },
  { date: '2025-06-15', decibelLevel: 52 },
  { date: '2025-06-20', decibelLevel: 50 },
  { date: '2025-06-25', decibelLevel: 48 },
  { date: '2025-06-30', decibelLevel: 46 },
  
  // July 2025 - Summer programs, moderate activity
  { date: '2025-07-01', decibelLevel: 54 },
  { date: '2025-07-05', decibelLevel: 56 },
  { date: '2025-07-10', decibelLevel: 58 },
  { date: '2025-07-15', decibelLevel: 57 },
  { date: '2025-07-20', decibelLevel: 55 },
  { date: '2025-07-25', decibelLevel: 53 },
  { date: '2025-07-31', decibelLevel: 52 },
  
  // August 2025 - Preparing for fall semester
  { date: '2025-08-01', decibelLevel: 50 },
  { date: '2025-08-05', decibelLevel: 51 },
  { date: '2025-08-10', decibelLevel: 53 },
  { date: '2025-08-15', decibelLevel: 56 },
  { date: '2025-08-20', decibelLevel: 58 },
  { date: '2025-08-25', decibelLevel: 60 },
  { date: '2025-08-31', decibelLevel: 62 },
  
  // September 2025 - Fall semester begins
  { date: '2025-09-01', decibelLevel: 64 },
  { date: '2025-09-05', decibelLevel: 66 },
  { date: '2025-09-10', decibelLevel: 68 },
  { date: '2025-09-15', decibelLevel: 67 },
  { date: '2025-09-20', decibelLevel: 65 },
  { date: '2025-09-25', decibelLevel: 66 },
  { date: '2025-09-30', decibelLevel: 68 },
  
  // October 2025 - Mid-semester activity
  { date: '2025-10-01', decibelLevel: 69 },
  { date: '2025-10-05', decibelLevel: 70 },
  { date: '2025-10-10', decibelLevel: 71 },
  { date: '2025-10-15', decibelLevel: 69 },
  { date: '2025-10-20', decibelLevel: 68 },
  { date: '2025-10-25', decibelLevel: 67 },
  { date: '2025-10-31', decibelLevel: 66 },
  
  // November 2025 - End of semester approaching
  { date: '2025-11-01', decibelLevel: 65 },
  { date: '2025-11-05', decibelLevel: 64 },
  { date: '2025-11-10', decibelLevel: 63 },
  { date: '2025-11-15', decibelLevel: 62 },
  { date: '2025-11-20', decibelLevel: 60 },
  { date: '2025-11-25', decibelLevel: 55 },
  { date: '2025-11-30', decibelLevel: 52 },
  
  // December 2025 - Finals and winter break
  { date: '2025-12-01', decibelLevel: 58 },
  { date: '2025-12-05', decibelLevel: 60 },
  { date: '2025-12-10', decibelLevel: 62 },
  { date: '2025-12-15', decibelLevel: 56 },
  { date: '2025-12-20', decibelLevel: 48 },
  { date: '2025-12-25', decibelLevel: 42 },
  { date: '2025-12-31', decibelLevel: 40 },
];
