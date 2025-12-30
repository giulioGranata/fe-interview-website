# User Dashboard - Frontend Interview Project

A responsive, accessible, and type-safe React application developed as a coding challenge. The application allows searching, filtering, and viewing details of users fetched from a dummy API.

## 🚀 Features

- **Search Functionality**: Real-time filtering by user name or email.
- **Role Filtering**: Filter users by roles (Admin, Editor, Viewer, etc.).
- **Responsive Layout**:
  - Desktop: 4-column grid
  - Tablet: 2/3-column grid
  - Mobile: Single column with optimized touch targets
- **User Details**: Modal view with comprehensive accessibility support (focus trap, ARIA labels).
- **Robust States**: Dedicated empty, loading (skeleton), and error states.
- **No Utility Libraries**: Styled entirely with Vanilla CSS using CSS Variables for theming.

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (CSS Modules / BEM naming convention)
- **State Management**: React Hooks (useState, useEffect, useMemo, useCallback)
- **Testing**: Vitest + React Testing Library
- **Linting/Formatting**: Biome

## 📦 Installation & Running

This project uses **pnpm**.

```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm dev
```

## ✅ Quality Checks

### Testing

The project includes a comprehensive test suite covering API logic and components.

```bash
# Run unit tests
pnpm test
```

### Linting & Formatting

Code quality is enforced using Biome.

```bash
# Check code quality
pnpm check

# Fix formatting issues
pnpm check:fix
```

## ♿ Accessibility

- Semantic HTML structure
- `aria-label` and `aria-live` regions for dynamic content
- Keyboard navigation support (Tab indexing, ESC to close modal)
- Focus management for modal dialogs
- Color contrast compliant

## 📂 Project Structure

```
src/
├── api/            # API integration and transformation logic
├── components/     # UI Components (Atomic design inspired)
│   ├── RoleFilter/
│   ├── SearchInput/
│   ├── UserCard/
│   └── ...
├── types.ts        # Shared TypeScript interfaces
└── App.tsx         # Main application logic
```
