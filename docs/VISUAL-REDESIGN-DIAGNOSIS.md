# Meridian visual redesign diagnosis

## Reference reviewed

Reference: Pinterest pin `1059964462322315385`, captured on 2026-08-22.

The reference is not a dark SaaS dashboard. It is a visual system board: real object-like illustrations, warm human scenes, concrete artifacts, small readable labels, and a central composition that communicates what the system does at a glance. The content is arranged like a curated board with varied card sizes, not like a large empty hero followed by generic metric cards.

## Current preview gap

The current `preview.html` has a strong black base and consistent lime accent, but it is still a diagrammatic product mockup. The hero is mostly oversized text plus a small UI frame. It lacks a photographic or materially rendered focal image, model-specific visual proof, and a clear visual story for each action. The desktop composition also leaves too much unoccupied vertical space between the hero, the dashboard frame, and the module tabs. The buttons are visually consistent but too close to generic pills for a product of this scope.

## New acceptance criteria

1. Every public hero has one dominant visual proof asset: a realistic 3D scene, photographic workspace, or materially rendered object. Do not use decorative gradients as the main visual.
2. Every model/agent card explains its actual job through an image or miniature scene: Planner = planning table and connected tasks; Research = source wall and evidence; Operator = controlled execution console; Voice = microphone/signal scene.
3. Dashboard modules use compact spacing tokens: 8, 12, 16, 24, 32px. No oversized blank bands between related content.
4. Buttons use one control height per context: 36px compact controls, 40px primary controls, 44px mobile touch controls. Labels remain readable and never clip.
5. `Meridian Design` and `Meridian API` share the same type scale, black material system, borders, and accent logic while retaining different content purposes.
6. Every visible CTA either changes a local state, navigates to a real route, or opens a real informational page. No dead buttons.
7. Public preview remains sample-only and never calls Supabase or private integrations.
8. The visual direction should feel like a high-end product board / editorial technology studio, not a generic AI landing page.

## Implementation direction

Use generated or licensed visual assets inside an explicit `assets/visuals/` folder. Prefer wide hero scenes with negative space for copy and separate square/portrait scenes for model cards. Use CSS/HTML for all exact interface typography and controls; use imagery for the scene and product proof. Build a shared compact token block and a small interaction controller for hero/model selection.
