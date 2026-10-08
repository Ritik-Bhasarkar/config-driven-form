# Dynamic Lead Form

A responsive React lead form built with Bun and a small in-repo design system.

## Install and run

```bash
bun install
bun dev
```

For a production build and server:

```bash
bun run build
bun start
```

## Folder layout

```text
src/
├── App.tsx                         # Page-level form/success screen switch
├── global.css                      # Page canvas, centering, and outer padding
├── design-system/
│   ├── tokens/tokens.css            # Shared colors, type, spacing, and layout tokens
│   ├── atoms/                      # Button, checkbox, select, text input, textarea
│   └── molecules/Field/             # Shared label, hint, and error wrapper
├── public/assets/svg/               # SVG assets served from /assets/svg/
└── features/lead/
    ├── components/FieldRenderer/    # Renders configured form controls
    ├── components/LeadForm/         # Lead form and submission success screen
    ├── config/leadFormConfig.ts     # Fields, labels, visibility, and validation limits
    └── validation/validateLeads.ts  # Lead form validation rules
```

## Design system and form

- Tokens live in `src/design-system/tokens/tokens.css`.
- Reusable atoms live in `src/design-system/atoms/`; `src/design-system/index.ts` exports them.
- The server in `src/index.ts` serves `public/assets/` at `/assets/` for those SVG requests.
- The lead form and success screen live in `src/features/lead/components/LeadForm/`.
- Field definitions and their conditional visibility are in `src/features/lead/config/leadFormConfig.ts`.
- Validation logic is in `src/features/lead/validation/validateLeads.ts`.

## Responsive layout

- `src/global.css` centers the page content and applies mobile/desktop page padding.
- `src/features/lead/components/LeadForm/LeadForm.css` keeps the form one column on mobile and switches to two columns at 1024px.
- `src/features/lead/components/LeadForm/SubmissionSuccess.css` lays out the submitted summary in two columns on desktop and one column through tablet widths (under 1024px).
- `src/features/lead/components/FieldRenderer/FieldRenderer.css` controls field placement across the form grid.
