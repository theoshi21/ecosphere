# EcoSphere+ Campus Edition - Theme Guide

## Overview

This document describes the global theme system for the EcoSphere+ Campus Edition dashboard. The theme is implemented using CSS custom properties (CSS variables) to ensure consistency, maintainability, and accessibility across the application.

## Theme File

The main theme file is located at `src/theme.css` and is imported in `src/index.css`. All CSS custom properties are defined in the `:root` selector for global access.

## Design Tokens

### Color Palette

#### Primary Green
- `--color-primary`: #00703D - Main brand color (Buttons)
- `--color-primary-dark`: #005C33 - Darker shade for hover states (Headings)
- `--color-primary-light`: #00663A - Lighter shade (Navbar/Footer)
- `--color-primary-lighter`: #81C784 - Even lighter shade
- `--color-primary-bg`: #E1EFE8 - Background tint (Cards)

#### Secondary Green
- `--color-secondary`: #66BB6A
- `--color-secondary-dark`: #388E3C
- `--color-secondary-light`: #A5D6A7

#### Chart Colors
Six shades of green for data visualizations:
- `--color-chart-1` through `--color-chart-6`

#### Waste Type Colors
- `--color-waste-recyclable`: #4CAF50 (Green)
- `--color-waste-compostable`: #8BC34A (Light Green)
- `--color-waste-landfill`: #9E9E9E (Gray)
- `--color-waste-hazardous`: #F44336 (Red)

#### Status Colors
- `--color-success`: #4CAF50
- `--color-warning`: #FFC107
- `--color-error`: #F44336
- `--color-info`: #2196F3

#### Heat Risk Colors
- Low: `--color-heat-low` (#4CAF50) with `--color-heat-low-bg` (#E8F5E9)
- Moderate: `--color-heat-moderate` (#F57C00) with `--color-heat-moderate-bg` (#FFF3E0)
- High: `--color-heat-high` (#C62828) with `--color-heat-high-bg` (#FFEBEE)

#### Neutral Colors
Text colors with semantic naming:
- `--color-text-primary`: #005C33 - Main text (Headings)
- `--color-text-secondary`: #4F6F5E - Secondary text (Body text)
- `--color-text-tertiary`: #4F6F5E - Tertiary text
- `--color-text-disabled`: #9E9E9E - Disabled state
- `--color-text-white`: #FFFFFF - White text

Background colors:
- `--color-bg-primary`: #E1EFE8 - Main background (Cards)
- `--color-bg-secondary`: #F4F9F6 - Secondary background
- `--color-bg-tertiary`: #F4F9F6 - Tertiary background (Page background)
- `--color-bg-overlay`: rgba(0, 0, 0, 0.1) - Overlay

Border colors:
- `--color-border-light`: #E0E0E0
- `--color-border-medium`: #BDBDBD
- `--color-border-dark`: #9E9E9E

#### Prototype/Disclaimer Colors
- Prototype labels: Hidden (display: none)
- Disclaimers: `--color-disclaimer-bg`, `--color-disclaimer-text`, `--color-disclaimer-border`
- Banners: Hidden (display: none)

### Typography

#### Font Families
- `--font-family-base`: System font stack for optimal performance
- `--font-family-mono`: Monospace font for code

#### Font Sizes
Scale from xs (12px) to 5xl (48px):
- `--font-size-xs`: 0.75rem (12px)
- `--font-size-sm`: 0.875rem (14px)
- `--font-size-base`: 1rem (16px)
- `--font-size-lg`: 1.125rem (18px)
- `--font-size-xl`: 1.25rem (20px)
- `--font-size-2xl`: 1.5rem (24px)
- `--font-size-3xl`: 2rem (32px)
- `--font-size-4xl`: 2.5rem (40px)
- `--font-size-5xl`: 3rem (48px)

#### Font Weights
- `--font-weight-normal`: 400
- `--font-weight-medium`: 500
- `--font-weight-semibold`: 600
- `--font-weight-bold`: 700

#### Line Heights
- `--line-height-tight`: 1.25
- `--line-height-normal`: 1.5
- `--line-height-relaxed`: 1.75

### Spacing

Consistent spacing scale from xs (4px) to 3xl (64px):
- `--spacing-xs`: 0.25rem (4px)
- `--spacing-sm`: 0.5rem (8px)
- `--spacing-md`: 1rem (16px)
- `--spacing-lg`: 1.5rem (24px)
- `--spacing-xl`: 2rem (32px)
- `--spacing-2xl`: 3rem (48px)
- `--spacing-3xl`: 4rem (64px)

### Border Radius
- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 12px
- `--radius-full`: 9999px (for circular elements)

### Shadows
- `--shadow-sm`: Subtle shadow
- `--shadow-md`: Medium shadow (default for cards)
- `--shadow-lg`: Large shadow
- `--shadow-xl`: Extra large shadow

### Transitions
- `--transition-fast`: 0.15s ease
- `--transition-base`: 0.2s ease
- `--transition-slow`: 0.3s ease

### Z-Index Scale
- `--z-index-dropdown`: 10
- `--z-index-sticky`: 100
- `--z-index-modal`: 1000
- `--z-index-tooltip`: 1100

### Layout Constraints
- `--max-width-content`: 1400px - Maximum content width
- `--max-width-text`: 65ch - Maximum text width for readability

### Accessibility
- `--focus-ring-color`: Primary color
- `--focus-ring-width`: 2px
- `--focus-ring-offset`: 2px

## Utility Classes

The theme provides several utility classes for common patterns:

### Module Container
```css
.module
```
Standard module container with padding, background, border-radius, and shadow.

### Module Header
```css
.module-header
```
Flexbox header with space-between layout.

### Labels and Badges
```css
.prototype-label
```
Hidden (display: none) - Prototype/demonstration labels are not displayed.

### Text Blocks
```css
.insight-text
.disclaimer-text
```
Styled text blocks with appropriate backgrounds and borders.

### Summary Cards
```css
.summary-card
.summary-value
```
Cards for displaying metrics and values.

### Chart Sections
```css
.chart-section
```
Container for chart visualizations with consistent spacing.

### Grid Layouts
```css
.grid
.grid-cols-1, .grid-cols-2, .grid-cols-3, .grid-cols-4
.grid-auto-fit
```
Responsive grid layouts with consistent gaps.

## Accessibility Features

### Focus Visible
All interactive elements have visible focus indicators using the `--focus-ring-*` variables.

### Skip to Content
A skip link is available for keyboard navigation (hidden until focused).

### Screen Reader Only
Use `.sr-only` class for screen reader-only content.

### High Contrast Mode
The theme respects `prefers-contrast: high` media query.

### Reduced Motion
The theme respects `prefers-reduced-motion: reduce` media query.

## Responsive Design

### Breakpoints
- Tablet and below: max-width 768px
- Mobile: max-width 480px

### Responsive Behavior
- Font sizes scale down on smaller screens
- Spacing reduces on smaller screens
- Grid columns collapse to single column
- Module padding reduces on mobile

## Usage Guidelines

### Using Theme Variables
Always use CSS custom properties instead of hardcoded values:

```css
/* Good */
.my-component {
  color: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}

/* Bad */
.my-component {
  color: #2E7D32;
  padding: 16px;
  border-radius: 8px;
}
```

### Component-Specific Styles
Component CSS files should only contain styles specific to that component. Common patterns should use the utility classes from theme.css.

### Extending the Theme
If you need to add new design tokens:
1. Add them to `src/theme.css` in the appropriate section
2. Follow the existing naming convention
3. Document them in this guide
4. Use semantic names (e.g., `--color-primary` not `--color-green`)

### Color Contrast
All color combinations meet WCAG AA standards for contrast ratios:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

## Migration from Hardcoded Values

All component CSS files have been updated to use theme variables. If you find any hardcoded values, please replace them with the appropriate theme variable.

## Testing

The theme has been tested with:
- All existing components render correctly
- Build process completes successfully
- All tests pass
- Responsive layouts work on different screen sizes
- Accessibility features function properly

## Future Enhancements

Potential future improvements:
- Dark mode support
- Theme customization API
- Additional color schemes
- CSS-in-JS integration (if needed)
