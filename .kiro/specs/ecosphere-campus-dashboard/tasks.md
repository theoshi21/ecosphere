# Implementation Plan: EcoSphere+ Campus Edition

## Overview

This implementation plan breaks down the EcoSphere+ Campus Edition dashboard into discrete, incremental coding tasks. The approach follows a bottom-up strategy: starting with the data layer, building reusable components, then composing them into pages. Each task builds on previous work, with checkpoints to ensure stability before proceeding.

The implementation uses React 18 with TypeScript, Recharts for visualizations, and Vite as the build tool. All code prioritizes clarity and stability over complexity.

## Tasks

- [x] 1. Project setup and configuration
  - Initialize Vite + React + TypeScript project
  - Install dependencies: recharts, react-router-dom
  - Configure TypeScript with strict mode
  - Set up Vitest and React Testing Library
  - Install fast-check for property-based testing
  - Create basic project structure (src/components, src/data, src/pages, src/utils)
  - _Requirements: 15.1, 15.4, 16.1_

- [x] 2. Define data types and sample data
  - [x] 2.1 Create TypeScript interfaces for all data types
    - Define EnergyData, WasteData, ClimateData, AcousticData interfaces
    - Define TimeRange, FilterState, SummaryMetrics interfaces
    - Add JSDoc comments explaining each field
    - _Requirements: Data Model Specifications_

  - [x] 2.2 Create sample data files
    - Generate 12 months of sample energy data (daily readings)
    - Generate 12 months of sample waste data (monthly readings)
    - Generate 12 months of sample climate data (daily readings)
    - Ensure data variety demonstrates all visualization capabilities
    - Include building categories in energy data
    - _Requirements: 14.1, 14.3_

  - [ ]* 2.3 Write property tests for data validation
    - **Property 30: Date Format Validation**
    - **Validates: Requirements Data Model**
    - **Property 31: Non-Negative Value Validation**
    - **Validates: Requirements Data Model**
    - **Property 32: Waste Type Validation**
    - **Validates: Requirements Data Model**
    - **Property 33: Time Range Validity**
    - **Validates: Requirements Data Model**

- [x] 3. Implement data filtering functions
  - [x] 3.1 Create pure filtering functions
    - Implement filterByTimeRange function
    - Implement filterByCategory function
    - Implement filterByWasteType function
    - Add error handling for invalid inputs
    - _Requirements: 9.2, 3.4, 10.3_

  - [ ]* 3.2 Write property tests for filtering
    - **Property 1: Time Range Filtering Correctness**
    - **Validates: Requirements 9.2**
    - **Property 2: Category Filtering Correctness**
    - **Validates: Requirements 3.4, 10.3**
    - **Property 3: Filter Clearing Restores Original Data**
    - **Validates: Requirements 10.4**

  - [ ]* 3.3 Write unit tests for filtering edge cases
    - Test empty data arrays
    - Test filters with no matching results
    - Test boundary date values
    - _Requirements: 9.4, 16.2_

- [x] 4. Implement calculation utilities
  - [x] 4.1 Create calculation functions
    - Implement calculatePercentageChange function (handle division by zero)
    - Implement estimateCarbonFootprint function with hardcoded conversion factors
    - Implement classifyHeatRisk function with threshold logic
    - Implement identifyDominantWasteCategory function
    - _Requirements: 2.1, 5.1, 7.1, 4.1_

  - [ ]* 4.2 Write property tests for calculations
    - **Property 5: Energy Trend Percentage Calculation**
    - **Validates: Requirements 2.1**
    - **Property 6: Carbon Footprint Calculation**
    - **Validates: Requirements 5.1**
    - **Property 7: Heat Risk Classification**
    - **Validates: Requirements 7.1**
    - **Property 8: Dominant Waste Category Identification**
    - **Validates: Requirements 4.1**

  - [ ]* 4.3 Write unit tests for calculation edge cases
    - Test division by zero in percentage change
    - Test empty waste data for carbon calculation
    - Test boundary temperatures (25°C, 32°C) for heat risk
    - Test single waste type for dominant category
    - _Requirements: Edge Cases 2, 3, 4_

- [x] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement insight generation functions
  - [x] 6.1 Create insight generator functions
    - Implement generateEnergyTrendInsight function
    - Implement generateWasteCompositionInsight function
    - Add clear, non-technical language for all insights
    - _Requirements: 2.2, 2.3, 4.2_

  - [ ]* 6.2 Write property tests for insight generation
    - **Property 9: Energy Increase Insight**
    - **Validates: Requirements 2.2**
    - **Property 10: Energy Decrease Insight**
    - **Validates: Requirements 2.3**
    - **Property 11: Waste Composition Insight**
    - **Validates: Requirements 4.2**

  - [ ]* 6.3 Write unit tests for insight text content
    - Test that increase insights contain "increase" or "increased"
    - Test that decrease insights contain "decrease" or "decreased"
    - Test that waste insights contain dominant category name
    - _Requirements: 2.2, 2.3, 4.2_

- [x] 7. Create custom arbitraries for property testing
  - Create energyDataArbitrary generator
  - Create wasteDataArbitrary generator
  - Create climateDataArbitrary generator
  - Create timeRangeArbitrary generator
  - Store in test/arbitraries.ts for reuse
  - _Requirements: Testing Strategy_

- [x] 8. Implement Chart_Renderer components
  - [x] 8.1 Create LineChart component wrapper
    - Wrap Recharts LineChart with consistent styling
    - Add ResponsiveContainer for responsiveness
    - Configure tooltip with custom formatter
    - Use green color palette
    - _Requirements: 1.1, 6.2, 11.3_

  - [x] 8.2 Create BarChart component wrapper
    - Wrap Recharts BarChart with consistent styling
    - Add ResponsiveContainer for responsiveness
    - Configure tooltip with custom formatter
    - Use appropriate colors for data type
    - _Requirements: 1.2, 3.2, 6.3_

  - [x] 8.3 Create PieChart component wrapper
    - Wrap Recharts PieChart with consistent styling
    - Add ResponsiveContainer for responsiveness
    - Configure tooltip with custom formatter
    - Use color palette for waste types
    - _Requirements: 3.2_

  - [ ]* 8.4 Write property tests for chart rendering
    - **Property 12: Required Chart Components Present**
    - **Validates: Requirements 1.1, 1.2, 3.2, 6.2, 6.3**
    - **Property 13: Tooltip Content Completeness**
    - **Validates: Requirements 1.3, 11.1, 11.2**

  - [ ]* 8.5 Write unit tests for chart components
    - Test charts render without errors for valid data
    - Test charts handle empty data gracefully
    - Test tooltip displays on hover
    - _Requirements: 1.3, 11.1, 11.2, 16.2_

- [x] 9. Implement Filter_Component
  - [x] 9.1 Create filter UI component
    - Create month dropdown selector
    - Create year dropdown selector
    - Create category dropdown (conditional rendering)
    - Add "Clear Filters" button
    - Implement controlled component pattern
    - _Requirements: 9.1, 10.1, 10.2_

  - [x] 9.2 Implement filter state management
    - Create React Context for filter state
    - Implement state persistence across page navigation
    - Add validation for startDate <= endDate
    - _Requirements: 9.3_

  - [ ]* 9.3 Write property tests for filter state
    - **Property 4: Filter State Persistence**
    - **Validates: Requirements 9.3**
    - **Property 24: Conditional Category Filter Display**
    - **Validates: Requirements 10.2**

  - [ ]* 9.4 Write unit tests for filter component
    - Test filter controls render correctly
    - Test user interactions update state
    - Test clear button resets filters
    - Test empty results display message
    - _Requirements: 9.1, 10.1, 10.4, Edge Case 1_

- [x] 10. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Implement Energy_Module component
  - [x] 11.1 Create Energy_Module component
    - Compose LineChart for energy over time
    - Compose BarChart for monthly comparison
    - Display insight text from generateEnergyTrendInsight
    - Add "Prototype / Demonstration Data" label
    - Support optional category field
    - _Requirements: 1.1, 1.2, 1.4, 1.5, 2.2, 2.3_

  - [ ]* 11.2 Write property tests for Energy_Module
    - **Property 14: Required Data Fields Present**
    - **Validates: Requirements 3.1, 6.1**
    - **Property 16: Prototype Disclaimer Presence**
    - **Validates: Requirements 1.5, 3.5, 5.4, 6.5, 14.2**
    - **Property 23: Optional Category Support**
    - **Validates: Requirements 1.4**

  - [ ]* 11.3 Write unit tests for Energy_Module
    - Test module renders with valid data
    - Test module handles empty data
    - Test insight text appears correctly
    - Test disclaimer label is present
    - _Requirements: 1.1, 1.2, 1.5, 16.2_

- [x] 12. Implement Waste_Module component
  - [x] 12.1 Create Waste_Module component
    - Compose PieChart for waste composition
    - Display total waste summary card
    - Display insight text from generateWasteCompositionInsight
    - Add "Prototype / Demonstration Data" label
    - _Requirements: 3.1, 3.2, 3.3, 3.5, 4.2_

  - [ ]* 12.2 Write property tests for Waste_Module
    - **Property 15: Summary Metrics Display**
    - **Validates: Requirements 3.3**
    - **Property 16: Prototype Disclaimer Presence** (if not already tested)
    - **Validates: Requirements 3.5**

  - [ ]* 12.3 Write unit tests for Waste_Module
    - Test module renders with valid data
    - Test total waste calculation is correct
    - Test insight text appears correctly
    - Test disclaimer label is present
    - _Requirements: 3.2, 3.3, 3.5_

- [x] 13. Implement Carbon_Estimator component
  - [x] 13.1 Create Carbon_Estimator display component
    - Display carbon footprint value with unit formatting
    - Add "Estimated carbon footprint (for awareness purposes only)" disclaimer
    - Add "Prototype / Demonstration Data" label
    - Format units: kg CO2e for < 1000, tonnes CO2e for >= 1000
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [ ]* 13.2 Write property tests for Carbon_Estimator
    - **Property 17: Carbon Footprint Disclaimer**
    - **Validates: Requirements 5.2**
    - **Property 19: Carbon Unit Display**
    - **Validates: Requirements 5.3**

  - [ ]* 13.3 Write unit tests for Carbon_Estimator
    - Test unit formatting for values < 1000
    - Test unit formatting for values >= 1000
    - Test disclaimers are present
    - _Requirements: 5.2, 5.3, 5.4_

- [x] 14. Implement Climate_Module component
  - [x] 14.1 Create Climate_Module component
    - Compose LineChart for temperature trends
    - Compose BarChart for rainfall (optional)
    - Display heat risk classification
    - Add "Climate indicators are for awareness and planning support, not prediction" disclaimer
    - Add "Prototype / Demonstration Data" label
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.4_

  - [ ]* 14.2 Write property tests for Climate_Module
    - **Property 18: Climate Disclaimer Presence**
    - **Validates: Requirements 6.4, 7.4**
    - **Property 20: Heat Risk Label Validity**
    - **Validates: Requirements 7.2**

  - [ ]* 14.3 Write unit tests for Climate_Module
    - Test module renders with valid data
    - Test heat risk classification displays correctly
    - Test disclaimers are present
    - _Requirements: 6.2, 6.4, 7.2_

- [x] 15. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 16. Implement page components
  - [x] 16.1 Create Overview Dashboard page
    - Create summary cards for energy, waste, carbon, heat risk
    - Create combined trend visualization
    - Add prominent "Prototype Dashboard – Demonstration Use Only" label
    - Calculate summary metrics from all data
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 16.2 Create Energy Analysis page
    - Compose Filter_Component with time range and category filters
    - Compose Energy_Module with filtered data
    - Add page title and navigation
    - _Requirements: 1.1, 1.2, 9.1, 10.2_

  - [x] 16.3 Create Waste & Carbon Analysis page
    - Compose Filter_Component with time range and waste type filters
    - Compose Waste_Module with filtered data
    - Compose Carbon_Estimator with filtered data
    - Add page title and navigation
    - _Requirements: 3.1, 3.2, 5.1, 9.1, 10.1_

  - [x] 16.4 Create Climate Awareness page
    - Compose Filter_Component with time range filter
    - Compose Climate_Module with filtered data
    - Add page title and navigation
    - _Requirements: 6.1, 6.2, 9.1_

  - [ ]* 16.5 Write example tests for page structure
    - **Example 1: Overview Dashboard Structure**
    - **Validates: Requirements 8.1, 8.2**
    - **Example 2: Overview Disclaimer**
    - **Validates: Requirements 8.3**
    - **Example 3: Filter Controls Present**
    - **Validates: Requirements 9.1**
    - **Example 4: Waste Type Filter Present**
    - **Validates: Requirements 10.1**

- [x] 17. Implement navigation and routing
  - [x] 17.1 Create navigation header component
    - Create header with app title and logo
    - Create navigation links to all four pages
    - Highlight active page in navigation
    - Ensure consistent styling across pages
    - _Requirements: 18.1, 18.2, 18.3, 18.4_

  - [x] 17.2 Set up React Router
    - Configure routes for all four pages
    - Set Overview as default route
    - Add 404 fallback route
    - _Requirements: 18.1_

  - [ ]* 17.3 Write property tests for navigation
    - **Property 21: Navigation Consistency**
    - **Validates: Requirements 18.2**
    - **Property 22: Active Page Indication**
    - **Validates: Requirements 18.3**

  - [ ]* 17.4 Write example tests for navigation structure
    - **Example 5: Navigation Structure**
    - **Validates: Requirements 18.1, 18.4**

- [x] 18. Implement global styling and theme
  - Create CSS modules for components
  - Define color palette (primary green, secondary green, chart colors)
  - Set up typography (font sizes, weights)
  - Implement responsive grid layout
  - Add accessibility features (contrast ratios, focus states)
  - _Requirements: 12.1, 12.2, 13.1, 13.2_

- [x] 19. Implement error handling
  - [x] 19.1 Add error boundaries
    - Create ChartErrorBoundary component
    - Create PageErrorBoundary component
    - Add fallback UI for errors
    - _Requirements: 16.2_

  - [x] 19.2 Add data validation
    - Implement validation functions for all data types
    - Add console warnings for invalid data
    - Filter out invalid entries gracefully
    - _Requirements: 16.2_

  - [x] 19.3 Add empty state handling
    - Create EmptyState component
    - Display "No data available" messages
    - Handle empty filter results
    - _Requirements: 9.4, 16.2_

  - [ ]* 19.4 Write property tests for error handling
    - **Property 28: Empty Data Handling**
    - **Validates: Requirements 9.4, 16.2**
    - **Property 29: Missing Field Handling**
    - **Validates: Requirements 16.2**

- [x] 20. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 21. Optional: Implement acoustic awareness feature
  - [x] 21.1 Create sample acoustic data
    - Generate 12 months of sample acoustic data (daily readings)
    - Include variety in decibel levels (40-75 dB)
    - _Requirements: 19.1_

  - [x] 21.2 Create acoustic classification function
    - Implement classifyAcousticLevel function (Low, Moderate, High)
    - Use threshold-based logic
    - _Requirements: 19.2_

  - [x] 21.3 Add acoustic display to Climate page
    - Display average decibel level
    - Display qualitative classification
    - Add "Prototype Acoustic Data" label
    - Add demonstration disclaimer
    - _Requirements: 19.1, 19.2, 19.4_

  - [ ]* 21.4 Write property tests for acoustic feature
    - **Property 25: Acoustic Data Display**
    - **Validates: Requirements 19.1**
    - **Property 26: Acoustic Classification**
    - **Validates: Requirements 19.2**
    - **Property 27: Acoustic Disclaimer**
    - **Validates: Requirements 19.4**

  - [ ]* 21.5 Write example test for no audio capture
    - **Example 11: No Audio Capture**
    - **Validates: Requirements 19.3**

- [x] 22. Verify terminology compliance
  - [ ]* 22.1 Write example tests for terminology
    - **Example 9: Terminology Compliance - Required Terms**
    - **Validates: Requirements 17.1**
    - **Example 10: Terminology Compliance - Prohibited Terms**
    - **Validates: Requirements 17.2**

  - [x] 22.2 Manual review of all user-facing text
    - Search codebase for prohibited terms
    - Verify required terms are present
    - Check all disclaimers are in place
    - _Requirements: 17.1, 17.2, 17.3_

- [x] 23. Verify no external dependencies
  - [ ]* 23.1 Write example tests for local execution
    - **Example 6: Sample Data Availability**
    - **Validates: Requirements 14.1**
    - **Example 7: No Data Modification UI**
    - **Validates: Requirements 14.4**
    - **Example 8: No External API Calls**
    - **Validates: Requirements 15.2**

  - [x] 23.2 Manual code review
    - Search for fetch() or XMLHttpRequest calls
    - Verify all data is bundled locally
    - Verify no upload/edit UI elements exist
    - _Requirements: 14.4, 15.2_

- [x] 24. Final integration testing
  - Test complete user flows through all pages
  - Test filter state persistence across navigation
  - Test all visualizations render correctly
  - Test error handling with edge cases
  - Verify all disclaimers are visible
  - Test responsive layout on different screen sizes
  - _Requirements: All_

- [x] 25. Final checkpoint - Ensure all tests pass
  - Run full test suite with coverage report
  - Verify minimum coverage thresholds met (80% line, 75% branch, 85% function)
  - Verify all property tests run with 100+ iterations
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Task 21 (acoustic awareness) is entirely optional and can be skipped
- The implementation prioritizes stability and clarity over complexity
