/*
  README — stroke-rigger

  This repository contains a starter scaffold for "stroke-rigger": a web app
  to draw vector strokes, create simple rigs, and export animations (Lottie export is primary target).

  What is included in this initial commit:
  - Vite + React + TypeScript scaffold
  - Paper.js-based drawing canvas (src/components/SketchCanvas.tsx)
  - A prototype Lottie baker (src/exporters/lottieExporter.ts) that samples paths and creates a minimal Lottie-like JSON for iteration
  - A simple UI (src/App.tsx)

  Next steps (in-progress):
  - Implement true path-to-mesh generation and skinning
  - Add bone creation tool and IK chain support
  - Weight painting and auto-rig suggestions
  - A proper Lottie exporter that bakes path morphs with consistent vertex counts and produces spec-compliant Lottie JSON
  - Example "cute" character and sample exported Lottie

  Run locally:
  - npm install
  - npm run dev

  License: MIT
*/

# stroke-rigger

A web-first tool to draw vector strokes, rig them with 2D bones/mesh, and export animations to Lottie and rig JSON formats.

This repository was scaffolded as a starting point. See the TODO list above and the project README for planned features.
