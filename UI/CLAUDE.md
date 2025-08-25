# CLAUDE.md - UI Brand Kit & Design System

This file provides design guidance for the "Daily Tasks" minimalist todo app UI.

## Brand Identity

**Mission**: Making productivity delightful through thoughtful design and playful interactions
**Personality**: minimalist, playful, creative, productive, handcrafted
**Tone**: friendly, encouraging, and slightly whimsical

## Design System

### Color Palette

#### Primary Colors
- `todo-primary`: `hsl(220, 95%, 65%)` - Main brand blue for buttons, accents, focus states
- `todo-accent`: `hsl(45, 90%, 65%)` - Warm yellow for highlights, completed states, decorative elements
- `todo-success`: `hsl(145, 65%, 55%)` - Success green for checkmarks, completed indicators

#### Neutral Colors
- `todo-paper`: `hsl(45, 25%, 98%)` - Off-white paper color for backgrounds, cards
- `todo-ink`: `hsl(222, 20%, 15%)` - Dark ink color for text, borders, icons
- `todo-shadow`: `hsl(222, 84%, 4.9%)` - Deep shadow color for shadows, borders, depth effects

#### Background
- Primary: `hsl(45, 15%, 97%)`
- Gradient: `linear-gradient(to bottom right, hsl(45, 25%, 98%), white, hsl(220, 95%, 65%, 0.05))`

### Typography

#### Font Families
- **Typewriter**: JetBrains Mono (body text, inputs, buttons, code, timestamps)
  - Source: `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&display=swap`
  - Weights: 300, 400, 500, 600
  - Fallback: Courier New, monospace

- **Handwritten**: Caveat (headings, decorative text, playful elements)
  - Source: `https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap`
  - Weights: 400, 500, 600, 700
  - Fallback: cursive

#### Type Scale
- xs: 0.75rem, sm: 0.875rem, base: 1rem, lg: 1.125rem, xl: 1.25rem
- 2xl: 1.5rem, 3xl: 1.875rem, 4xl: 2.25rem, 5xl: 3rem, 6xl: 3.75rem

### Spacing System
- xs: 0.25rem, sm: 0.5rem, md: 0.75rem, lg: 1rem
- xl: 1.5rem, 2xl: 2rem, 3xl: 3rem, 4xl: 4rem

#### Component Spacing
- Card padding: 1rem
- Button padding: 0.75rem 1.5rem
- Input padding: 0.75rem 1rem

### Effects & Shadows

#### Shadow System (3D geometric shadows)
- Card: `4px 4px 0px 0px hsl(222, 84%, 4.9%)`
- Card hover: `8px 8px 0px 0px hsl(222, 84%, 4.9%)`
- Button: `4px 4px 0px 0px hsl(222, 84%, 4.9%)`
- Button hover: `6px 6px 0px 0px hsl(222, 84%, 4.9%)`
- Input: `2px 2px 0px 0px hsl(222, 84%, 4.9%)`
- Input focus: `4px 4px 0px 0px hsl(222, 84%, 4.9%)`

#### Borders
- Width: 2px, Color: `hsl(222, 84%, 4.9%)`, Style: solid, Radius: 0.5rem

#### Transforms
- Card rotation: 0-2deg random rotation for handcrafted feel
- Hover lift: `translate(-4px, -4px)`
- Button press: `translate(2px, 2px)`
- Playful tilt: `rotate(-1deg to 2deg)`

### Animation System

#### Duration
- Quick: 0.2s, Normal: 0.3s, Slow: 0.5s

#### Easing
- Smooth: `cubic-bezier(0.4, 0, 0.2, 1)`
- Bounce: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`
- Ease-out: `ease-out`

#### Key Animations
- Slide-in: opacity 0→1, translateY(-10px)→0, rotate(-1deg)→0
- Fade-out: opacity 1→0, translateX(0)→20px, scale(1)→0.95
- Wiggle: rotate 0deg→-2deg→2deg→0deg
- Blink: opacity 1→0→1 (cursor animation)

## Component Patterns

### Todo Card
- Background: white with 2px solid border
- Box shadow: card shadow system
- Random rotation: 0-2deg for handcrafted feel
- Hover: lift effect with enhanced shadow

### Todo Input
- Font: typewriter (JetBrains Mono)
- Border: 2px solid todo-shadow
- Focus: enhanced shadow with lift effect

### Todo Button  
- Font: typewriter medium weight
- 3D shadow effect with press animation
- Hover: enhanced shadow with lift
- Active: pressed down effect

## Icons
- **Style**: Custom CSS-based icons with consistent stroke weight
- **Usage**: Simple, consistent, meaningful
- **Common icons**: plus (add), check (complete), edit (edit), x (delete), target (filter), archive (all tasks)

## Voice & Messaging
- **Empty state**: "Nothing here yet!"
- **Encouragement**: "Keep going! You're doing great. ✨"
- **Input placeholder**: "What needs to be done?"
- **Progress**: "X/Y tasks completed"

## Responsive Design
- **Mobile-first** approach
- **Breakpoints**: mobile (up to 768px), tablet (768px-1024px), desktop (1024px+)
- **Mobile**: Single column, larger touch targets
- **Desktop**: Full experience with hover effects

## Accessibility
- High contrast ratios for readability
- Keyboard navigation support
- Screen reader friendly markup
- Clear focus indicators with enhanced shadows
- Meaningful alt text for decorative elements

## Implementation Notes
- **CSS Framework**: Custom CSS with Angular-specific styling
- **Font Loading**: Google Fonts with `display: swap`
- **Animations**: CSS keyframes and transitions
- **State Management**: Angular signals with localStorage persistence
- **Pattern**: Subtle grid overlay for paper-like texture