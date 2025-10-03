# Invite Portal

A minimal Next.js site featuring a starry night background with a centered glass-effect modal for entering invite codes.

## Features

- 🌌 Fullscreen starry night background (pure CSS)
- 🎨 Glass-effect modal with rounded corners
- ☁️ Original neutral cloud mascot SVG
- 🔢 Six-slot OTP input with:
  - Typing support (A-Z, 0-9)
  - Backspace/arrow navigation
  - Paste support (6 characters)
  - Auto-advance on entry
- 🎲 Random code generator
- ♿ Accessibility features:
  - Visible focus rings
  - Semantic labels
  - ARIA live regions
  - High contrast
- 🚀 Built with Next.js App Router, React, and Tailwind CSS

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Enter Code**: Type or paste a 6-character invite code (A-Z, 0-9)
- **Generate Code**: Click "Generate random code" to auto-fill with a random code
- **Submit**: The "Join new app" button activates when all 6 slots are filled
- **Skip**: Click "Continue without code" to proceed without an invite

## Structure

```
├── app/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Main page with modal
│   └── globals.css         # Global styles + starry background
├── components/
│   ├── CloudIcon.tsx       # Original cloud SVG mascot
│   └── OtpInput.tsx        # Accessible OTP input component
└── lib/
    └── generateCode.ts     # Random code generator utility
```

## Note

This is an independent demo project and is not affiliated with any third party.
